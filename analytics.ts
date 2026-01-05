/**
 * Hepple Spirits - Custom Analytics Engine
 * A lightweight, self-contained tracking module.
 */

export interface AnalyticsEvent {
  type: 'click' | 'hover' | 'scroll' | 'pageview';
  target?: string;
  path: string;
  timestamp: number;
  metadata?: any;
}

export interface PageSession {
  path: string;
  startTime: number;
  viewTime: number;
  maxScroll: number;
  events: AnalyticsEvent[];
}

export interface UserSession {
  sessionId: string;
  startTime: number;
  endTime?: number;
  pages: PageSession[];
}

export interface AnalyticsData {
  userId: string;
  sessions: UserSession[];
}

const STORAGE_KEY = 'hepple_analytics_v1';
const USER_ID_KEY = 'hepple_analytics_uid';

class AnalyticsTracker {
  private data: AnalyticsData;
  private currentSession: UserSession | null = null;
  private currentPage: PageSession | null = null;
  private scrollDebounce: any = null;

  constructor() {
    this.data = this.loadData();
    this.init();
  }

  private loadData(): AnalyticsData {
    const stored = localStorage.getItem(STORAGE_KEY);
    const userId = localStorage.getItem(USER_ID_KEY) || this.generateId();
    localStorage.setItem(USER_ID_KEY, userId);

    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse analytics data', e);
      }
    }

    return { userId, sessions: [] };
  }

  private saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
  }

  private generateId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  private init() {
    this.startSession();
    this.attachListeners();
    this.trackPageView();

    // Track time spent periodically
    setInterval(() => {
      if (this.currentPage) {
        this.currentPage.viewTime = Math.floor((Date.now() - this.currentPage.startTime) / 1000);
        this.saveData();
      }
    }, 5000);
  }

  private startSession() {
    this.currentSession = {
      sessionId: this.generateId(),
      startTime: Date.now(),
      pages: []
    };
    this.data.sessions.push(this.currentSession);
    this.saveData();
  }

  private trackPageView() {
    const path = window.location.hash || window.location.pathname;
    
    // Close previous page session if it exists
    if (this.currentPage) {
      this.currentPage.viewTime = Math.floor((Date.now() - this.currentPage.startTime) / 1000);
    }

    this.currentPage = {
      path,
      startTime: Date.now(),
      viewTime: 0,
      maxScroll: 0,
      events: []
    };

    if (this.currentSession) {
      this.currentSession.pages.push(this.currentPage);
    }
    
    this.logEvent({ type: 'pageview', path, timestamp: Date.now() });
    this.saveData();
  }

  private attachListeners() {
    // Global Click Listener
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const element = target.closest('button, a, [data-track]');
      if (element) {
        const id = element.id || element.getAttribute('aria-label') || element.textContent?.trim().substring(0, 20) || 'unnamed-element';
        this.logEvent({
          type: 'click',
          target: `${element.tagName.toLowerCase()}#${id}`,
          path: window.location.hash,
          timestamp: Date.now()
        });
      }
    });

    // Global Hover Listener (Debounced)
    let hoverTimeout: any = null;
    document.addEventListener('mouseover', (e) => {
      const target = e.target as HTMLElement;
      const element = target.closest('img, h1, h2, h3, .product-glow, a');
      if (element) {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => {
          const id = element.id || (element as any).alt || element.textContent?.trim().substring(0, 20) || 'unnamed-asset';
          this.logEvent({
            type: 'hover',
            target: `${element.tagName.toLowerCase()}#${id}`,
            path: window.location.hash,
            timestamp: Date.now()
          });
        }, 1000); // 1s hover threshold for intent
      }
    });

    // Global Scroll Listener
    window.addEventListener('scroll', () => {
      clearTimeout(this.scrollDebounce);
      this.scrollDebounce = setTimeout(() => {
        const h = document.documentElement, 
              b = document.body,
              st = 'scrollTop',
              sh = 'scrollHeight';
        const percent = Math.floor((h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100);
        
        if (this.currentPage && percent > this.currentPage.maxScroll) {
          this.currentPage.maxScroll = percent;
          this.saveData();
        }
      }, 200);
    });

    // Detect route changes for PageViews (specifically for SPA HashRouter)
    window.addEventListener('hashchange', () => this.trackPageView());
  }

  private logEvent(event: AnalyticsEvent) {
    if (this.currentPage) {
      this.currentPage.events.push(event);
      this.saveData();
    }
  }

  // API for Dashboard
  public getAggregatedData() {
    const allSessions = this.data.sessions;
    const stats = {
      totalViews: 0,
      totalSessions: allSessions.length,
      clicks: {} as Record<string, number>,
      hovers: {} as Record<string, number>,
      pageVisits: {} as Record<string, number>,
      avgScroll: 0,
      avgViewTime: 0
    };

    let totalScroll = 0;
    let totalTime = 0;
    let pageCount = 0;

    allSessions.forEach(s => {
      s.pages.forEach(p => {
        stats.totalViews++;
        stats.pageVisits[p.path] = (stats.pageVisits[p.path] || 0) + 1;
        totalScroll += p.maxScroll;
        totalTime += p.viewTime;
        pageCount++;

        p.events.forEach(e => {
          if (e.type === 'click' && e.target) {
            stats.clicks[e.target] = (stats.clicks[e.target] || 0) + 1;
          }
          if (e.type === 'hover' && e.target) {
            stats.hovers[e.target] = (stats.hovers[e.target] || 0) + 1;
          }
        });
      });
    });

    stats.avgScroll = pageCount > 0 ? Math.floor(totalScroll / pageCount) : 0;
    stats.avgViewTime = pageCount > 0 ? Math.floor(totalTime / pageCount) : 0;

    return stats;
  }

  public getRawData() {
    return this.data;
  }
}

// Singleton instance
const tracker = new AnalyticsTracker();
export default tracker;
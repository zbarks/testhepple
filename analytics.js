/**
 * Hepple Spirits - Custom Analytics Engine
 * Version: 2.0.0 (Self-Contained Module)
 */

const STORAGE_KEY = 'hepple_intel_log';
const USER_ID_KEY = 'hepple_uid';

// 1. Session & Identity
const getUserId = () => {
    let id = localStorage.getItem(USER_ID_KEY);
    if (!id) {
        id = 'HS-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        localStorage.setItem(USER_ID_KEY, id);
    }
    return id;
};

const getLog = () => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) { return []; }
};

const logEvent = (type, targetId, metadata = {}) => {
    const log = getLog();
    const event = {
        user_id: getUserId(),
        event_type: type,
        element_id: targetId,
        page: window.location.hash || '/',
        timestamp: Date.now(),
        ...metadata
    };
    log.push(event);
    // Limit storage to 2000 events to prevent browser bloat
    if (log.length > 2000) log.shift();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
};

// 2. Interaction Tracking

// Page Views (Hash-Router Aware)
let pageStartTime = Date.now();
const trackPageView = () => {
    const dwellTime = Math.floor((Date.now() - pageStartTime) / 1000);
    if (dwellTime > 2) {
        logEvent('dwell_time', 'previous_page', { duration: dwellTime });
    }
    pageStartTime = Date.now();
    logEvent('page_view', 'load');
};

// Listeners - Only run in browser environment
if (typeof window !== 'undefined') {
    // Global Click Listener
    document.addEventListener('click', (e) => {
        const target = e.target.closest('button, a, .product-glow, img');
        if (target) {
            const label = target.id || target.alt || target.innerText?.trim().substring(0, 25) || 'unlabeled_element';
            logEvent('click', label, { tag: target.tagName.toLowerCase() });
        }
    }, true);

    // Intent-based Hover Tracking (1s threshold)
    let hoverTimer;
    document.addEventListener('mouseover', (e) => {
        const target = e.target.closest('img, .serif, h1, h2, h3, a');
        if (target) {
            clearTimeout(hoverTimer);
            hoverTimer = setTimeout(() => {
                const label = target.id || target.alt || target.innerText?.trim().substring(0, 25) || 'visual_asset';
                logEvent('hover', label);
            }, 1000);
        }
    });
    document.addEventListener('mouseout', () => clearTimeout(hoverTimer));

    // Scroll Depth Tracking
    let maxScroll = 0;
    const checkScroll = () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight <= 0) return;
        const scrollPct = Math.round((window.scrollY / docHeight) * 100);
        if (scrollPct > maxScroll) {
            maxScroll = scrollPct;
            if (maxScroll % 25 === 0 && maxScroll > 0) {
                logEvent('scroll_milestone', `${maxScroll}%`);
            }
        }
    };

    // 3. Initialization
    window.addEventListener('hashchange', trackPageView);
    window.addEventListener('scroll', () => {
        // Debounce scroll for performance
        clearTimeout(window.hs_scroll_tm);
        window.hs_scroll_tm = setTimeout(checkScroll, 200);
    });

    // Capture exit dwell time
    window.addEventListener('beforeunload', () => {
        const dwellTime = Math.floor((Date.now() - pageStartTime) / 1000);
        logEvent('session_exit', 'unload', { duration: dwellTime });
    });

    trackPageView();
    console.log("%c Hepple Intelligence: Tracking Enabled ", "background: #2d3a2d; color: #fff; padding: 2px 5px;");
}

const tracker = {
    getRawData: () => getLog(),
    getAggregatedData: () => {
        const log = getLog();
        const stats = {
            totalViews: log.filter(e => e.event_type === 'page_view').length,
            totalSessions: new Set(log.map(e => e.user_id)).size,
            avgViewTime: 0,
            avgScroll: 0,
            clicks: {},
            hovers: {}
        };

        const dwells = log.filter(e => e.event_type === 'dwell_time' || e.event_type === 'session_exit');
        if (dwells.length > 0) {
            const sum = dwells.reduce((acc, curr) => acc + (curr.duration || 0), 0);
            stats.avgViewTime = Math.round(sum / dwells.length);
        }

        const scrolls = log.filter(e => e.event_type === 'scroll_milestone');
        if (scrolls.length > 0) {
            const sum = scrolls.reduce((acc, curr) => {
                const val = parseInt(curr.element_id);
                return acc + (isNaN(val) ? 0 : val);
            }, 0);
            stats.avgScroll = Math.round(sum / scrolls.length);
        }

        log.forEach(e => {
            if (e.event_type === 'click') {
                stats.clicks[e.element_id] = (stats.clicks[e.element_id] || 0) + 1;
            }
            if (e.event_type === 'hover') {
                stats.hovers[e.element_id] = (stats.hovers[e.element_id] || 0) + 1;
            }
        });

        return stats;
    }
};

export default tracker;
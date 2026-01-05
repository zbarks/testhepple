/**
 * Hepple Spirits - Custom Analytics Tracking Engine
 * Fully self-contained. No external dependencies.
 */

(function() {
  const STORAGE_KEY = 'hepple_analytics_log';
  const USER_KEY = 'hepple_user_id';

  // --- 1. Initialization ---
  const getUserId = () => {
    let id = localStorage.getItem(USER_KEY);
    if (!id) {
      id = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem(USER_KEY, id);
    }
    return id;
  };

  const getLog = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) { return []; }
  };

  const saveLog = (log) => {
    // Keep last 1000 events to manage storage limits
    if (log.length > 1000) log = log.slice(-1000);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
  };

  const logEvent = (type, elementId, additional = {}) => {
    const log = getLog();
    const event = {
      user_id: getUserId(),
      event_type: type,
      element_id: elementId,
      page: window.location.hash || '/',
      timestamp: Date.now(),
      ...additional
    };
    log.push(event);
    saveLog(log);
  };

  // --- 2. Tracking Logic ---
  
  // Page Views
  let pageStartTime = Date.now();
  const trackPageView = () => {
    const now = Date.now();
    const dwellTime = Math.floor((now - pageStartTime) / 1000);
    if (dwellTime > 0) {
      logEvent('dwell_time', 'page_exit', { duration: dwellTime });
    }
    pageStartTime = now;
    logEvent('page_view', 'load');
  };

  // Click Tracking
  document.addEventListener('click', (e) => {
    const el = e.target.closest('button, a, img, .product-glow');
    if (el) {
      const id = el.id || el.alt || el.getAttribute('aria-label') || el.innerText?.trim().substring(0, 20) || 'unnamed_element';
      logEvent('click', id, { tag: el.tagName });
    }
  }, true);

  // Hover Tracking (1s threshold)
  let hoverTimer;
  document.addEventListener('mouseover', (e) => {
    const el = e.target.closest('img, h1, h2, h3, .btn, a');
    if (el) {
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(() => {
        const id = el.id || el.alt || el.innerText?.trim().substring(0, 20) || 'asset';
        logEvent('hover', id);
      }, 1000);
    }
  });
  document.addEventListener('mouseout', () => clearTimeout(hoverTimer));

  // Scroll Tracking
  let maxScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollPct = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
    if (scrollPct > maxScroll) {
      maxScroll = scrollPct;
      if (maxScroll % 25 === 0) { // Log at 25, 50, 75, 100
        logEvent('scroll_depth', `reached_${maxScroll}%`);
      }
    }
  });

  // Session & Route Change Handling
  window.addEventListener('hashchange', trackPageView);
  window.addEventListener('beforeunload', () => {
    const dwellTime = Math.floor((Date.now() - pageStartTime) / 1000);
    logEvent('session_end', 'exit', { duration: dwellTime });
  });

  // Start
  trackPageView();
  console.log('Hepple Analytics Initialized');
})();
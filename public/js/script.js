/**
 * Git Command Center — behavior
 * All content comes from window.gitData (see data.js). This file only
 * renders it and wires up interaction; there's no content in here.
 */
(function () {
  'use strict';

  const THEME_STORAGE_KEY = 'git-command-center-theme';

  /* ---------------------------------------------------------------------
   * Rendering
   * ------------------------------------------------------------------- */

  function renderStats(data) {
    const totalCases = data.reduce(function (sum, cat) { return sum + cat.cases.length; }, 0);
    const statsEl = document.getElementById('stats-line');
    if (statsEl) {
      statsEl.textContent = totalCases + ' commands \u00B7 ' + data.length + ' categories';
    }
  }

  function createNavItem(opts) {
    const a = document.createElement('a');
    a.className = 'graph-nav__item' + (opts.isOverview ? ' graph-nav__item--overview' : '');
    a.href = '#' + opts.id;
    a.dataset.navTarget = opts.id;

    const node = document.createElement('span');
    node.className = 'graph-nav__node';
    node.setAttribute('aria-hidden', 'true');
    a.appendChild(node);

    const label = document.createElement('span');
    label.textContent = opts.title;
    a.appendChild(label);

    if (typeof opts.count === 'number') {
      const countEl = document.createElement('span');
      countEl.className = 'graph-nav__count';
      countEl.textContent = String(opts.count);
      a.appendChild(countEl);
    }

    return a;
  }

  function renderNav(data) {
    const nav = document.getElementById('category-nav');
    if (!nav) return;
    nav.appendChild(createNavItem({ id: 'overview', title: 'Overview', isOverview: true }));
    data.forEach(function (category) {
      nav.appendChild(createNavItem({ id: category.id, title: category.title, count: category.cases.length }));
    });
  }

  function createCodeBlock(opts) {
    const wrapper = document.createElement('div');
    wrapper.className = 'command-block ' + (opts.isShell ? 'command-block--shell' : 'command-block--file');

    const header = document.createElement('div');
    header.className = 'command-block__header';

    const label = document.createElement('span');
    label.className = 'command-block__label';
    label.textContent = opts.label;
    header.appendChild(label);

    const copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'copy-btn';
    copyBtn.textContent = 'Copy';
    copyBtn.setAttribute('aria-label', 'Copy to clipboard');
    header.appendChild(copyBtn);

    wrapper.appendChild(header);

    const pre = document.createElement('pre');
    pre.className = 'command-block__code';
    const codeEl = document.createElement('code');
    codeEl.textContent = opts.code;
    pre.appendChild(codeEl);
    wrapper.appendChild(pre);

    wireCopyButton(copyBtn, opts.code);
    return wrapper;
  }

  function renderCommand(command) {
    return createCodeBlock({ label: 'Shell', code: command.code, isShell: true });
  }

  function renderFileExample(fileExample) {
    return createCodeBlock({ label: fileExample.filename, code: fileExample.content, isShell: false });
  }

  function buildSearchHaystack(caseItem, category) {
    const parts = [category.title, caseItem.title, caseItem.description];
    if (caseItem.tip) parts.push(caseItem.tip);
    if (caseItem.warning) parts.push(caseItem.warning.text);
    (caseItem.commands || []).forEach(function (c) { parts.push(c.code); });
    if (caseItem.fileExample) {
      parts.push(caseItem.fileExample.filename, caseItem.fileExample.content);
    }
    return parts.join(' ').toLowerCase();
  }

  function createCaseCard(caseItem, category) {
    const card = document.createElement('article');
    card.className = 'case-card';
    card.id = 'case-' + caseItem.number;
    card.dataset.search = buildSearchHaystack(caseItem, category);

    const header = document.createElement('div');
    header.className = 'case-card__header';

    const number = document.createElement('span');
    number.className = 'case-card__number';
    number.textContent = '#' + caseItem.number;
    header.appendChild(number);

    const title = document.createElement('h3');
    title.className = 'case-card__title';
    title.textContent = caseItem.title;
    header.appendChild(title);

    card.appendChild(header);

    const description = document.createElement('p');
    description.className = 'case-card__description';
    description.textContent = caseItem.description;
    card.appendChild(description);

    if (caseItem.warning) {
      const warning = document.createElement('div');
      warning.className = 'case-card__warning case-card__warning--' + caseItem.warning.level;

      const icon = document.createElement('span');
      icon.className = 'case-card__warning-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = caseItem.warning.level === 'danger' ? '!!' : '!';
      warning.appendChild(icon);

      const text = document.createElement('span');
      text.textContent = caseItem.warning.text;
      warning.appendChild(text);

      card.appendChild(warning);
    }

    if (caseItem.commands && caseItem.commands.length) {
      const commandsWrap = document.createElement('div');
      commandsWrap.className = 'case-card__commands';
      caseItem.commands.forEach(function (command) {
        commandsWrap.appendChild(renderCommand(command));
      });
      card.appendChild(commandsWrap);
    }

    if (caseItem.fileExample) {
      const fileWrap = document.createElement('div');
      fileWrap.className = 'case-card__commands';
      fileWrap.appendChild(renderFileExample(caseItem.fileExample));
      card.appendChild(fileWrap);
    }

    if (caseItem.tip) {
      const tip = document.createElement('p');
      tip.className = 'case-card__tip';
      const strong = document.createElement('strong');
      strong.textContent = 'Tip \u2014 ';
      tip.appendChild(strong);
      tip.appendChild(document.createTextNode(caseItem.tip));
      card.appendChild(tip);
    }

    return card;
  }

  function renderCategory(category) {
    const headingContainer = document.querySelector('[data-heading-for="' + category.id + '"]');
    const cardsContainer = document.querySelector('[data-cards-for="' + category.id + '"]');
    if (!headingContainer || !cardsContainer) return;

    const row = document.createElement('div');
    row.className = 'category-heading__row';

    const h2 = document.createElement('h2');
    h2.textContent = category.title;
    row.appendChild(h2);

    const count = document.createElement('span');
    count.className = 'category-heading__count';
    count.textContent = category.cases.length + (category.cases.length === 1 ? ' command' : ' commands');
    row.appendChild(count);

    headingContainer.appendChild(row);

    const desc = document.createElement('p');
    desc.textContent = category.description;
    headingContainer.appendChild(desc);

    category.cases.forEach(function (caseItem) {
      cardsContainer.appendChild(createCaseCard(caseItem, category));
    });
  }

  /* ---------------------------------------------------------------------
   * Clipboard (with fallback for plain-HTTP LAN access, where the
   * navigator.clipboard API is unavailable because it isn't a secure context)
   * ------------------------------------------------------------------- */

  function copyToClipboard(text) {
    if (window.isSecureContext && navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(
        function () { return true; },
        function () { return legacyCopy(text); }
      );
    }
    return Promise.resolve(legacyCopy(text));
  }

  function legacyCopy(text) {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.top = '-1000px';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, text.length);
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    } catch (err) {
      return false;
    }
  }

  function wireCopyButton(button, text) {
    button.addEventListener('click', function () {
      copyToClipboard(text).then(function (success) {
        window.clearTimeout(button._copyResetTimeout);
        if (success) {
          button.textContent = 'Copied';
          button.classList.add('is-copied');
        } else {
          button.textContent = 'Ctrl+C to copy';
          button.classList.remove('is-copied');
        }
        button._copyResetTimeout = window.setTimeout(function () {
          button.textContent = 'Copy';
          button.classList.remove('is-copied');
        }, 1600);
      });
    });
  }

  /* ---------------------------------------------------------------------
   * Search
   * ------------------------------------------------------------------- */

  function filterCases(query) {
    const q = query.trim().toLowerCase();
    let totalVisible = 0;

    document.querySelectorAll('.category-section').forEach(function (section) {
      const cards = section.querySelectorAll('.case-card');
      let visibleInSection = 0;
      cards.forEach(function (card) {
        const haystack = card.dataset.search || '';
        const match = q === '' || haystack.indexOf(q) !== -1;
        card.hidden = !match;
        if (match) visibleInSection++;
      });
      if (cards.length > 0) {
        section.hidden = q !== '' && visibleInSection === 0;
      }
      totalVisible += visibleInSection;
    });

    const noResults = document.getElementById('no-results');
    if (noResults) {
      noResults.hidden = !(q !== '' && totalVisible === 0);
    }

    const countEl = document.getElementById('search-count');
    if (countEl) {
      countEl.textContent = q === '' ? '' : totalVisible + (totalVisible === 1 ? ' match' : ' matches');
    }
  }

  function initSearch() {
    const input = document.getElementById('search-input');
    if (!input) return;
    input.addEventListener('input', function () {
      filterCases(input.value);
    });
  }

  /* ---------------------------------------------------------------------
   * Theme
   * ------------------------------------------------------------------- */

  function safeLocalStorageGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (err) {
      return null;
    }
  }

  function safeLocalStorageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (err) {
      /* private browsing or storage disabled - theme just won't persist */
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const label = document.getElementById('theme-toggle-label');
    const toggle = document.getElementById('theme-toggle');
    if (label) label.textContent = theme === 'light' ? 'Light mode' : 'Dark mode';
    if (toggle) toggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
  }

  function initTheme() {
    const stored = safeLocalStorageGet(THEME_STORAGE_KEY);
    applyTheme(stored === 'light' ? 'light' : 'dark');

    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      applyTheme(next);
      safeLocalStorageSet(THEME_STORAGE_KEY, next);
    });
  }

  /* ---------------------------------------------------------------------
   * Mobile nav
   * ------------------------------------------------------------------- */

  function initMobileNav() {
    const toggle = document.getElementById('mobile-nav-toggle');
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (!toggle || !sidebar || !backdrop) return;

    function openNav() {
      sidebar.classList.add('is-open');
      backdrop.hidden = false;
      toggle.setAttribute('aria-expanded', 'true');
    }
    function closeNav() {
      sidebar.classList.remove('is-open');
      backdrop.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      if (sidebar.classList.contains('is-open')) closeNav(); else openNav();
    });
    backdrop.addEventListener('click', closeNav);
    sidebar.addEventListener('click', function (event) {
      if (event.target.closest('.graph-nav__item')) closeNav();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && sidebar.classList.contains('is-open')) closeNav();
    });
  }

  /* ---------------------------------------------------------------------
   * Scrollspy: highlight the category currently in view
   * ------------------------------------------------------------------- */

  function initActiveNavObserver() {
    if (!('IntersectionObserver' in window)) return;

    const sections = [document.getElementById('overview')]
      .concat(Array.prototype.slice.call(document.querySelectorAll('.category-section')))
      .filter(Boolean);
    const navItems = Array.prototype.slice.call(document.querySelectorAll('.graph-nav__item'));
    if (!sections.length || !navItems.length) return;

    const navItemById = {};
    navItems.forEach(function (item) { navItemById[item.dataset.navTarget] = item; });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const navItem = navItemById[entry.target.id];
        if (!navItem) return;
        navItems.forEach(function (item) { item.classList.remove('is-active'); });
        navItem.classList.add('is-active');
      });
    }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });

    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ---------------------------------------------------------------------
   * Keyboard shortcuts: "/" focuses search, Escape clears it
   * ------------------------------------------------------------------- */

  function initKeyboardShortcuts() {
    document.addEventListener('keydown', function (event) {
      const target = event.target;
      const isTyping = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

      if (event.key === '/' && !isTyping) {
        event.preventDefault();
        const input = document.getElementById('search-input');
        if (input) input.focus();
        return;
      }

      if (event.key === 'Escape' && target && target.id === 'search-input' && target.value) {
        target.value = '';
        filterCases('');
      }
    });
  }

  /* ---------------------------------------------------------------------
   * Entry point
   * ------------------------------------------------------------------- */

  function init() {
    const data = window.gitData || [];
    renderStats(data);
    renderNav(data);
    data.forEach(renderCategory);

    initSearch();
    initTheme();
    initMobileNav();
    initActiveNavObserver();
    initKeyboardShortcuts();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

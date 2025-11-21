// Load HTML components
async function loadComponent(targetSelector, url) {
    try {
        const response = await fetch(url, { cache: 'no-store' });
        const html = await response.text();
        const target = document.querySelector(targetSelector);
        if (target) target.innerHTML = html;
    } catch (err) {
        console.error('Component load failed:', url, err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadComponent('#navbar', '/components/navbar.html');
    loadComponent('#footer', '/components/footer.html');
    loadComponent('#herosection', '/components/herosection.html');
    loadComponent('#herosection', '/components/herosection.html');
    loadComponent("#about", '/components/about.html')
    loadComponent("#kontakty", '/components/kontakty.html')
    const faqHost = document.querySelector('#faq');
    if (faqHost) {
        loadComponent('#faq', '/components/faq.html').then(() => {
            const root = faqHost;
            const buttons = root.querySelectorAll('.faq-q');
            buttons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    const item = btn.parentElement;
                    const answer = item ? item.querySelector('.faq-a') : null;
                    const expanded = btn.getAttribute('aria-expanded') === 'true';
                    const nextState = !expanded;
                    btn.setAttribute('aria-expanded', String(nextState));
                    if (item) item.classList.toggle('open', nextState);
                    if (answer) {
                        // Smooth height animation to content size
                        if (nextState) {
                            answer.hidden = false;
                            const h = answer.scrollHeight;
                            answer.style.maxHeight = h + 'px';
                        } else {
                            answer.style.maxHeight = '0px';
                            // hide after transition ends to improve accessibility
                            const onEnd = () => { answer.hidden = true; answer.removeEventListener('transitionend', onEnd); };
                            answer.addEventListener('transitionend', onEnd);
                        }
                    }
                });
            });
        });
    }

    const forWhoHost = document.querySelector('#prokoho');
    if (forWhoHost) {
        loadComponent('#prokoho', '/components/prokoho.html');
    }

    const galHost = document.querySelector('#galerie');
    if (galHost) {
        loadComponent('#galerie', '/components/galerie.html').then(() => {
            // wire gallery interactions
            const root = galHost;
            const wrappers = [...root.querySelectorAll('.card-wrapper')];
            const imgs = [...root.querySelectorAll('.card img')];
            const lightbox = root.querySelector('#lightbox');
            const lightboxImg = root.querySelector('#lightbox-img');
            const prev = root.querySelector('#prev');
            const next = root.querySelector('#next');
            const closeBtn = root.querySelector('#close-lightbox');
            if (!lightbox || !lightboxImg || !prev || !next) return;
            let current = 0;
            const show = (i) => {
                current = (i + imgs.length) % imgs.length;
                lightboxImg.src = imgs[current].src;
                lightbox.classList.add('show');
            };
            const hide = () => {
                lightbox.classList.remove('show');
            };
            imgs.forEach((img, i) => img.addEventListener('click', () => show(i)));
            prev.onclick = (e) => { e.stopPropagation(); show(current - 1); };
            next.onclick = (e) => { e.stopPropagation(); show(current + 1); };
            if (closeBtn) closeBtn.onclick = (e) => { e.stopPropagation(); hide(); };
            lightbox.onclick = (e) => { if (e.target === lightbox) hide(); };
            document.addEventListener('keydown', (e) => {
                if (!lightbox.classList.contains('show')) return;
                if (e.key === 'ArrowLeft') show(current - 1);
                if (e.key === 'ArrowRight') show(current + 1);
                if (e.key === 'Escape') hide();
            });
            // Preserve original layout transforms only; disable interactive scaling so cards keep their size.
            wrappers.forEach((wrapper) => {
                const card = wrapper.querySelector('.card');
                if (card && !card.getAttribute('data-transform')) {
                    card.setAttribute('data-transform', card.style.transform);
                }
            });
        });
    }

    const blogHost = document.querySelector('#blog');
    if (blogHost) {
        loadComponent('#blog', '/components/blog.html');
    }

    // After navbar mounts, delegate to initialize hamburger toggle
    const observeNavbar = new MutationObserver(() => {
        const nav = document.querySelector('#navbar .navbar');
        if (!nav) return;
        const btn = nav.querySelector('.hamburger-btn');
        const group = nav.querySelector('#mobile-menu');
        if (btn && group) {
            btn.addEventListener('click', () => {
                const isOpen = group.classList.toggle('open');
                btn.setAttribute('aria-expanded', String(isOpen));
            });
            // close on route hash change or click outside
            document.addEventListener('click', (e) => {
                if (!group.classList.contains('open')) return;
                if (!nav.contains(e.target)) {
                    group.classList.remove('open');
                    btn.setAttribute('aria-expanded', 'false');
                }
            });
            window.addEventListener('hashchange', () => {
                group.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
            });
            observeNavbar.disconnect();
        }
    });
    observeNavbar.observe(document.getElementById('navbar'), { childList: true, subtree: true });

    // Rotating words in hero: change every 1s with fade animation
    (function wireHeroRotator(){
        const el = document.getElementById('rotating-word');
        if (!el) return;
        const words = [
            'SIGMY',
            'TRU TUNG TUNG SAHUR',
            'MEGA KNIGHT',
            'Poulicni Frajeris',
        ];
        let i = 0;
        // ensure initial text
        el.textContent = words[0];
        let busy = false;
        setInterval(() => {
            if (busy) return; busy = true;
            // fade out
            el.classList.add('hidden');
            setTimeout(() => {
                i = (i + 1) % words.length;
                el.textContent = words[i];
                // fade in
                el.classList.remove('hidden');
                // small delay to allow the transition to finish before next cycle
                setTimeout(() => { busy = false; }, 1000);
            }, 1000);
        }, 1000);
    })();
});
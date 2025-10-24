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
    const heroHost = document.querySelector('#hero');
    if (heroHost) {
        loadComponent('#hero', '/components/hero.html').then(() => {
            // After hero HTML is injected, wire reveal logic reliably
            const root = heroHost;
            const content = root.querySelector('.hero-component .hero__content');
            const video = root.querySelector('.hero-component .hero__bg-video');
            if (!content || !video) return;
            let revealed = false;
            const reveal = () => {
                if (revealed) return;
                revealed = true;
                content.classList.remove('content-hidden');
                content.style.opacity = '1';
                content.style.transform = 'translate(-50%, -50%)';
            };
            video.addEventListener('ended', reveal, { once: true });
            const onTimeUpdate = () => {
                const d = video.duration;
                if (!isFinite(d) || d <= 0) return;
                // reveal ~1.2s před koncem
                if (video.currentTime >= d - 1.5) reveal();
            };
            video.addEventListener('timeupdate', onTimeUpdate);
            const setDurationFallback = () => {
                if (!isFinite(video.duration) || video.duration <= 0) return;
                // fallback: také ~1.2s před koncem
                const ms = Math.max(0, Math.ceil((video.duration - 1.2) * 1000));
                setTimeout(reveal, ms);
            };
            if (video.readyState >= 1) setDurationFallback();
            else video.addEventListener('loadedmetadata', setDurationFallback, { once: true });
        });
    }
    const aboutHost = document.querySelector('#about');
    if (aboutHost) loadComponent('#about', '/components/about.html');

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
            if (!lightbox || !lightboxImg || !prev || !next) return;
            let current = 0;
            const show = (i) => {
                current = (i + imgs.length) % imgs.length;
                lightboxImg.src = imgs[current].src;
                lightbox.classList.add('show');
            };
            imgs.forEach((img, i) => img.addEventListener('click', () => show(i)));
            prev.onclick = (e) => { e.stopPropagation(); show(current - 1); };
            next.onclick = (e) => { e.stopPropagation(); show(current + 1); };
            lightbox.onclick = (e) => { if (e.target === lightbox) lightbox.classList.remove('show'); };
            document.addEventListener('keydown', (e) => {
                if (!lightbox.classList.contains('show')) return;
                if (e.key === 'ArrowLeft') show(current - 1);
                if (e.key === 'ArrowRight') show(current + 1);
                if (e.key === 'Escape') lightbox.classList.remove('show');
            });
            wrappers.forEach((wrapper, index) => {
                wrapper.addEventListener('mouseenter', () => {
                    wrappers.forEach((w, i) => {
                        const card = w.querySelector('.card');
                        const letter = w.querySelector('.letter');
                        const distance = i - index;
                        if (distance === 0) {
                            card.style.transform += ' scale(1.15) translateY(-10px)';
                            card.style.zIndex = 10;
                            card.style.boxShadow = '0 12px 24px rgba(0,0,0,0.3)';
                            letter.style.transform = 'scale(1.2)';
                        } else {
                            let offset = 30 - Math.abs(distance) * 10;
                            if (offset < 0) offset = 0;
                            w.style.marginLeft = offset + 'px';
                        }
                    });
                });
                wrapper.addEventListener('mouseleave', () => {
                    wrappers.forEach((w) => {
                        const card = w.querySelector('.card');
                        const letter = w.querySelector('.letter');
                        card.style.transform = card.getAttribute('data-transform') || '';
                        card.style.zIndex = '';
                        card.style.boxShadow = '';
                        letter.style.transform = '';
                        w.style.marginLeft = '';
                    });
                });
                const card = wrapper.querySelector('.card');
                card.setAttribute('data-transform', card.style.transform);
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
});
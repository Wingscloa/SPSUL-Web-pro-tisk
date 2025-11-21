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
})

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
            wrappers.forEach((wrapper, index) => {
                const card = wrapper.querySelector('.card');
                // Store the original transform - read from inline style attribute or style object
                // Parse from style attribute to ensure we get the exact value
                const styleAttr = card.getAttribute('style') || '';
                let originalTransform = '';
                if (styleAttr.includes('transform:')) {
                    const match = styleAttr.match(/transform:\s*([^;]+)/);
                    if (match) {
                        originalTransform = match[1].trim();
                    }
                }
                // Fallback to style object if attribute parsing didn't work
                if (!originalTransform) {
                    originalTransform = card.style.transform || '';
                }
                card.setAttribute('data-transform', originalTransform);
                
                wrapper.addEventListener('mouseenter', () => {
                    wrappers.forEach((w, i) => {
                        const card = w.querySelector('.card');
                        const letter = w.querySelector('.letter');
                        const distance = i - index;
                        if (distance === 0) {
                            const original = card.getAttribute('data-transform') || '';
                            // Combine original transform with hover effects
                            card.style.transform = original ? `${original} scale(1.15) translateY(-10px)` : 'scale(1.15) translateY(-10px)';
                            card.style.zIndex = 10;
                            card.style.boxShadow = '0 12px 24px rgba(0,0,0,0.3)';
                            if (letter) letter.style.transform = 'scale(1.2)';
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
                        // Restore the exact original transform
                        const originalTransform = card.getAttribute('data-transform') || '';
                        if (originalTransform) {
                            card.style.transform = originalTransform;
                        } else {
                            // If no original transform, clear the inline style to let CSS take over
                            card.style.transform = '';
                        }
                        card.style.zIndex = '';
                        card.style.boxShadow = '';
                        if (letter) letter.style.transform = '';
                        w.style.marginLeft = '';
                    });
                });
            });
        });
    }

    const testimonialsHost = document.querySelector('#testimonials');
    if (testimonialsHost) {
        loadComponent('#testimonials', '/components/testimonials.html');
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

function wireHeroRotator(){
    const el = document.getElementById('rotating-word');
    if (!el) return;
    const words = [
        'STUDENTY',
        'SPORTOVCE',
        'FIRMY',
        'KAŽDÉHO',
    ];
    let i = 0;
    // ensure initial text
    el.textContent = words[0];
    
    setInterval(() => {
        // fade out
        el.classList.add('hidden');
        setTimeout(() => {
            i = (i + 1) % words.length;
            el.textContent = words[i];
            // fade in
            el.classList.remove('hidden');
        }, 600); // Match CSS transition duration
    }, 3000); // Change word every 3 seconds
}

window.addEventListener("load", function(){
    const myTimeout = setTimeout(wireHeroRotator,500)
})

function scrollToAnchor(name, offset) {
    var element = document.getElementById(name);
    var headerOffset = offset;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    console.log(offsetPosition)
    window.scrollTo({top: offsetPosition, behavior: 'smooth' });
}
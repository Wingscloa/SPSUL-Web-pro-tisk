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
});
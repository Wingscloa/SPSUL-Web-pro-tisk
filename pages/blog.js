// Blog page functionality
document.addEventListener('DOMContentLoaded', () => {
    // Wait for blog data to be loaded
    const checkBlogData = () => {
        if (typeof blogArticles !== 'undefined' && blogArticles.length > 0) {
            initializeBlog();
        } else {
            // If blog data not loaded yet, wait a bit more
            setTimeout(checkBlogData, 50);
        }
    };

    checkBlogData();
});

// Also run when page loads (not just DOMContentLoaded)
window.addEventListener('load', () => {
    // Wait a bit more for all scripts to load
    setTimeout(() => {
        if (typeof blogArticles !== 'undefined' && blogArticles.length > 0) {
            initializeBlog();
        } else {
            console.warn('Blog articles not loaded, retrying...');
            // Try to initialize anyway after a longer delay
            setTimeout(() => {
                if (typeof blogArticles !== 'undefined' && blogArticles.length > 0) {
                    initializeBlog();
                }
            }, 500);
        }
    }, 100);
});

// Global flag to prevent multiple event listeners
let blogInitialized = false;

function initializeBlog() {
    if (blogInitialized) return;
    blogInitialized = true;

    // Check if we're on a blog detail page first
    const hash = window.location.hash;
    const blogId = hash ? hash.substring(1) : null;

    if (blogId && blogId !== '') {
        // Show blog detail directly if we have a hash
        showBlogDetail(blogId);
    } else {
        // Show blog list if no hash
        showBlogList();
    }

    // Listen for hash changes
    window.addEventListener('hashchange', () => {
        const newHash = window.location.hash;
        const newBlogId = newHash ? newHash.substring(1) : null;

        if (newBlogId && newBlogId !== '') {
            // Add a small delay to ensure smooth transition
            setTimeout(() => {
                showBlogDetail(newBlogId);
            }, 50);
        } else {
            showBlogList();
        }
    });

    // Add fade-in animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}

let currentPage = 1;
const ITEMS_PER_PAGE = 5;

function showBlogList() {
    console.log('showBlogList called');

    const mainContent = document.querySelector('.page-content');
    if (!mainContent) {
        console.error('Main content element not found');
        return;
    }

    // Restore the blog structure
    const blogPage = document.querySelector('.blog-page');
    if (!blogPage) {
        mainContent.innerHTML = `
            <div class="blog-page">
                <div class="blog-page-header">
                    <h1 class="blog-page-title">Blog</h1>
                    <p class="blog-page-subtitle">Tipy, triky a inspirace pro vaše trička a potisky</p>
                </div>

                <div class="blog-list" id="blog-list">
                    <!-- Blog items will be dynamically generated -->
                </div>

                <div class="blog-pagination" id="blog-pagination">
                </div>
            </div>
        `;
    }

    renderCurrentPage();
}

function renderCurrentPage() {
    generateBlogItems(currentPage);
    renderPaginationControls();
}

function renderPaginationControls() {
    const paginationContainer = document.getElementById('blog-pagination');
    if (!paginationContainer) return;

    if (typeof blogArticles === 'undefined' || blogArticles.length === 0) {
        paginationContainer.innerHTML = '';
        return;
    }

    const totalPages = Math.ceil(blogArticles.length / ITEMS_PER_PAGE);

    // Hide pagination if there is 1 page or fewer
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    let html = '';
    html += `<button class="pagination-btn prev" ${currentPage === 1 ? 'disabled' : ''}>Předchozí</button>`;
    html += `<div class="pagination-numbers">`;
    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="pagination-number ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
    html += `</div>`;
    html += `<button class="pagination-btn next" ${currentPage === totalPages ? 'disabled' : ''}>Další</button>`;

    paginationContainer.innerHTML = html;

    const prevBtn = paginationContainer.querySelector('.prev');
    const nextBtn = paginationContainer.querySelector('.next');
    const numberBtns = paginationContainer.querySelectorAll('.pagination-number');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderCurrentPage();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderCurrentPage();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    numberBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentPage = parseInt(e.target.getAttribute('data-page'));
            renderCurrentPage();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

function generateBlogItems(page = 1) {
    const blogList = document.getElementById('blog-list');
    if (!blogList) {
        console.error('Blog list element not found');
        return;
    }

    if (typeof blogArticles === 'undefined' || !blogArticles.length) {
        blogList.innerHTML = '<p>Články se načítají...</p>';
        return;
    }

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const pageItems = blogArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    blogList.innerHTML = pageItems.map(article => `
        <article class="blog-item ${article.featured ? 'featured' : ''}" data-category="${article.category}">
            <div class="blog-item-image">
                <img src="${article.image}" alt="${article.title}" />
                ${article.featured ? '<div class="blog-item-badge">Doporučeno</div>' : ''}
            </div>
            <div class="blog-item-content">
                <div class="blog-item-meta">
                    <span class="blog-item-date">${article.date}</span>
                    <span class="blog-item-category">${getCategoryName(article.category)}</span>
                    <span class="blog-item-read-time">${article.readTime}</span>
                </div>
                <h2 class="blog-item-title">${article.title}</h2>
                <p class="blog-item-excerpt">${article.subtitle}</p>
                <div class="blog-item-tags">
                    ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="#${article.id}" class="blog-item-link">Číst více</a>
            </div>
        </article>
    `).join('');
}

function showBlogDetail(blogId) {
    if (typeof blogArticles === 'undefined' || !blogArticles.length) {
        console.error('Blog articles not loaded yet');
        return;
    }

    const blogPost = blogArticles.find(post => post.id === blogId);

    if (!blogPost) {
        console.error('Blog post not found:', blogId);
        window.location.href = '/pages/blog.html';
        return;
    }

    document.title = `${blogPost.title} - T-Shark`;

    const mainContent = document.querySelector('.page-content');
    if (!mainContent) {
        console.error('Main content element not found');
        return;
    }

    // Using blog-article-title-overlay to center vertically and horizontally using flex
    mainContent.innerHTML = `
        <article class="blog-article">
            <div class="blog-article-header">
                <div class="blog-article-image">
                    <img src="${blogPost.image}" alt="${blogPost.title}" />
                    <button class="blog-article-back" onclick="goBackToList()">zpět</button>
                    <div class="blog-article-title-overlay">
                        <h1 class="blog-article-title">${blogPost.title}</h1>
                        <p class="blog-article-subtitle">${blogPost.subtitle}</p>
                    </div>
                </div>
            </div>

            <div class="blog-article-content">
                <div class="blog-article-main">
                    ${blogPost.content}
                    
                    <div class="blog-article-tags">
                        ${blogPost.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
                
                <div class="blog-article-sidebar">
                    <div class="blog-social-share">
                        <div class="blog-social-icons">
                            <a href="https://www.facebook.com/profile.php?id=61581136425575" class="blog-social-icon" title="Facebook" aria-label="Facebook">
                                <span class="social-circle">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path d="M15 3h-2a4 4 0 00-4 4v2H7v3h2v9h3v-9h2.5l.5-3H12V7a1 1 0 011-1h2V3z" fill="currentColor"/>
                                    </svg>
                                </span>
                            </a>
                            <a href="https://www.instagram.com/tsharktricek/" class="blog-social-icon" title="Instagram" aria-label="Instagram">
                                <span class="social-circle">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z" stroke="currentColor" stroke-width="1.2"/>
                                    </svg>
                                </span>
                            </a>
                            <a href="https://www.tiktok.com/@tisktshark" class="blog-social-icon" title="TikTok" aria-label="TikTok">
                                <span class="social-circle">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path d="M18 7.5c-2.1-.7-3.4-2.3-3.8-4.5H12v11.1c0 1.5-1.2 2.7-2.7 2.7S6.6 15.6 6.6 14c0-1.5 1.2-2.7 2.7-2.7.3 0 .6 0 .9.1V8.1c-.3 0-.6-.1-.9-.1-3 0-5.4 2.4-5.4 5.4s2.4 5.4 5.4 5.4 5.4-2.4 5.4-5.4V12c1.1 1 2.5 1.6 4 1.7v-2.7c-.9-.1-1.8-.5-2.7-1z" fill="currentColor"/>
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    `;
}

function getCategoryName(category) {
    const categoryNames = {
        'tipy': 'Tipy',
        'trendy': 'Trendy',
        'pece': 'Péče',
        'novinky': 'Novinky'
    };
    return categoryNames[category] || category;
}

function goBackToList() {
    console.log('goBackToList called');
    window.location.href = window.location.pathname;
}

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

function showBlogList() {
    console.log('showBlogList called');
    // Generate blog items dynamically
    generateBlogItems();
    
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter blog items
            const blogItems = document.querySelectorAll('.blog-item');
            blogItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'grid';
                    item.style.animation = 'fadeIn 0.3s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Pagination functionality
    const paginationNumbers = document.querySelectorAll('.pagination-number');
    const prevBtn = document.querySelector('.pagination-btn.prev');
    const nextBtn = document.querySelector('.pagination-btn.next');
    
    let currentPage = 1;
    const totalPages = paginationNumbers.length;
    
    paginationNumbers.forEach((number, index) => {
        number.addEventListener('click', () => {
            currentPage = index + 1;
            updatePagination();
        });
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
        }
    });
    
    function updatePagination() {
        // Update pagination numbers
        paginationNumbers.forEach((number, index) => {
            number.classList.toggle('active', index + 1 === currentPage);
        });
        
        // Update prev/next buttons
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
        
        // Here you would typically load the appropriate page content
        // For now, we'll just scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function showBlogDetail(blogId) {
    // Check if blogArticles is available
    if (typeof blogArticles === 'undefined' || !blogArticles.length) {
        console.error('Blog articles not loaded yet');
        return;
    }
    
    // Find the blog post from the centralized data
    const blogPost = blogArticles.find(post => post.id === blogId);
    
    if (!blogPost) {
        console.error('Blog post not found:', blogId);
        // Blog post not found, redirect to blog list
        window.location.href = '/pages/blog.html';
        return;
    }
    
    // Update page title
    document.title = `${blogPost.title} - T-Shark`;
    
    // Replace the main content with blog detail
    const mainContent = document.querySelector('.page-content');
    if (!mainContent) {
        console.error('Main content element not found');
        return;
    }
    
    mainContent.innerHTML = `
        <article class="blog-article">
            <div class="blog-article-header">
                <div class="blog-article-image">
                    <img src="${blogPost.image}" alt="${blogPost.title}" />
                    <button class="blog-article-back" onclick="goBackToList()">zpět</button>
                </div>
                <h1 class="blog-article-title">${blogPost.title}</h1>
                <p class="blog-article-subtitle">${blogPost.subtitle}</p>
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

function generateBlogItems() {
    const blogList = document.getElementById('blog-list');
    if (!blogList) {
        console.error('Blog list element not found');
        return;
    }
    
    if (typeof blogArticles === 'undefined' || !blogArticles.length) {
        console.error('Blog articles not available');
        blogList.innerHTML = '<p>Články se načítají...</p>';
        return;
    }
    
    blogList.innerHTML = blogArticles.map(article => `
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

function getCategoryName(category) {
    const categoryNames = {
        'tipy': 'Tipy',
        'trendy': 'Trendy',
        'pece': 'Péče',
        'novinky': 'Novinky'
    };
    return categoryNames[category] || category;
}

// Function to go back to blog list
function goBackToList() {
    console.log('goBackToList called');
    // Remove hash completely to go back to list
    window.history.replaceState(null, null, window.location.pathname);
    // Show blog list immediately
    showBlogList();
    // Update page title
    document.title = 'Blog - T-Shark';
    console.log('goBackToList completed');
}

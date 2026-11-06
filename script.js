// ============================================
// PORTFOLIO ENGINE - Opens Projects in New Tab
// Supports both emojis and image logos
// ============================================

const grid = document.getElementById('project-grid');

// ---------- HELPER: Check if thumbnail is an image ----------
function isImagePath(path) {
    // Check if the path ends with common image extensions
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.bmp'];
    return imageExtensions.some(ext => path.toLowerCase().endsWith(ext));
}

function getThumbnailHTML(thumbnail) {
    // If it's an image path, return an <img> tag
    if (isImagePath(thumbnail)) {
        return `<img src="${thumbnail}" alt="Project logo" loading="lazy" />`;
    }
    // Otherwise, return the emoji/text as-is
    return thumbnail;
}

// ---------- RENDER PROJECTS ----------
function renderProjects(filter = 'all') {
    const filtered = filter === 'all' 
        ? projects 
        : projects.filter(p => p.category === filter);

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 0; color: #666;">
                No projects found in this category
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(proj => `
        <div class="project-card" data-id="${proj.id}" data-theme="${proj.theme}">
            <div class="project-thumb">${getThumbnailHTML(proj.thumbnail)}</div>
            <div class="project-title">${proj.title}</div>
            <div class="project-category">${proj.category}</div>
        </div>
    `).join('');

    // Attach click listeners to each card
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            const project = projects.find(p => p.id === id);
            if (project) {
                window.open(project.embedUrl, '_blank');
                console.log(`🔗 Opening: ${project.title} - ${project.embedUrl}`);
            }
        });
    });
}

// ---------- FILTER BUTTONS ----------
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        grid.style.opacity = '0.5';
        setTimeout(() => {
            renderProjects(filter);
            grid.style.opacity = '1';
        }, 200);
    });
});

// ---------- WHATSAPP BUTTON TRACKING ----------
document.getElementById('whatsapp-fixed').addEventListener('click', function() {
    console.log('💬 WhatsApp button clicked - Opening chat...');
});

// ---------- INITIAL RENDER ----------
renderProjects('all');

// ---------- WELCOME MESSAGE ----------
console.log('🚀 Portfolio loaded successfully!');
console.log('📁 Total projects:', projects.length);
console.log('💡 Click any project card to open it in a new tab');
console.log('📱 Click WhatsApp to contact Younis');

const categories = {};
projects.forEach(p => {
    categories[p.category] = (categories[p.category] || 0) + 1;
});
console.log('📊 Categories:', categories);
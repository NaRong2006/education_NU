const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'norton_data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const pages = {
    'about': { title: 'About Us', subtitle: 'Learn about our rich history and commitment to excellence.' },
    'academics': { title: 'Academics', subtitle: 'Explore our comprehensive colleges and faculties.' },
    'admissions': { title: 'Admissions', subtitle: 'Join the Norton University community.' },
    'collaborations': { title: 'Collaborations', subtitle: 'Our global partnerships and networks.' },
    'studentlife': { title: 'Student Life & Services', subtitle: 'Resources and updates for our students.' }
};

function generateHTML(category, info, items) {
    let sidebarLinks = '';
    let contentAreas = '';

    items.forEach((item, index) => {
        const isActive = index === 0 ? 'active' : '';
        const display = index === 0 ? 'block' : 'none';

        sidebarLinks += `<a href="#${item.id}" class="tab-link ${isActive}" data-target="${item.id}">${item.title}</a>\n`;

        contentAreas += `
        <article class="content-body tab-content ${isActive}" id="content-${item.id}" style="display: ${display};">
            <h2 style="font-size: 2rem; color: var(--primary-dark); margin-bottom: 1.5rem;">${item.title}</h2>
            ${item.content}
        </article>\n`;
    });

    const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${info.title} | Norton University</title>
    <link href="https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&family=Inter:wght@400;500;600&family=Kantumruy+Pro:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
    <style>
        .page-header { background-color: var(--primary-dark); color: white; padding: 10rem 2rem 4rem; text-align: center; }
        .page-content { display: grid; grid-template-columns: 280px 1fr; gap: 4rem; margin-top: 4rem; margin-bottom: 4rem; }
        .sidebar-nav { background: var(--surface-color); border-radius: var(--radius-lg); border: 1px solid rgba(0,0,0,0.08); overflow: hidden; position: sticky; top: 100px; }
        .sidebar-nav a { display: block; padding: 1rem 1.5rem; color: var(--text-secondary); font-weight: 500; border-bottom: 1px solid rgba(0,0,0,0.05); }
        .sidebar-nav a:hover, .sidebar-nav a.active { background: var(--primary); color: white; }
        .content-body img { border-radius: var(--radius-xl); margin-bottom: 2rem; box-shadow: var(--shadow-md); width: 100%; max-height: 500px; object-fit: cover; }
        .content-body p, .content-body li { font-size: 1.125rem; color: var(--text-secondary); line-height: 1.8; margin-bottom: 1.5rem; text-align: justify; }
        .content-body ul { margin-left: 2rem; margin-bottom: 1.5rem; list-style-type: disc; }
        .tab-content { animation: fadeIn 0.4s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 900px) { .page-content { grid-template-columns: 1fr; } .sidebar-nav { position: static; } }
    </style>
</head>
<body>

    <!-- Header -->
    <header class="header-wrapper">
        <div class="top-bar">
            <div class="container" style="display: flex; justify-content: flex-end; align-items: center; gap: 2rem;">
                <ul class="top-bar-links" style="margin-left: auto;">
                    <li><a href="studentlife.html#student-services">Student's services</a></li>
                    <li><a href="studentlife.html#staff">Staff</a></li>
                    <li><a href="studentlife.html#publication">Blog/Research</a></li>
                    <li><a href="studentlife.html#mail">Mail</a></li>
                    <li><a href="studentlife.html#my-nu">My NU</a></li>
                    <li><a href="studentlife.html#calendar">Calendar</a></li>
                </ul>
                <div class="lang-switcher" onclick="alert('Language switching functionality will be connected to your backend translation system.')">
                    <span class="active">EN</span>
                    <span style="color: rgba(255,255,255,0.3);">|</span>
                    <span>KH</span>
                </div>
            </div>
        </div>

        <nav class="main-nav">
            <div class="container" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                <div class="nav-logo">
                    <a href="index.html">
                        <img src="https://www.norton-u.com/images/logo-banner-blue.png" alt="Norton University">
                    </a>
                </div>
                <button class="mobile-toggle" aria-label="Toggle Menu">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <ul class="nav-menu">
                    <li><a href="index.html" class="nav-item">Home</a></li>
                    <li class="nav-item has-dropdown">
                        <a href="about.html" style="${category === 'about' ? 'color: var(--primary);' : ''}">About us ▾</a>
                        <div class="dropdown-menu">
                            <a href="about.html#why-nu">Why NU?</a>
                            <a href="about.html#campus">Campus</a>
                            <a href="about.html#library-facility">Library and Facility</a>
                            <a href="about.html#government-recognition">Government Recognition</a>
                            <a href="about.html#mission-vision">Mission Vision and Goal</a>
                            <a href="about.html#rector-message">Message Of Vice Rector</a>
                        </div>
                    </li>
                    <li class="nav-item has-dropdown">
                        <a href="academics.html" style="${category === 'academics' ? 'color: var(--primary);' : ''}">Academics ▾</a>
                        <div class="dropdown-menu">
                            <a href="academics.html#foundation">Foundation Studies</a>
                            <a href="academics.html#cs">College of Sciences</a>
                            <a href="academics.html#social-sciences">College of Social Sciences</a>
                            <a href="academics.html#cahl">Arts, Humanities</a>
                            <a href="academics.html#fhs">Faculty of Health</a>
                            <a href="academics.html#nugs">Graduate School</a>
                        </div>
                    </li>
                    <li class="nav-item has-dropdown">
                        <a href="admissions.html" style="${category === 'admissions' ? 'color: var(--primary);' : ''}">Admissions ▾</a>
                        <div class="dropdown-menu">
                            <a href="admissions.html#under-graduate">Under Graduate</a>
                            <a href="admissions.html#admission-graduate">Graduate School</a>
                        </div>
                    </li>
                    <li class="nav-item has-dropdown">
                        <a href="collaborations.html" style="${category === 'collaborations' ? 'color: var(--primary);' : ''}">Collaborations ▾</a>
                        <div class="dropdown-menu">
                            <a href="collaborations.html#mou">MOU</a>
                            <a href="collaborations.html#governing-council">Governing Council</a>
                            <a href="collaborations.html#aupf">AUPF</a>
                        </div>
                    </li>
                    <li><a href="studentlife.html#publication" class="nav-item" style="${category === 'studentlife' ? 'color: var(--primary);' : ''}">Research</a></li>
                </ul>
                <button class="btn btn-primary" style="padding: 0.6rem 1.5rem;">Apply Now</button>
            </div>
        </nav>
    </header>

    <!-- Page Header -->
    <div class="page-header">
        <h1 class="section-title" style="background: none; -webkit-text-fill-color: white; color: white;">${info.title}</h1>
        <p style="color: rgba(255,255,255,0.8); font-size: 1.2rem;">${info.subtitle}</p>
    </div>

    <!-- Main Content -->
    <main class="container page-content">
        <!-- Sidebar Navigation -->
        <aside>
            <div class="sidebar-nav" id="sidebarNav">
                ${sidebarLinks}
            </div>
        </aside>

        <!-- Article Bodies -->
        <div>
            ${contentAreas}
        </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-bottom" style="border-top: none; padding-top: 0;">
                <p>&copy; 2026 Norton University. All rights reserved.</p>
                <div style="display: flex; gap: 1.5rem;">
                    <a href="index.html">Back to Home</a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        // Mobile Menu
        const mobileToggle = document.querySelector('.mobile-toggle');
        const navMenu = document.querySelector('.nav-menu');
        if(mobileToggle) {
            mobileToggle.addEventListener('click', () => { navMenu.classList.toggle('active'); });
        }
        document.querySelectorAll('.nav-item.has-dropdown > a').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) { e.preventDefault(); toggle.parentElement.classList.toggle('active'); }
            });
        });

        // Tab Switching Logic
        function switchTab(targetId) {
            // Update sidebar active state
            document.querySelectorAll('.tab-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-target') === targetId) {
                    link.classList.add('active');
                }
            });

            // Update content display
            document.querySelectorAll('.tab-content').forEach(content => {
                content.style.display = 'none';
                content.classList.remove('active');
            });
            const targetContent = document.getElementById('content-' + targetId);
            if (targetContent) {
                targetContent.style.display = 'block';
                // small delay to trigger animation
                setTimeout(() => targetContent.classList.add('active'), 10);
            }
        }

        // Handle clicks
        document.getElementById('sidebarNav').addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-link')) {
                const targetId = e.target.getAttribute('data-target');
                switchTab(targetId);
            }
        });

        // Handle direct URL hashes on load
        window.addEventListener('DOMContentLoaded', () => {
            const hash = window.location.hash.replace('#', '');
            if (hash) {
                switchTab(hash);
                // Scroll to top of content
                setTimeout(() => window.scrollTo(0, 0), 100);
            }
        });
        
        // Handle hash changes (e.g. from top nav)
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.replace('#', '');
            if (hash) { switchTab(hash); }
        });
    </script>
</body>
</html>`;

    const outputPath = path.join(__dirname, '../public', `${category}.html`);
    fs.writeFileSync(outputPath, htmlTemplate);
    console.log(`Generated ${category}.html in public directory`);
}

for (const category in data) {
    if (pages[category]) {
        generateHTML(category, pages[category], data[category]);
    }
}

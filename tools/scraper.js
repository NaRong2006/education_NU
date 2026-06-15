const fs = require('fs');

const urls = {
    about: [
        { id: 'why-nu', url: 'https://www.norton-u.com/about/why-nu', title: 'Why NU?' },
        { id: 'campus', url: 'https://www.norton-u.com/about/campus', title: 'Campus' },
        { id: 'library-facility', url: 'https://www.norton-u.com/about/library-facility', title: 'Library and Facility' },
        { id: 'government-recognition', url: 'https://www.norton-u.com/about/government-recognition', title: 'Government Recognition' },
        { id: 'mission-vision', url: 'https://www.norton-u.com/about/mission-vision', title: 'Mission Vision and Goal' },
        { id: 'rector-message', url: 'https://www.norton-u.com/about/rector-message', title: 'Message Of Vice Rector' }
    ],
    academics: [
        { id: 'foundation', url: 'https://www.norton-u.com/academics/foundation', title: 'Foundation Studies' },
        { id: 'cs', url: 'https://www.norton-u.com/academics/cs', title: 'College of Sciences' },
        { id: 'social-sciences', url: 'https://www.norton-u.com/academics/social-sciences', title: 'College of Social Sciences' },
        { id: 'cahl', url: 'https://www.norton-u.com/academics/cahl', title: 'Arts, Humanities & Languages' },
        { id: 'fhs', url: 'https://www.norton-u.com/academics/fhs', title: 'Faculty of Health Sciences' },
        { id: 'nugs', url: 'https://www.norton-u.com/academics/nugs', title: 'Graduate School' }
    ],
    admissions: [
        { id: 'under-graduate', url: 'https://www.norton-u.com/admission/under-graduate', title: 'Under Graduate' },
        { id: 'admission-graduate', url: 'https://www.norton-u.com/admission/admission-graduate', title: 'Graduate School Admissions' }
    ],
    collaborations: [
        { id: 'mou', url: 'https://www.norton-u.com/collaborations/mou', title: 'MOU' },
        { id: 'governing-council', url: 'https://www.norton-u.com/collaborations/governing-council', title: 'Governing Council' },
        { id: 'aupf', url: 'https://www.norton-u.com/collaborations/aupf', title: 'AUPF' }
    ],
    studentlife: [
        { id: 'student-services', url: 'https://www.norton-u.com/student-services', title: 'Student Services' },
        { id: 'staff', url: 'https://www.norton-u.com/staff', title: 'Staff' },
        { id: 'publication', url: 'https://www.norton-u.com/publication', title: 'Research and Publication' }
    ]
};

const outputData = {};

async function scrape() {
    for (const [category, links] of Object.entries(urls)) {
        outputData[category] = [];
        for (const link of links) {
            console.log(`Fetching ${link.url}...`);
            try {
                const response = await fetch(link.url);
                const html = await response.text();
                
                // Extract main content using regex (targeting the ck-content or prose area)
                let contentMatch = html.match(/<main[^>]*class="[^"]*ck-content[^"]*"[^>]*>([\s\S]*?)<\/main>/i);
                if (!contentMatch) {
                    contentMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
                }
                
                let content = contentMatch ? contentMatch[1].trim() : `<p>Content for ${link.title} is currently being updated by the university.</p>`;
                
                // If it's a long page with complex sidebars, just grab the article inside main
                let articleMatch = content.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
                if (articleMatch) {
                    content = articleMatch[1].trim();
                }

                // Strip out specific utility classes we don't need, but keep HTML tags
                content = content.replace(/class="[^"]*"/g, '');
                
                // Fix relative image links if any
                content = content.replace(/src="\//g, 'src="https://www.norton-u.com/');

                outputData[category].push({
                    id: link.id,
                    title: link.title,
                    content: content
                });
            } catch (err) {
                console.error(`Failed to fetch ${link.url}: ${err.message}`);
                outputData[category].push({
                    id: link.id,
                    title: link.title,
                    content: `<p>Failed to load content for ${link.title}. Please check the official website.</p>`
                });
            }
            // Small delay to be polite to the server
            await new Promise(r => setTimeout(r, 200));
        }
    }
    
    fs.writeFileSync('norton_data.json', JSON.stringify(outputData, null, 2));
    console.log('Successfully scraped and saved to norton_data.json');
}

scrape();

const fs = require('fs');

const data = JSON.parse(fs.readFileSync('norton_data.json', 'utf8'));

// Inject Contact Us into About
if (!data.about.find(item => item.id === 'contact-us')) {
    data.about.push({
        id: 'contact-us',
        title: 'Contact Us',
        content: `
        <div style="background: var(--surface-color); padding: 2rem; border-radius: var(--radius-lg); border: 1px solid rgba(0,0,0,0.05);">
            <h3 style="margin-bottom: 1rem; color: var(--primary-dark);">Get In Touch</h3>
            <p><strong>Address:</strong> St. Keo Chenda, Sangkat Chroy Changvar, Khan Chroy Changvar, Phnom Penh, Cambodia</p>
            <p><strong>Phone:</strong> +855 23 432 098</p>
            <p><strong>Email:</strong> info@norton-u.com</p>
            <br>
            <p><em>This is a generated contact page for the prototype.</em></p>
        </div>`
    });
}

// Inject Mail, My NU, and Calendar into Student Life
if (!data.studentlife.find(item => item.id === 'mail')) {
    data.studentlife.push({
        id: 'mail',
        title: 'NU Mail',
        content: `<p>Access your official Norton University student email account here. Please log in using your student credentials.</p><a href="#" class="btn btn-primary" style="display:inline-block; margin-top:1rem;">Access NU Mail Portal</a>`
    });
}

if (!data.studentlife.find(item => item.id === 'my-nu')) {
    data.studentlife.push({
        id: 'my-nu',
        title: 'My NU Portal',
        content: `<p>Manage your courses, check your grades, and view your financial standing on the centralized My NU Portal.</p><a href="#" class="btn btn-primary" style="display:inline-block; margin-top:1rem;">Log In to My NU</a>`
    });
}

if (!data.studentlife.find(item => item.id === 'calendar')) {
    data.studentlife.push({
        id: 'calendar',
        title: 'Academic Calendar',
        content: `<p>View the full schedule for the upcoming semester, including exam dates, holidays, and enrollment deadlines.</p>
        <ul style="margin-top: 1rem;">
            <li><strong>Semester 1 Start:</strong> October 2026</li>
            <li><strong>Midterm Exams:</strong> December 2026</li>
            <li><strong>Final Exams:</strong> February 2027</li>
        </ul>`
    });
}

fs.writeFileSync('norton_data.json', JSON.stringify(data, null, 2));
console.log('Successfully injected missing sections into norton_data.json');

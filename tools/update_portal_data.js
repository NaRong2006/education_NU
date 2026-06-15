const fs = require('fs');

const data = JSON.parse(fs.readFileSync('norton_data.json', 'utf8'));

// Update My NU Portal with realistic portal instructions based on the Ziggy routes found
const myNuItem = data.studentlife.find(item => item.id === 'my-nu');
if (myNuItem) {
    myNuItem.content = `
    <div style="background: var(--surface-color); padding: 2.5rem; border-radius: var(--radius-xl); border: 1px solid rgba(0,0,0,0.06); box-shadow: var(--shadow-sm);">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
            <div style="background: var(--primary-light); color: var(--primary-dark); width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">🎓</div>
            <h3 style="font-size: 1.5rem; margin: 0; color: var(--primary-dark);">Student Information System (SIS)</h3>
        </div>
        
        <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 2rem;">Welcome to the official Norton University Portal. This centralized platform allows you to manage your entire academic journey securely online.</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
            <div style="padding: 1.5rem; background: rgba(0,0,0,0.02); border-radius: var(--radius-lg);">
                <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-primary);">📚 Academic Records</h4>
                <p style="font-size: 0.95rem; color: var(--text-secondary); margin: 0;">View current enrollments, access classroom materials, submit assessments, and check real-time attendance.</p>
            </div>
            <div style="padding: 1.5rem; background: rgba(0,0,0,0.02); border-radius: var(--radius-lg);">
                <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-primary);">🗓️ Schedules</h4>
                <p style="font-size: 0.95rem; color: var(--text-secondary); margin: 0;">Export your daily timetable, view classroom locations, and sync with the academic calendar.</p>
            </div>
            <div style="padding: 1.5rem; background: rgba(0,0,0,0.02); border-radius: var(--radius-lg);">
                <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-primary);">⚙️ Profile Settings</h4>
                <p style="font-size: 0.95rem; color: var(--text-secondary); margin: 0;">Update your student profile, reset passwords securely, and manage digital student ID scans.</p>
            </div>
        </div>

        <div style="border-top: 1px solid rgba(0,0,0,0.08); padding-top: 2rem;">
            <p style="font-weight: 500; margin-bottom: 1rem;">Log in using your official Student ID and Password:</p>
            <a href="https://portal.norton-u.com/login" target="_blank" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.8rem 2rem;">
                Secure Login to Portal
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width: 20px; height: 20px;"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </a>
            <p style="font-size: 0.85rem; color: var(--text-tertiary); margin-top: 1rem;">If you have forgotten your password, use the <a href="https://portal.norton-u.com/auth/student/forgot-password" target="_blank" style="color: var(--primary); text-decoration: underline;">password recovery tool</a>.</p>
        </div>
    </div>`;
}

// Update Mail
const mailItem = data.studentlife.find(item => item.id === 'mail');
if (mailItem) {
    mailItem.content = `
    <div style="background: var(--surface-color); padding: 2.5rem; border-radius: var(--radius-xl); border: 1px solid rgba(0,0,0,0.06); box-shadow: var(--shadow-sm);">
        <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--primary-dark);">Official University Communication</h3>
        <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 2rem;">All official correspondence from faculty, administration, and university services will be sent to your Norton University Email Address (<code>student.id@norton-u.com</code>).</p>
        
        <ul style="margin-left: 1.5rem; margin-bottom: 2rem; color: var(--text-secondary); line-height: 1.8;">
            <li>Receive urgent notifications regarding class schedules or cancellations.</li>
            <li>Submit official requests to the registrar or academic departments.</li>
            <li>Collaborate with peers on group assessments via shared drives.</li>
        </ul>

        <a href="https://mail.norton-u.com" target="_blank" class="btn btn-primary" style="padding: 0.8rem 2rem;">Access Webmail</a>
    </div>`;
}

fs.writeFileSync('norton_data.json', JSON.stringify(data, null, 2));
console.log('Updated Portal and Mail data in norton_data.json');

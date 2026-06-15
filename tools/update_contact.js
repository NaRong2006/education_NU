const fs = require('fs');
const data = JSON.parse(fs.readFileSync('norton_data.json', 'utf8'));

const contactItem = data.about.find(item => item.id === 'contact-us');
if (contactItem) {
    contactItem.content = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2.5rem; align-items: start;">
        <!-- Contact Info & Form -->
        <div style="background: var(--surface-color); padding: 2.5rem; border-radius: var(--radius-xl); border: 1px solid rgba(0,0,0,0.06); box-shadow: var(--shadow-sm);">
            <h3 style="margin-bottom: 1rem; color: var(--primary-dark); font-size: 1.5rem;">Get In Touch</h3>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">Have questions about admissions, programs, or campus life? Send us a message and our team will respond shortly.</p>
            
            <div style="margin-bottom: 2rem; line-height: 1.8;">
                <p style="margin-bottom: 0.5rem; color: var(--text-secondary);"><strong>📍 Address:</strong> St. Keo Chenda, Sangkat Chroy Changvar, Phnom Penh</p>
                <p style="margin-bottom: 0.5rem; color: var(--text-secondary);"><strong>📞 Phone:</strong> +855 23 432 098</p>
                <p style="margin-bottom: 0.5rem; color: var(--text-secondary);"><strong>✉️ Email:</strong> info@norton-u.com</p>
            </div>

            <form style="display: flex; flex-direction: column; gap: 1rem;">
                <input type="text" placeholder="Your Name" style="padding: 1rem; border: 1px solid rgba(0,0,0,0.1); border-radius: var(--radius-md); font-family: inherit; width: 100%; outline: none;">
                <input type="email" placeholder="Your Email Address" style="padding: 1rem; border: 1px solid rgba(0,0,0,0.1); border-radius: var(--radius-md); font-family: inherit; width: 100%; outline: none;">
                <textarea placeholder="How can we help you?" rows="4" style="padding: 1rem; border: 1px solid rgba(0,0,0,0.1); border-radius: var(--radius-md); font-family: inherit; width: 100%; resize: vertical; outline: none;"></textarea>
                <button type="button" class="btn btn-primary" onclick="alert('Message sent successfully!')" style="padding: 1rem; margin-top: 0.5rem; border: none; cursor: pointer; font-family: inherit; font-size: 1rem;">Send Message</button>
            </form>
        </div>

        <!-- Google Map -->
        <div style="height: 100%; min-height: 400px;">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.5724813098586!2d104.92723701534604!3d11.583091991775027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109516629c1eab1%3A0x6b0fb1604a39b8bc!2sNorton%20University!5e0!3m2!1sen!2skh!4v1689000000000!5m2!1sen!2skh" width="100%" height="100%" style="border:0; border-radius: var(--radius-xl); box-shadow: var(--shadow-sm); min-height: 600px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>`;
}

fs.writeFileSync('norton_data.json', JSON.stringify(data, null, 2));
console.log('Successfully updated Contact Us with Form and Map.');

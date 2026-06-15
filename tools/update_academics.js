const fs = require('fs');
let text = fs.readFileSync('norton_data.json', 'utf8');
text = text.replace(/href="#"/g, 'href="admissions.html#under-graduate"');
fs.writeFileSync('norton_data.json', text);
console.log("All dummy links routed to Admissions!");

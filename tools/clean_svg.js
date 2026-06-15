const fs = require('fs');
let text = fs.readFileSync('norton_data.json', 'utf8');

// Strip out the entire breadcrumb unordered list that contains the "Home", the SVG arrow, and the duplicate title
text = text.replace(/<ul\s*>\s*<li\s*>\s*<a href="\/">Home<\/a>[\s\S]*?<\/ul>/gi, '');

// Also fallback strip any rogue SVGs just in case
text = text.replace(/<svg[\s\S]*?<\/svg>/gi, '');

fs.writeFileSync('norton_data.json', text);
console.log("Successfully wiped all breadcrumbs and SVGs from the database.");

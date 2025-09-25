const fs = require('fs');
const path = require('path');

const SKILLS_DIR = path.join(__dirname, '../public/skills');

// Create high-quality SVG icons for the problematic ones
const customIcons = {
  'solana': `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
    <defs>
      <linearGradient id="solanaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#9945FF"/>
        <stop offset="100%" style="stop-color:#14F195"/>
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="8" fill="url(#solanaGradient)"/>
    <path d="M12 20c2-2 6-2 8 0l20 20c2 2 2 6 0 8l-20 20c-2 2-6 2-8 0l-4-4c-2-2-2-6 0-8l16-16c2-2 2-6 0-8l-16-16c-2-2-2-6 0-8l4-4z" fill="white"/>
    <path d="M28 28l8 8-8 8-8-8z" fill="url(#solanaGradient)"/>
  </svg>`,
  
  'icp': `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
    <defs>
      <linearGradient id="icpGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#3B00B9"/>
        <stop offset="100%" style="stop-color:#2FB8FF"/>
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="8" fill="url(#icpGradient)"/>
    <circle cx="32" cy="32" r="18" fill="white"/>
    <path d="M24 24h16v16H24z" fill="url(#icpGradient)"/>
    <circle cx="32" cy="32" r="4" fill="white"/>
  </svg>`,
  
  'smart-contracts': `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
    <defs>
      <linearGradient id="ethGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#627EEA"/>
        <stop offset="100%" style="stop-color:#3C3C3D"/>
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="8" fill="url(#ethGradient)"/>
    <path d="M32 8l-12 20 12 7 12-7z" fill="white" opacity="0.8"/>
    <path d="M20 28l12 16 12-16-12 7z" fill="white"/>
  </svg>`
};

// Function to create SVG file
function createSVGIcon(skill, svgContent) {
  const filepath = path.join(SKILLS_DIR, `${skill}.svg`);
  fs.writeFileSync(filepath, svgContent);
  console.log(`Created custom SVG icon: ${filepath}`);
}

// Create the custom icons
Object.entries(customIcons).forEach(([skill, svg]) => {
  createSVGIcon(skill, svg);
});

console.log('Custom skill icons created successfully!');
const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create directories if they don't exist
const directories = [
  'public/projects',
  'public/blog',
  'public/testimonials',
  'public/skills',
  'public/placeholder'
];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Generate a placeholder image
function generatePlaceholderImage(width, height, text, filename) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#f3f4f6';
  ctx.fillRect(0, 0, width, height);

  // Border
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, width, height);

  // Text
  ctx.fillStyle = '#9ca3af';
  ctx.font = '24px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);

  // Save the image
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(filename, buffer);
  console.log(`Generated: ${filename}`);
}

// Generate a skill icon
function generateSkillIcon(name, filename) {
  const size = 64;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);

  // Icon background
  ctx.fillStyle = '#3b82f6';
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 4, 0, Math.PI * 2);
  ctx.fill();

  // Text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  ctx.fillText(initials, size / 2, size / 2);

  // Save the icon
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(filename, buffer);
  console.log(`Generated: ${filename}`);
}

// Generate all images
async function generateAllImages() {
  // Generate project placeholders
  const projects = [
    'cross-chain-yield-aggregator',
    'dms-solana',
    'solana-flappy',
    'decentralized-p2p',
    'space-invaders',
    'identity-verification',
    'custom-kernel',
    'dms-icp'
  ];

  projects.forEach(project => {
    generatePlaceholderImage(
      800,
      450,
      project.replace(/-/g, ' ').toUpperCase(),
      path.join('public', 'projects', `${project}.jpg`)
    );
  });

  // Generate blog placeholder
  generatePlaceholderImage(
    800,
    450,
    'Blog Post Image',
    path.join('public', 'blog', 'solana-guide.jpg')
  );

  // Generate testimonial placeholder
  generatePlaceholderImage(
    200,
    200,
    'Profile',
    path.join('public', 'testimonials', 'john-doe.jpg')
  );

  // Generate placeholder images
  generatePlaceholderImage(
    800,
    450,
    'Project Image',
    path.join('public', 'placeholder', 'placeholder-project.jpg')
  );
  generatePlaceholderImage(
    800,
    450,
    'Blog Image',
    path.join('public', 'placeholder', 'placeholder-blog.jpg')
  );
  generatePlaceholderImage(
    200,
    200,
    'Profile',
    path.join('public', 'placeholder', 'placeholder-testimonial.jpg')
  );

  // Generate skill icons
  const skills = [
    'html-css',
    'javascript',
    'python',
    'typescript',
    'rust',
    'solana',
    'smart-contracts',
    'nextjs',
    'tailwind',
    'web3',
    'icp',
    'react',
    'git',
    'nodejs',
    'postgresql',
    'express',
    'docker',
    'linux',
    'game-dev',
    'vscode',
    'graphics'
  ];

  skills.forEach(skill => {
    generateSkillIcon(
      skill.replace(/-/g, ' '),
      path.join('public', 'skills', `${skill}.svg`)
    );
  });
}

// Run the generation
generateAllImages().then(() => {
  console.log('\nAll images generated successfully!');
}).catch(error => {
  console.error('Error generating images:', error);
}); 
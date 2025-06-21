const https = require('https');
const fs = require('fs');
const path = require('path');

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

// Image URLs for different categories
const images = {
  projects: [
    { name: 'cross-chain-yield-aggregator.jpg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/projects/cross-chain-yield-aggregator.jpg' },
    { name: 'dms-solana.jpg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/projects/dms-solana.jpg' },
    { name: 'solana-flappy.jpg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/projects/solana-flappy.jpg' },
    { name: 'decentralized-p2p.jpg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/projects/decentralized-p2p.jpg' },
    { name: 'space-invaders.jpg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/projects/space-invaders.jpg' },
    { name: 'identity-verification.jpg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/projects/identity-verification.jpg' },
    { name: 'custom-kernel.jpg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/projects/custom-kernel.jpg' },
    { name: 'dms-icp.jpg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/projects/dms-icp.jpg' }
  ],
  blog: [
    { name: 'solana-guide.jpg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/blog/solana-guide.jpg' }
  ],
  testimonials: [
    { name: 'john-doe.jpg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/testimonials/john-doe.jpg' }
  ],
  skills: [
    { name: 'html-css.svg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/skills/html-css.svg' },
    { name: 'javascript.svg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/skills/javascript.svg' },
    { name: 'python.svg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/skills/python.svg' },
    { name: 'typescript.svg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/skills/typescript.svg' },
    { name: 'rust.svg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/skills/rust.svg' },
    { name: 'solana.svg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/skills/solana.svg' },
    { name: 'smart-contracts.svg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/skills/smart-contracts.svg' },
    { name: 'nextjs.svg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/skills/nextjs.svg' },
    { name: 'tailwind.svg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/skills/tailwind.svg' },
    { name: 'web3.svg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/skills/web3.svg' },
    { name: 'icp.svg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/skills/icp.svg' },
    { name: 'react.svg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/skills/react.svg' },
    { name: 'git.svg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/skills/git.svg' },
    { name: 'nodejs.svg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/skills/nodejs.svg' },
    { name: 'postgresql.svg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/skills/postgresql.svg' },
    { name: 'express.svg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/skills/express.svg' },
    { name: 'docker.svg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/skills/docker.svg' },
    { name: 'linux.svg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/skills/linux.svg' },
    { name: 'game-dev.svg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/skills/game-dev.svg' },
    { name: 'vscode.svg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/skills/vscode.svg' },
    { name: 'graphics.svg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/skills/graphics.svg' }
  ],
  placeholder: [
    { name: 'placeholder-project.jpg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/placeholder/placeholder-project.jpg' },
    { name: 'placeholder-blog.jpg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/placeholder/placeholder-blog.jpg' },
    { name: 'placeholder-testimonial.jpg', url: 'https://raw.githubusercontent.com/mohtashimnawaz/portfolio/main/public/placeholder/placeholder-testimonial.jpg' }
  ]
};

// Function to download an image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`Downloaded: ${filepath}`);
          resolve();
        });
      } else {
        console.error(`Failed to download ${url}: ${response.statusCode}`);
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      console.error(`Error downloading ${url}:`, err.message);
      reject(err);
    });
  });
}

// Download all images
async function downloadAllImages() {
  for (const [category, categoryImages] of Object.entries(images)) {
    console.log(`\nDownloading ${category} images...`);
    for (const image of categoryImages) {
      const filepath = path.join('public', category, image.name);
      try {
        await downloadImage(image.url, filepath);
      } catch (error) {
        console.error(`Error downloading ${image.name}:`, error.message);
      }
    }
  }
}

// Run the download
downloadAllImages().then(() => {
  console.log('\nAll downloads completed!');
}).catch(error => {
  console.error('Error during downloads:', error);
}); 
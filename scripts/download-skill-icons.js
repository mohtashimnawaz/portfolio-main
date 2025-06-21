const fs = require('fs');
const path = require('path');
const https = require('https');

const SKILL_ICONS = {
  'html-css': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'javascript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'typescript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'rust': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg',
  'solana': 'https://raw.githubusercontent.com/solana-labs/solana/master/assets/solana.svg',
  'smart-contracts': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ethereum/ethereum-original.svg',
  'nextjs': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'tailwind': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
  'web3': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/web3js/web3js-original.svg',
  'react': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  'nodejs': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'postgresql': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  'express': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'linux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
  'game-dev': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg',
  'vscode': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
  'graphics': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg'
};

const SKILLS_DIR = path.join(__dirname, '../public/skills');

// Create skills directory if it doesn't exist
if (!fs.existsSync(SKILLS_DIR)) {
  fs.mkdirSync(SKILLS_DIR, { recursive: true });
}

// Function to download a file
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        console.warn(`Warning: Failed to download ${url}: ${response.statusCode}`);
        resolve(); // Skip this icon
        return;
      }

      const file = fs.createWriteStream(filepath);
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filepath}`);
        resolve();
      });

      file.on('error', (err) => {
        fs.unlink(filepath, () => {});
        console.warn(`Warning: Error writing file ${filepath}`);
        resolve(); // Skip this icon
      });
    }).on('error', (err) => {
      console.warn(`Warning: Error downloading ${url}`);
      resolve(); // Skip this icon
    });
  });
}

// Download all skill icons
async function downloadAllIcons() {
  console.log('Starting download of skill icons...');
  
  const downloadPromises = Object.entries(SKILL_ICONS).map(([skill, url]) => {
    const filepath = path.join(SKILLS_DIR, `${skill}.svg`);
    return downloadFile(url, filepath);
  });

  try {
    await Promise.all(downloadPromises);
    console.log('All available skill icons downloaded!');
  } catch (error) {
    console.error('Error downloading skill icons:', error);
    process.exit(1);
  }
}

// Run the download
downloadAllIcons(); 
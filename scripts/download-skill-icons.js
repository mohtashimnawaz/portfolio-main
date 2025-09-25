const fs = require('fs');
const path = require('path');
const https = require('https');

const SKILL_ICONS = {
  'html-css': {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    fallback: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg'
  },
  'javascript': {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    fallback: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg'
  },
  'typescript': {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    fallback: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg'
  },
  'python': {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    fallback: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg'
  },
  'rust': {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg',
    fallback: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/rust/rust-original.svg'
  },
  'solana': {
    url: 'https://cryptologos.cc/logos/solana-sol-logo.svg',
    fallback: 'https://raw.githubusercontent.com/solana-labs/solana/master/web3.js/src/publickey.ts'
  },
  'smart-contracts': {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ethereum/ethereum-original.svg',
    fallback: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/ethereum/ethereum-original.svg'
  },
  'nextjs': {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    fallback: 'https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png'
  },
  'tailwind': {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    fallback: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg'
  },
  'web3': {
    url: 'https://avatars.githubusercontent.com/u/6250754?s=200&v=4',
    fallback: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/web3js/web3js-original.svg'
  },
  'icp': {
    url: 'https://cryptologos.cc/logos/internet-computer-icp-logo.svg',
    fallback: 'https://dashboard.internetcomputer.org/img/icp-logo.svg'
  },
  'react': {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    fallback: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg'
  },
  'git': {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    fallback: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg'
  },
  'nodejs': {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    fallback: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg'
  },
  'postgresql': {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    fallback: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg'
  },
  'express': {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    fallback: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg'
  },
  'docker': {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    fallback: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg'
  },
  'linux': {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    fallback: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg'
  },
  'game-dev': {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg',
    fallback: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/unity/unity-original.svg'
  },
  'vscode': {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    fallback: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg'
  },
  'graphics': {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg',
    fallback: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/blender/blender-original.svg'
  }
};

const SKILLS_DIR = path.join(__dirname, '../public/skills');

// Create skills directory if it doesn't exist
if (!fs.existsSync(SKILLS_DIR)) {
  fs.mkdirSync(SKILLS_DIR, { recursive: true });
}

// Function to download a file
function downloadFile(url, filepath, fallbackUrl = null) {
  return new Promise((resolve, reject) => {
    const attemptDownload = (downloadUrl) => {
      https.get(downloadUrl, (response) => {
        // Handle redirects
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          return attemptDownload(response.headers.location);
        }

        if (response.statusCode !== 200) {
          console.warn(`Warning: Failed to download ${downloadUrl}: ${response.statusCode}`);
          if (fallbackUrl && downloadUrl !== fallbackUrl) {
            console.log(`Trying fallback URL for ${path.basename(filepath)}`);
            return attemptDownload(fallbackUrl);
          }
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
          if (fallbackUrl && downloadUrl !== fallbackUrl) {
            console.log(`Trying fallback URL for ${path.basename(filepath)}`);
            return attemptDownload(fallbackUrl);
          }
          resolve(); // Skip this icon
        });
      }).on('error', (err) => {
        console.warn(`Warning: Error downloading ${downloadUrl}`);
        if (fallbackUrl && downloadUrl !== fallbackUrl) {
          console.log(`Trying fallback URL for ${path.basename(filepath)}`);
          return attemptDownload(fallbackUrl);
        }
        resolve(); // Skip this icon
      });
    };

    attemptDownload(url);
  });
}

// Download all skill icons
async function downloadAllIcons() {
  console.log('Starting download of skill icons...');
  
  const downloadPromises = Object.entries(SKILL_ICONS).map(([skill, iconData]) => {
    const filepath = path.join(SKILLS_DIR, `${skill}.svg`);
    const url = typeof iconData === 'string' ? iconData : iconData.url;
    const fallbackUrl = typeof iconData === 'object' ? iconData.fallback : null;
    return downloadFile(url, filepath, fallbackUrl);
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
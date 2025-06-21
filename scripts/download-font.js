const fs = require('fs');
const path = require('path');
const https = require('https');

const FONTS_DIR = path.join(__dirname, '../public/fonts');

// Create fonts directory if it doesn't exist
if (!fs.existsSync(FONTS_DIR)) {
  fs.mkdirSync(FONTS_DIR, { recursive: true });
}

// Download Inter font (WOFF format)
const fontUrl = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2';
const fontPath = path.join(FONTS_DIR, 'Inter-Bold.woff');

https.get(fontUrl, (response) => {
  if (response.statusCode !== 200) {
    console.error(`Failed to download font: ${response.statusCode}`);
    process.exit(1);
  }

  const file = fs.createWriteStream(fontPath);
  response.pipe(file);

  file.on('finish', () => {
    file.close();
    console.log('Font downloaded successfully!');
  });

  file.on('error', (err) => {
    fs.unlink(fontPath, () => {});
    console.error('Error writing font file:', err);
    process.exit(1);
  });
}).on('error', (err) => {
  console.error('Error downloading font:', err);
  process.exit(1);
}); 
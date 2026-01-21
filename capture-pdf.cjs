const puppeteer = require('puppeteer');
const PDFDocument = require('pdfkit');
const fs = require('fs');

async function capturePresentationToPDF() {
  console.log('Starting full-frame PDF capture...');

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2
    },
    args: ['--font-render-hinting=none']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  // Add print media emulation to ensure desktop styles
  await page.emulateMediaType('screen');

  await page.goto('http://localhost:5173/', {
    waitUntil: 'networkidle0'
  });

  // Wait for fonts to load
  await page.evaluateHandle('document.fonts.ready');

  const screenshots = [];

  for (let i = 0; i < 14; i++) {
    console.log(`Capturing slide ${i + 1}/14...`);

    // Wait for animations and fonts to settle - increased for consistency
    await new Promise(resolve => setTimeout(resolve, 3000));

    // CAPTURING FULL FRAME - NO CLIPPING (Restores borders)
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: false,
      captureBeyondViewport: false
    });

    screenshots.push(screenshot);

    if (i < 13) {
      await page.keyboard.press('ArrowRight');
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
  }

  await browser.close();

  console.log('Assembling High-Fidelity PDF in A4 Landscape...');
  const doc = new PDFDocument({
    size: 'A4',
    layout: 'landscape',
    margin: 0
  });

  const outputPath = 'public/ZestOS-Presentation.pdf';
  const stream = fs.createWriteStream(outputPath);

  return new Promise((resolve, reject) => {
    stream.on('error', reject);
    stream.on('finish', () => {
      console.log('✅ PDF successfully assembled: ' + outputPath);
      resolve();
    });

    doc.pipe(stream);

    screenshots.forEach((screenshot, index) => {
      if (index > 0) {
        doc.addPage({ size: 'A4', layout: 'landscape', margin: 0 });
      }

      doc.rect(0, 0, doc.page.width, doc.page.height).fill('#000000');

      doc.image(screenshot, 0, 0, {
        fit: [doc.page.width, doc.page.height],
        align: 'center',
        valign: 'center'
      });
    });

    doc.end();
  });
}

capturePresentationToPDF().then(() => {
  console.log('Capture process finished successfully.');
  process.exit(0);
}).catch(err => {
  console.error('Capture failed:', err);
  process.exit(1);
});

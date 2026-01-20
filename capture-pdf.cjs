const puppeteer = require('puppeteer');
const PDFDocument = require('pdfkit');
const fs = require('fs');

async function capturePresentationToPDF() {
  console.log('Starting high-fidelity PDF capture (Fixed Framing)...');

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2
    }
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  await page.goto('http://localhost:5173/', {
    waitUntil: 'networkidle0'
  });

  const screenshots = [];

  for (let i = 0; i < 14; i++) {
    console.log(`Capturing slide ${i + 1}/14...`);

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Adjusted clipping to keep headers safe while still "zooming in" slightly
    const screenshot = await page.screenshot({
      type: 'png',
      clip: {
        x: 50,      // Minimal side trim
        y: 20,      // Very minimal top trim to ensure headers are NOT cut off
        width: 1820,
        height: 1020
      }
    });

    screenshots.push(screenshot);

    if (i < 13) {
      await page.keyboard.press('ArrowRight');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  await browser.close();

  console.log('Assembling PDF in A4 Landscape...');
  const doc = new PDFDocument({
    size: 'A4',
    layout: 'landscape',
    margin: 0
  });

  const outputPath = 'public/ZestOS-Presentation.pdf';
  const stream = fs.createWriteStream(outputPath);
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

  stream.on('finish', () => {
    console.log('✅ PDF successfully assembled: ' + outputPath);
  });
}

capturePresentationToPDF().catch(console.error);

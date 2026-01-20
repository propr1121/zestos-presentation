const puppeteer = require('puppeteer');
const PDFDocument = require('pdfkit');
const fs = require('fs');

async function capturePresentationToPDF() {
  console.log('Starting high-fidelity PDF capture...');
  
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2 // High resolution
    }
  });

  const page = await browser.newPage();
  // Ensure we are in a desktop-like environment for the capture
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  
  await page.goto('https://zestos-presentation.vercel.app/', {
    waitUntil: 'networkidle0'
  });

  const screenshots = [];

  // Capture all 14 slides
  for (let i = 0; i < 14; i++) {
    console.log(`Capturing slide ${i + 1}/14...`);
    
    // Wait for animations and any dynamic content
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: false
    });
    
    screenshots.push(screenshot);
    
    if (i < 13) {
      await page.keyboard.press('ArrowRight');
      // Extra wait for the slide transition to finish
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  await browser.close();

  console.log('Assembling PDF in A4 Landscape...');
  // A4 Landscape is [841.89, 595.28] points
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
    
    // Fill background with black to avoid white borders
    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#000000');
    
    // Fit the high-res screenshot to the A4 page perfectly
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

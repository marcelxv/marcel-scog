const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const puppeteer = require('puppeteer');

async function convertResumeToPDF() {
  try {
    // Read the markdown file
    const markdownPath = path.join(process.cwd(), 'resume.md');
    const markdownContent = fs.readFileSync(markdownPath, 'utf8');
    
    // Convert markdown to HTML
    const htmlContent = marked(markdownContent);
    
    // Create a complete HTML document with professional styling
    const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Marcel Scognamiglio - Resume</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Georgia', 'Times New Roman', serif;
            line-height: 1.6;
            color: #333;
            max-width: 8.5in;
            margin: 0 auto;
            padding: 0.75in;
            background: white;
        }
        
        h1 {
            font-size: 2.2em;
            color: #2c3e50;
            margin-bottom: 0.2em;
            border-bottom: 3px solid #3498db;
            padding-bottom: 0.2em;
        }
        
        h2 {
            font-size: 1.4em;
            color: #2c3e50;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
            border-bottom: 1px solid #bdc3c7;
            padding-bottom: 0.1em;
        }
        
        h3 {
            font-size: 1.2em;
            color: #34495e;
            margin-top: 1em;
            margin-bottom: 0.3em;
        }
        
        p {
            margin-bottom: 0.8em;
            text-align: justify;
        }
        
        ul {
            margin-left: 1.5em;
            margin-bottom: 0.8em;
        }
        
        li {
            margin-bottom: 0.3em;
        }
        
        strong {
            color: #2c3e50;
        }
        
        em {
            color: #7f8c8d;
        }
        
        hr {
            border: none;
            border-top: 1px solid #bdc3c7;
            margin: 1.5em 0;
        }
        
        .contact-info {
            text-align: center;
            margin-bottom: 1.5em;
            font-size: 0.95em;
            color: #7f8c8d;
        }
        
        .section-content {
            margin-left: 0.5em;
        }
        
        .job-title {
            font-weight: bold;
            color: #2c3e50;
        }
        
        .company-date {
            font-style: italic;
            color: #7f8c8d;
            font-size: 0.9em;
        }
        
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1em;
            margin-bottom: 1em;
        }
        
        @media print {
            body {
                padding: 0.5in;
            }
            
            h1 {
                font-size: 2em;
            }
            
            h2 {
                font-size: 1.3em;
                page-break-after: avoid;
            }
            
            h3 {
                page-break-after: avoid;
            }
            
            .page-break {
                page-break-before: always;
            }
        }
    </style>
</head>
<body>
    ${htmlContent}
</body>
</html>`;

    // Launch Puppeteer and generate PDF
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setContent(fullHTML, { waitUntil: 'networkidle0' });
    
    // Generate PDF with professional settings
    const pdfPath = path.join(process.cwd(), 'public', 'resume.pdf');
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      }
    });
    
    await browser.close();
    
    console.log('✅ Resume PDF generated successfully at public/resume.pdf');
    
  } catch (error) {
    console.error('❌ Error generating resume PDF:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  convertResumeToPDF();
}

module.exports = { convertResumeToPDF };
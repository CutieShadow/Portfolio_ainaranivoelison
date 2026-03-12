import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

const site = JSON.parse(fs.readFileSync(new URL('../src/config/site.json', import.meta.url)));
const inputPath = new URL('../public/assets/Aina_Ranivoelison.pdf', import.meta.url);
const outputPath = new URL('../public/assets/Aina_Ranivoelison.pdf', import.meta.url);

async function cleanMetadata() {
  const existingPdfBytes = fs.readFileSync(inputPath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Set new metadata
  pdfDoc.setTitle(site.displayName + ' - CV');
  pdfDoc.setAuthor(site.displayName);
  pdfDoc.setSubject('CV');
  pdfDoc.setKeywords(['CV', 'Portfolio', site.displayName]);

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);
  console.log('PDF metadata cleaned and saved to', outputPath.pathname);
}

cleanMetadata().catch(err => {
  console.error('Failed to clean PDF metadata:', err);
  process.exit(1);
});
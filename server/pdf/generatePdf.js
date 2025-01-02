const puppeteer = require("puppeteer");
const path = require("path");

async function generatePDF() {
  // Inicia un nuevo navegador
  const browser = await puppeteer.launch();
  // Abre una nueva página
  const page = await browser.newPage();

  // Navega a la URL que contiene los adisos (ajusta la URL según sea necesario)
  await page.goto("https://tu-sitio-web.com/adisos", {
    waitUntil: "networkidle2",
  });

  // Genera el PDF y lo guarda
  const pdfPath = path.resolve(__dirname, "../pdf/output/adisos.pdf");
  await page.pdf({ path: pdfPath, format: "A4" });

  // Cierra el navegador
  await browser.close();

  return pdfPath;
}

module.exports = generatePDF;

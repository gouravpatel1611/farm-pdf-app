import ejs from "ejs";
import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
import { mergeAndSortByDate } from "./mergeList.js";

export async function generatePDF({ data, summary, charts }) {
  try {
    const templatePath = path.join(process.cwd(), "templates", "report.ejs");
    const headerPath = path.join(process.cwd(), "templates", "header.ejs");
    const footerPath = path.join(process.cwd(), "templates", "footer.ejs");
    
    const mixdata = mergeAndSortByDate(data.expenses , data.incomes);
    const html = await ejs.renderFile(templatePath, {
      data,
      summary,
      mixdata,
      mycharts :{
        expenseChart:`http://localhost:5000${charts.expenseChart}`,
        incomeChart: `http://localhost:5000${charts.incomeChart}`,
      },
    });

    const footerHtml = await ejs.renderFile(footerPath, {} );
    const iconBase64 = fs.readFileSync('./public/logo.png', { encoding: 'base64' });

    console.log(data);
    const headerHtml = await ejs.renderFile(headerPath, 
      {
        reportTitle: `${data.farmer.crop_name}_${data.farmer.total_acres}Acres_${data.farmer.season}_${data.farmer.date_of_sowing.split('-')[0]}`,
        generatedOn: new Date().toLocaleString(),
        farmerName: data.farmer.farmer_name,
        iconBase64 : iconBase64,
      }
    );



    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });

    // ---------- GENERATE PDF BUFFER ----------
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: headerHtml,
      footerTemplate: footerHtml,
      margin: {
        top: "120px",
        bottom: "50px",
        left: "10px",
        right: "10px",
      },
    });

    await browser.close();

    // ---------- SAVE PDF IN PUBLIC FOLDER ----------
    const reportsFolder = path.join(process.cwd(), "public", "reports");

    // Create folder if not exists
    if (!fs.existsSync(reportsFolder)) {
      fs.mkdirSync(reportsFolder, { recursive: true });
    }

    const fileName = `farm_report_${Date.now()}.pdf`;
    const filePath = path.join(reportsFolder, fileName);

    fs.writeFileSync(filePath, pdfBuffer);

    console.log("PDF Saved At:", filePath);

    // Return both
    return {
      pdfBuffer,
      fileUrl: `/public/reports/${fileName}`
    };

  } catch (err) {
    console.error("PDF Generation Error:", err);
    throw new Error("Failed to generate PDF");
  }
}

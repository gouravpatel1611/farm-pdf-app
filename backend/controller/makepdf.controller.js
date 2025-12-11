import {
  validateFarmer,
  validateExpenses,
  validateIncomes,
} from "../utils/validateData.js";

import { computeSummary } from "../utils/computeSummary.js";
import { generateCharts } from "../utils/generateChart.js";
import { generatePDF } from "../utils/generatePDF.js";

export const generateReportController = async (req, res) => {
  try {
    const data = req.body;


    const farmerError = validateFarmer(data.farmer);
    if (farmerError) return res.status(400).json({ error: farmerError });

    const expError = validateExpenses(data.expenses);
    if (expError) return res.status(400).json({ error: expError });

    const incError = validateIncomes(data.incomes);
    if (incError) return res.status(400).json({ error: incError });


    const summary = computeSummary(data);


    const charts = await generateCharts(data);
    console.log(charts);

    const { pdfBuffer , fileUrl } = await generatePDF({
      data,
      summary,
      charts,
    });

    const fullURL = `${req.protocol}://${req.get("host")}${fileUrl}`;


    console.log("Sending PDF... size:", pdfBuffer.length);
    console.log("Sending PDF... link:", fullURL);

    return res.json({
        success: true,
        url: fullURL
    });

  } catch (err) {
    console.error("CONTROLLER ERROR: ", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

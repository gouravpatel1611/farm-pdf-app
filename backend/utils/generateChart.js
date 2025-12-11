import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import fs from "fs";
import path from "path";

// Register plugin
Chart.register(ChartDataLabels);

const chartMaker = new ChartJSNodeCanvas({ width: 600, height: 400 });

export async function generateCharts(data) {
  // ------------------ EXPENSE CHART CONFIG ------------------
  const expenseConfig = {
    type: "pie",
    data: {
      labels: data.expenses.map(e => e.category),
      datasets: [
        {
          data: data.expenses.map(e => e.amount),
        }
      ]
    },
    plugins: [ChartDataLabels],
    options: {
      plugins: {
        datalabels: {
          formatter: (value, ctx) => {
            const dataset = ctx.chart.data.datasets[0].data;
            const total = dataset.reduce((a, b) => a + b, 0);
            const pct = ((value / total) * 100).toFixed(1);
            return pct + "%";
          },
          color: "#fff",
          font: { weight: "bold", size: 14 }
        }
      }
    }
  };

  const expenseBuffer = await chartMaker.renderToBuffer(expenseConfig);
  const expensePath = path.join("public", "expenseChart.png");
  fs.writeFileSync(expensePath, expenseBuffer);

  // ------------------ INCOME CHART CONFIG ------------------
  const incomeConfig = {
    type: "pie",
    data: {
      labels: data.incomes.map(i => i.category),
      datasets: [
        {
          data: data.incomes.map(i => i.amount),
        }
      ]
    },
    plugins: [ChartDataLabels],
    options: {
      plugins: {
        datalabels: {
          formatter: (value, ctx) => {
            const dataset = ctx.chart.data.datasets[0].data;
            const total = dataset.reduce((a, b) => a + b, 0);
            const pct = ((value / total) * 100).toFixed(1);
            return pct + "%";
          },
          color: "#fff",
          font: { weight: "bold", size: 14 }
        }
      }
    }
  };

  const incomeBuffer = await chartMaker.renderToBuffer(incomeConfig);
  const incomePath = path.join("public", "incomeChart.png");
  fs.writeFileSync(incomePath, incomeBuffer);

  // RETURN PATHS
  return {
    expenseChart: "/public/expenseChart.png",
    incomeChart: "/public/incomeChart.png"
  };
}

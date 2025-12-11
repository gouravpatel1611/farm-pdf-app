# 🌾 Farm Finance PDF App

A **full-stack application** with **React.js frontend** and **Node.js (Express) backend** that collects farm finance data and generates a **downloadable PDF report**. The PDF includes charts, summaries, tables, and ledger entries, all with a GramIQ-style header and footer.

This project is part of the **Backend Developer Intern – Technical Assignment**.

---

## 📌 Project Overview

The Farm Finance PDF App allows users to:

- Enter **farmer**, **crop**, **expense**, and **income** details using a React form  
- Generate a **structured PDF finance report**  
- Preview & download the PDF  
- Include **pie charts, tables, summaries, and an auto-calculated ledger**

### 📄 PDF Contents:
- Dynamic header (logo, title, timestamp, farmer name)  
- Finance summary (total income, total expenses, profit, cost per acre)  
- Pie chart visualization  
- Expense and income tables  
- Auto-generated ledger (merged and sorted by date)  
- Footer on every page  

---

## 🚀 Features

### 🔧 Backend (Node.js + Express)
- PDF generation using **EJS templates**  
- Header & footer on every page  
- Pie chart dynamically generated (Chart.js / canvas-to-buffer)  
- Summary calculations  
- Multiple EJS templates for header, footer, and main content  
- Simple **POST route** to receive form data and generate PDF  

### 🖥️ Frontend (React.js)
- Modern **form page** (`FormPage.js`)  
- Loading spinner while PDF is generated  
- **Download Page** (`DownloadPage.js`) for preview & download  
- Uses **fetch API** or direct form submission to send data to backend  
- Clean, responsive UI with custom CSS  

---

## 📂 Project Folder Structure



🏁 Getting Started
🛠 Backend Setup
cd backend
npm install
npm run dev

🌐 Frontend Setup
cd frontend
npm install
npm start

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RowInput from "../components/RowInput";

export default function FormPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [farmer, setFarmer] = useState({
    farmer_name: "",
    crop_name: "",
    season: "Kharif",
    total_acres: "",
    date_of_sowing: "",
    date_of_harvest: "",
    state: "",
    district: "",
    pincode: "",
    full_address: ""
  });

  const [expenses, setExpenses] = useState([{ category: "", amount: "", date: "", description: "" }]);
  const [incomes, setIncomes] = useState([{ category: "", amount: "", date: "", description: "" }]);

  // Handle farmer input changes
  const handleFarmerChange = (field, value) => {
    setFarmer({ ...farmer, [field]: value });
  };

  // Handle dynamic row changes
  const handleRowChange = (setter, rows, index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setter(updated);
  };

  // Remove a row
  const handleRowRemove = (setter, rows, index) => {
    const updated = [...rows];
    updated.splice(index, 1);
    setter(updated);
  };

  // Add new row
  const handleAddRow = (setter, rows) => {
    setter([...rows, { category: "", amount: "", date: "", description: "" }]);
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (!farmer.farmer_name || !farmer.crop_name || !farmer.total_acres || !farmer.date_of_sowing || !farmer.date_of_harvest) {
      alert("Please fill all required farmer fields.");
      setLoading(false);
      return;
    }

    function validateRows(rows, type) {
      for (let i = 0; i < rows.length; i++) {
        const r = rows[i];
        if (!r.category || !r.amount || r.amount <= 0 || !r.date) {
          throw new Error(`Please fill all required fields in ${type} row ${i + 1} with valid amount.`);
        }
      }
      return rows;
    }

    let payload;
    try {
      payload = {
        farmer,
        expenses: validateRows(expenses, "Expense"),
        incomes: validateRows(incomes, "Income")
      };
    } catch (err) {
      alert(err.message);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/v1/make-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const data = await res.json();
      setLoading(false);

      // Redirect to download page with PDF URL
      navigate("/download", { state: { pdfUrl: data.url } });

    } catch (err) {
      setLoading(false);
      console.error(err);
      alert("Error generating PDF: " + err.message);
    }
  };

  return (
    <div className="container">
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}

      <h2>Farm Report Form</h2>
      <form onSubmit={handleSubmit}>

        <h3>Farmer Info</h3>
        <input placeholder="Farmer Name" value={farmer.farmer_name} onChange={(e) => handleFarmerChange("farmer_name", e.target.value)} required /><br />
        <input placeholder="Crop Name" value={farmer.crop_name} onChange={(e) => handleFarmerChange("crop_name", e.target.value)} required /><br />
        <select value={farmer.season} onChange={(e) => handleFarmerChange("season", e.target.value)}>
          <option>Kharif</option>
          <option>Rabi</option>
          <option>Summer</option>
        </select><br />
        <input type="number" placeholder="Total Acres" value={farmer.total_acres} onChange={(e) => handleFarmerChange("total_acres", e.target.value)} required /><br />
        <input type="date" value={farmer.date_of_sowing} onChange={(e) => handleFarmerChange("date_of_sowing", e.target.value)} required /><br />
        <input type="date" value={farmer.date_of_harvest} onChange={(e) => handleFarmerChange("date_of_harvest", e.target.value)} required /><br />
        <input placeholder="State" value={farmer.state} onChange={(e) => handleFarmerChange("state", e.target.value)} required /><br />
        <input placeholder="District" value={farmer.district} onChange={(e) => handleFarmerChange("district", e.target.value)} required /><br />
        <input placeholder="Pin Code" value={farmer.pincode} onChange={(e) => handleFarmerChange("pincode", e.target.value)} required /><br />
        <input placeholder="Full Address" value={farmer.full_address} onChange={(e) => handleFarmerChange("full_address", e.target.value)} required /><br />

        <h3>Expenses</h3>
        {expenses.map((row, i) => (
          <RowInput key={i} row={row} index={i} handleChange={(index, field, value) => handleRowChange(setExpenses, expenses, index, field, value)} handleRemove={(index) => handleRowRemove(setExpenses, expenses, index)} />
        ))}
        <button type="button" className="add-btn" onClick={() => handleAddRow(setExpenses, expenses)}>Add Expense</button>

        <h3>Incomes</h3>
        {incomes.map((row, i) => (
          <RowInput key={i} row={row} index={i} handleChange={(index, field, value) => handleRowChange(setIncomes, incomes, index, field, value)} handleRemove={(index) => handleRowRemove(setIncomes, incomes, index)} />
        ))}
        <button type="button" className="add-btn" onClick={() => handleAddRow(setIncomes, incomes)}>Add Income</button>

        <br /><br />
        <button type="submit">Generate PDF</button>
      </form>
    </div>
  );
}

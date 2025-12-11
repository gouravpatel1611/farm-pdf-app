import React from "react";

export default function RowInput({ row, index, handleChange, handleRemove }) {
  return (
    <div style={{ marginBottom: "5px" }}>
      <input
        placeholder="Category"
        value={row.category}
        onChange={(e) => handleChange(index, "category", e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={row.amount}
        onChange={(e) => handleChange(index, "amount", e.target.value)}
      />
      <input
        type="date"
        value={row.date}
        onChange={(e) => handleChange(index, "date", e.target.value)}
      />
      <input
        placeholder="Description"
        value={row.description}
        onChange={(e) => handleChange(index, "description", e.target.value)}
      />
      <button onClick={() => handleRemove(index)}>X</button>
    </div>
  );
}

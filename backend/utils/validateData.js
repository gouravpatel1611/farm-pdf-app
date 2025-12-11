export function validateFarmer(f) {
  if (!f.farmer_name) return "Farmer name required";
  if (!f.crop_name) return "Crop name required";
  if (!f.season) return "Season required";

  if (!f.total_acres || f.total_acres <= 0)
    return "Total acres must be greater than 0";

  if (!f.date_of_sowing) return "Date of sowing required";
  if (!f.date_of_harvest) return "Date of harvest required";

  if (!f.state) return "State required";
  if (!f.district) return "District required";
  if (!f.pincode) return "Pincode required";
  if (!f.full_address) return "Full address required";

  return null; 
}

export function validateExpenses(expenses) {
  if (!Array.isArray(expenses)) return "Expenses must be an array";

  for (const e of expenses) {
    if (!e.category) return "Expense category required";
    if (!e.amount || e.amount <= 0) return "Expense amount invalid";
    if (!e.date) return "Expense date required";
  }

  return null;
}

export function validateIncomes(incomes) {
  if (!Array.isArray(incomes)) return "Incomes must be an array";

  for (const i of incomes) {
    if (!i.category) return "Income category required";
    if (!i.amount || i.amount <= 0) return "Income amount invalid";
    if (!i.date) return "Income date required";
  }

  return null;
}

import express from "express";
import cors from "cors";
import path from "path";

import makepdfrouter from "./routes/makepdf.route.js";

const app = express();

// Middlewares
app.use(cors({
  origin: "*",
  methods: "GET,POST",
  exposedHeaders: ["Content-Disposition"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public folder for charts
app.use("/public", express.static(path.join(process.cwd(), "public")));

// Routes
app.use("/api/v1", makepdfrouter);

app.get("/", (req, res) => {
  res.send("PDF Server Running Successfully!");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

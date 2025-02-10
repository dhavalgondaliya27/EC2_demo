const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect("mongodb+srv://dhaval:Dhaval9586@cluster0.qrpkc.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Schema & Model
const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const FormData = mongoose.model("FormData", formSchema);

// Routes
app.get("/", (req, res) => {
  res.render("form");
});

app.post("/submit", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newForm = new FormData({ name, email, message });
    await newForm.save();
    res.send("Form submitted successfully!");
  } catch (err) {
    res.status(500).send("Error saving form data.");
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const createTestIndexes = require("./config/testIndexes");
dotenv.config();

const app = express();


const categoryRoutes = require("./routes/categoryRoutes");
const testRoutes = require("./routes/testRoutes");
const packageRoutes = require("./routes/packageRoutes");
const branchRoutes = require("./routes/branchRoutes");
const postRoutes = require("./routes/postRoutes");
const faqRoutes = require("./routes/faqRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;


app.use("/api/categories", categoryRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/inquiries", inquiryRoutes);


const startServer = async () => {
  try {
    await connectDB();
    await createTestIndexes();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const createTestIndexes = require("./config/testIndexes");
const cookieParser = require("cookie-parser");
const createSlotIndexes = require("./config/slotIndexes");
const createBookingIndexes = require("./config/bookingIndexes");
const createHomeSamplingAreaIndexes = require("./config/homeSamplingAreaIndexes");


const app = express();
app.use(cookieParser());

const categoryRoutes = require("./routes/categoryRoutes");
const testRoutes = require("./routes/testRoutes");
const packageRoutes = require("./routes/packageRoutes");
const branchRoutes = require("./routes/branchRoutes");
const postRoutes = require("./routes/postRoutes");
const faqRoutes = require("./routes/faqRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const authRoutes = require("./routes/user.js");
const chatbotRoutes = require("./routes/chatbotRoutes.js");
const slotRoutes = require("./routes/slotRoutes.js");
const homeSamplingAreaRoutes = require("./routes/homeSamplingArea");
const bookingRoutes = require("./routes/bookingRoutes.js");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
app.get("/api/health", (req, res) => {
  const dbStatus = require("mongoose").connection.readyState;

  res.status(dbStatus === 1 ? 200 : 503).json({
    success: dbStatus === 1,
    message: dbStatus === 1
      ? "API and database are healthy"
      : "Database is not connected",
    database: dbStatus === 1 ? "connected" : "disconnected"
  });
});

app.use("/api/categories", categoryRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/home", homeSamplingAreaRoutes);
app.use("/api/bookings",bookingRoutes);


const startServer = async () => {
  try {
    await connectDB();
    await createTestIndexes();
    await createSlotIndexes();
    await createBookingIndexes();
    await createHomeSamplingAreaIndexes();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
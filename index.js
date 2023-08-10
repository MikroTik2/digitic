const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
const morgan = require("morgan");

const { notFound, errorHandler } = require("./middlwares/errorHandler.js");

const app = express();
const PORT = process.env.PORT || 6000;

// routes
const authRoutes = require("./routes/authRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const blogRoutes = require("./routes/blogRoutes.js");
const categoryProductRoutes = require("./routes/categoryProductRoutes.js");
const categoryBlogRoutes = require("./routes/categoryBlogRoutes.js");
const brandRoutes = require("./routes/brandRoutes.js");
const couponRoutes = require("./routes/couponRoutes.js");

// db
const dbConnect = require("./config/dbConnect.js");
dbConnect();

app.use(morgan("dev"));
app.use(cookieParser()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/user", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/category-product", categoryProductRoutes);
app.use("/api/category-blog", categoryBlogRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/coupon", couponRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server working on http://localhost:${PORT}`);
});
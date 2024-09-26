// Import required modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const helmet = require("helmet");

const customerRoutes = require("./routes/customerRoute");
const adminRoutes = require("./routes/adminRoute");
const auctionRoutes = require("./routes/auctionRoute");
const paymentRoutes = require("./routes/paymentRoutes");
const Report = require("./models/report");
const notificationsRoute = require("./routes/notifications");
let trxId = "";
let username = "";
let userEmail = "";
let price = 0;

// Create express app
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/notifications", notificationsRoute);
// Connect to MongoDB database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define a blank route
app.get("/", (req, res) => {
  res.send("THIS IS THE API");
});

app.use("/api/customer/", customerRoutes);
app.use("/api/admin/", adminRoutes);
app.use("/api/auctoin", auctionRoutes); /////////////////##################
app.use("/api/payment", paymentRoutes);

app.get("/api/report", async (req, res) => {
  const reportData = await Report.find({});
  res.send(reportData);
});

app.post("/api/make/report", async (req, res) => {
  const reportData = req.body;
  const newReport = new Report(reportData);
  const savedReport = await newReport.save();
  res.send(savedReport);
});
// sadman

app.post("/create-payment-intent", async (req, res) => {
  const booking = req.body;
  const price = booking.productPrice;
  const amount = price * 100;
  const name = booking.name;
  const email = booking.email;

  const paymentIntent = await stripe.paymentIntents.create({
    currency: "usd",
    amount: amount,
    payment_method_types: ["card"],
  });
  SetTexId(paymentIntent.client_secret);
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

const SetTexId = (id, name, email, amount) => {
  trxId = id;
  userEmail = email;
  username = name;
  price = price + amount;
};

app.patch("/auctoin/acceptbid/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const options = { upsert: true };
  const updatedDoc = {
    $set: {
      payment: True,
      bidtrnx: trxId,
      bidderName: username,
      bidderEmail: userEmail,
      bidAmount: price,
    },
  };
  const result = await bidderSchema.updateOne(filter, updatedDoc, options);
  res.send(result);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));

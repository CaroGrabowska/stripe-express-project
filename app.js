import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
dotenv.config();

const stripe = new Stripe(process.env.SECRET_KEY);

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const calculateOrderAmount = (items) => {
  return 1000;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(port, () => console.log(`Node server listening on port http://localhost:${port}!`));

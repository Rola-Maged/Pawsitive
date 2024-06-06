const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const stripe = require('stripe')('sk_test_51PLbE4JMaxbeAA5VN9CTie8PwNuPFypqai3D3nwmh18lUTQigGJ7sA8kve5hEZx6e413QlRBHbY0nFKFu4T19A8Z007McC24nB');

//Retrieve checkout
exports.retrieveCheckout = async(req,res)=>{
const session = await stripe.checkout.sessions.retrieve(
  'cs_test_a11YYufWQzNY63zpQ6QSNRQhkUpVph4WRmzW0zWJO2znZKdVujZ0N0S22u'
);
};

//Create checkout
exports.newCheckout = async(req,res)=>{
const session = await stripe.checkout.sessions.create({
    success_url: 'https://example.com/success',
    line_items: [
      {
        price: 'price_1MotwRLkdIwHu7ixYcPLm5uZ',
        quantity: 2,
      },
    ],
    mode: 'payment',
  });
};

//List checkout
exports.listCheckout = async(req,res)=>{
const sessions = await stripe.checkout.sessions.list({
    limit: 3,
  });
};

//List subscription
exports.listSubscription = async(req,res)=>{
    const subscriptions = await stripe.subscriptions.list({
        limit: 3,
      });
    
};

// create subscription
exports.newSubscription = async(req,res)=>{
const subscription = await stripe.subscriptions.create({
    customer: 'cus_QEMaWRVWRwGh5E',
    items: [
      {
        price: 'price_1POUoDJMaxbeAA5V1R0WyyTL',
      },
    ],
  });
};


//exports prducts front
exports.Products = async(req,res)=>{
var products = await stripe.products.list({
    limit: 3,
  });
 
 res.status(200).json(products);
};

/// products prices front
exports.PricesProducts = async(req,res)=>{
const prices = await stripe.prices.list({
    limit: 3,
  });
  console.log(prices)
  res.status(200).json(prices);
};

// retrieve subscription
exports.retrieveSubscription = async(req,res)=>{
    const subscription = await stripe.subscriptions.retrieve(
        'sub_1MowQVLkdIwHu7ixeRlqHVzs'
      );
};

// charge customer  
exports.charge = async (req, res) => {
    try {
      const { email, amount } = req.body;
      const customer = await stripe.customers.create(
        {
          description: 'My First Test Customer (created for API docs at https://docs.stripe.com/api)',
        },
        {
          idempotencyKey: 'KG5LxwFBepaKHyUD',
        }
      );
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 2000,
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
      });
      // const customer = await stripe.customers.create({ email });
      // const paymentIntent = await stripe.paymentIntents.create({
      //   amount: amount * 100, // Amount in cents
      //   currency: 'usd',
      //   customer: customer.id,
      // });
      res.status(200).json(paymentIntent);
    } catch (error) {
      res.status(500).json({ error: 'Payment failed' });
    }
  };

  
  //payment intent confirmation
  exports.confirmation = async (req, res) => {

    try {
        const { email, amount } = req.body;
        const customer = await stripe.customers.create(
          {
            description: 'My First Test Customer (created for API docs at https://docs.stripe.com/api)',
          },
          {
            idempotencyKey: 'KG5LxwFBepaKHyUD',
          }
        );

        
  const paymentIntent = await stripe.paymentIntents.confirm(
    'pi_3MtweELkdIwHu7ix0Dt0gF2H',
    {
      payment_method: 'pm_card_visa',
      return_url: 'https://www.example.com',
    }
  );

  res.status(200).json(paymentIntent);
} catch (error) {
  res.status(500).json({ error: 'Payment failed' });
}
};
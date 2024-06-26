const AuthController = require("../controllers/AuthController");
const PostController = require("../controllers/PostController");
const CategoriesController = require("../controllers/Categories");
const OrdersController = require("../controllers/Orders");
const OrderProductController = require("../controllers/OrderProducts");
const CartController = require("../controllers/Cart");
const ChipController = require("../controllers/ChipController");
const VetBookingController = require("../controllers/VetBooking");
const PetsController = require("../controllers/Pets");
const Email = require("../utils/sendEmail");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const fetch = require('node-fetch');
const FormData = require('form-data');
const UPLOADCARE_PUBLIC_KEY = '6a1f2328d9b1362407d2'  
const multer = require('multer');
const StripeController = require("../controllers/stripe");
const uploadcareClient = require('../config/uploadcare');
const { Readable } = require('stream');


//Sign up and Sign in and authenticastion (token) with reset and forgot password     WORKING!!!!!
router.post("/token", AuthController.token);
router.post("/signup", AuthController.signup);
router.post("/shopsignup", AuthController.shopsignup);
router.post("/vetsignup", AuthController.vetsignUp);
router.post("/signin", AuthController.signin);
router.post("/forgotPass", AuthController.forgotpassword, Email);
router.post("/post", AuthController.authenticateToken, PostController.addPost);
router.post("/reset/:token", AuthController.myReset);


//Displaying particular category of products    WORKING!!!!!
router.get("/category/chips", CategoriesController.displayChips )
router.get("/category/food", CategoriesController.displayFood )
router.get("/category/accessories", CategoriesController.displayAccessory )

//Displaying all products    WORKING!!!!!
router.get("/find", CategoriesController.viewAll)

//Creating Product from Shop's POV     WORKING!!!!!
router.post("/products/create", CategoriesController.createProduct)

//Search API by name of product   WORKING!!!!!
router.get("/search", CategoriesController.searchAll)

//Filter API for Products name + color    WORKING!!!!!
router.get("/filter", CategoriesController.filterProducts)



//categories CRUD joi WORKING!!!!!
router.post("/new/category", CategoriesController.createCategory);
router.get("/get/category", CategoriesController.getCategories);
router.get("/:id/get/category", CategoriesController.getCategoryById);
router.put("/:id/update/category", CategoriesController.updateCat);
router.delete("/:id/delete/category", CategoriesController.deleteCat);
 
 //products CRUD WORKING!!!!!
router.post("/new/product", CategoriesController.createProduct);
router.get("/get/product", CategoriesController.getProducts);
router.get("/:id/get/product", CategoriesController.getProductById);
router.put("/:id/update/product", CategoriesController.updateProd);
router.delete("/:id/delete/product", CategoriesController.deleteProd);

//orders CRUD joi WORKING!!!!!
router.post("/new/order", OrdersController.newOrder);
router.get("/get/order", OrdersController.getOrders);
router.get("/:id/get/order", OrdersController.getOrderById);
router.put("/:id/update/order", OrdersController.updateOrder);
router.delete("/:id/delete/order", OrdersController.deleteOrder);

/*
//orderedProducts CRUD
router.post("/new/orderprod", OrderProductController.createOrderProd);
router.get("/get/orderprod", OrderProductController.getOrderProduct);
router.get("/:id/get/orderprod", OrderProductController.getOrderProductById);
router.put("/:id/update/orderprod", OrderProductController.updateOrderProd);
router.delete("/:id/delete/orderprod", OrderProductController.deleteOrderProd);
*/

//Cart CRUD joi WORKING!!!!!
router.post("/new/cart", CartController.createCart);
router.get("/get/cart", CartController.getCart);
router.get("/:id/get/cart", CartController.getCartById);
router.put("/:id/update/cart", CartController.updateCart);
router.delete("/:id/delete/cart", CartController.deleteCart);


//Chip CRUD joi WORKING!!!!!
router.post("/new/chip", ChipController.createChip);
router.get("/get/chip", ChipController.getChip);
router.get("/:id/get/chip", ChipController.getChipById);
router.put("/:id/update/chip", ChipController.updateChip);
router.delete("/:id/delete/chip", ChipController.deleteChip);

//pets CRUD joi WORKING!!!!!
router.post("/new/pet", PetsController.createPet);
router.get("/get/pet", PetsController.getPets);
router.get("/:id/get/pet", PetsController.getPetById);
router.put("/:id/update/pet", PetsController.updatepet);
router.delete("/:id/delete/pet", PetsController.deletePet);

//vets CRUD WORKING!!!!!
/*
router.post("/new/vet", VetBookingController.createVet);
*/

router.get("/get/vet", VetBookingController.getVets);
router.get("/:id/get/vet", VetBookingController.getVetById);
router.put("/:id/update/vet", VetBookingController.updateVet);
router.delete("/:id/delete/vet", VetBookingController.deleteVet);

//booking CRUD with joi WORKING!!!!!!!!
router.post("/new/booking", VetBookingController.createBooking);
router.get("/get/booking", VetBookingController.getBookings);
router.get("/:id/get/booking", VetBookingController.getBookingById);
router.put("/:id/update/booking", VetBookingController.updateBooking);
router.delete("/:id/delete/booking", VetBookingController.deleteBooking);

//shop CRUD   WORKING!!!!!
router.get("/:id/get/shop", CategoriesController.getShopById);
router.put("/:id/update/shop", CategoriesController.updateShop);
router.delete("/:id/delete/shop", CategoriesController.deleteShop);

//user CRUD   WORKING!!!!!
router.get("/:id/get/user", CategoriesController.getUserById);
router.put("/:id/update/user", CategoriesController.updateUser);
router.delete("/:id/delete/user", CategoriesController.deleteUser);



// Multer middleware for handling multipart/form-data

const upload = multer({ dest: 'uploads/' });
const uploadFields = upload.fields([
  { name: 'profilePic', maxCount: 1 }
]);

// Route to handle file uploads
router.post('/upload', uploadFields, (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No file uploaded' });
  }
  console.log('Files:', req.files);
  console.log('Body:', req.body);
  res.send('Files uploaded successfully');
});





// checkout
router.get("/retreieve/checkout", StripeController.retrieveCheckout);
router.post("/new/checkout", StripeController.newCheckout);
router.get("/list/checkout", StripeController.listCheckout);

// subscription
router.get("/list/subscription", StripeController.listSubscription);
router.post("/new/subscription", StripeController.newSubscription);
router.get("/retrieve/subscription", StripeController.retrieveSubscription);

//payment intent
router.post("/charge", StripeController.charge); 
router.post("/confirmation", StripeController.confirmation);

router.get("/products", StripeController.Products); 

router.get("/PricesProducts", StripeController.PricesProducts);
 


module.exports = router;

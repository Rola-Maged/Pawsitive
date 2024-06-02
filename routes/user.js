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



//categories CRUD WORKING!!!!!
router.post("/new/category", CategoriesController.createCategory);
router.get("/get/category", CategoriesController.getCategories);
router.get("/:id/get/category", CategoriesController.getCategoryById);
router.put("/:id/update/category", CategoriesController.updateCat);
router.delete("/:id/delete/category", CategoriesController.deleteCat);
 
 //products CRUD WORKING!!!!!
router.get("/get/product", CategoriesController.getProducts);
router.get("/:id/get/product", CategoriesController.getProductById);
router.put("/:id/update/product", CategoriesController.updateProd);
router.delete("/:id/delete/product", CategoriesController.deleteProd);

//orders CRUD WORKING!!!!!
router.post("/new/order", OrdersController.newOrder);
router.get("/get/order", OrdersController.getOrders);
router.get("/:id/get/order", OrdersController.getOrderById);
router.put("/:id/update/order", OrdersController.updateOrder);
router.delete("/:id/delete/order", OrdersController.deleteOrder);


//orderedProducts CRUD
router.post("/new/orderprod", OrderProductController.createOrderProd);
router.get("/get/orderprod", OrderProductController.getOrderProduct);
router.get("/:id/get/orderprod", OrderProductController.getOrderProductById);
router.put("/:id/update/orderprod", OrderProductController.updateOrderProd);
router.delete("/:id/delete/orderprod", OrderProductController.deleteOrderProd);


//Cart CRUD
router.post("/new/cart", CartController.createCart);
router.get("/get/cart", CartController.getCart);
router.get("/:id/get/cart", CartController.getCartById);
router.put("/:id/update/cart", CartController.updateCart);
router.delete("/:id/delete/cart", CartController.deleteCart);


//Chip CRUD
router.post("/new/cart", ChipController.createChip);
router.get("/get/cart", ChipController.getChip);
router.get("/:id/get/cart", ChipController.getChipById);
router.put("/:id/update/cart", ChipController.updateChip);
router.delete("/:id/delete/cart", ChipController.deleteChip);

//pets CRUD WORKING!!!!!
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

//booking CRUD      WORKING!!!!!!!!
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

const upload = multer();

// Route to handle file uploads
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file;
    const formData = new FormData();
    formData.append('UPLOADCARE_PUB_KEY', UPLOADCARE_PUBLIC_KEY);
    formData.append('file', file.buffer, { filename: file.originalname });

// Log FormData object before making the request
console.log('FormData:', formData);

const response = await fetch('https://upload.uploadcare.com/', {
  method: 'POST',
  body: formData,
});


    if (!response.ok) {
      throw new Error('Failed to upload file');
    }

    const data = await response.json();
    res.status(200).json({ fileUrl: data.file });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});




module.exports = router;

const router = require("express").Router();

const Car = require("../controllers/carController");

router.get("/", Car.getAllCars);
router.get("/:id", Car.getCarById);
router.post("/", Car.createCar);


module.exports = router;
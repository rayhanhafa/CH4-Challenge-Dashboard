const router = require("express").Router();

const Car = require("../controllers/carController");

router.post("/", Car.createCar);

module.exports = router;
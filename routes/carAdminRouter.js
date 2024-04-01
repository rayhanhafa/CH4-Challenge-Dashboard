const router = require("express").Router();
const express = require("express");

const CarAdmin = require("../controllers/carAdminController");

router.get("/", CarAdmin.carPage);
router.get("/create", CarAdmin.createCarPage);
router.get("/edit/:id", CarAdmin.editCarPage);

router.post("/admin/create", CarAdmin.createCar);
router.post("/admin/edit/:id", CarAdmin.editCar);
router.post("/admin/delete/:id", CarAdmin.deleteCar);

module.exports = router;
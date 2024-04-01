const { Car } = require("../models");
const { Op } = require('sequelize');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const carPage = async (req, res) => {
    try {
        let cars;
        if (req.query.category && req.query.category === 'small') {
            // Filter mobil dengan kategori "small"
            cars = await Car.findAll({ where: { category: 'Small' || "small" } });
        }
        else if (req.query.category && req.query.category === "medium") {
            // Filter mobil dengan kategori "medium"
            cars = await Car.findAll({ where: { category: "Medium" || "medium" } });
        }
        else if (req.query.category && req.query.category === "large") {
            // Filter mobil dengan kategori "lare"
            cars = await Car.findAll({ where: { category: "Large" || "large" } });
        }
        //Filter seacrh untuk nama mobil
        else if (req.query.searchName) {
            const searchName = req.query.searchName.toLowerCase(); // Ubah input menjadi huruf kecil
            cars = await Car.findAll({ where: { name: { [Op.iLike]: `%${searchName}%` } } });
        } else {
            cars = await Car.findAll();
        }

        res.render("cars/index.ejs", {
            cars,
            message: req.flash("message", ""),
        });
    } catch (err) {
        res.render("error.ejs", {
            message: err.message,
        });
    }
};

const createCarPage = async (req, res) => {
    try {
        res.render("cars/create.ejs");
    } catch (err) {
        res.render("error.ejs", {
            message: err.message,
        });
    }
};

// Konfigurasi Multer untuk menyimpan gambar di public/images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = `public/images`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Upload dengan Multer
const upload = multer({ storage: storage }).single('image');

const createCar = async (req, res) => {
    try {
        // Upload gambar dengan Multer
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                // Aksi jika terjadi kesalahan saat upload
                console.log(err.message);
            } else if (err) {
                // Aksi jika terjadi kesalahan lain saat upload
                console.log(err.message);
            } else {
                // Simpan data mobil ke dalam basis data
                const { name, price, category } = req.body;
                const imageUrl = req.file ? '/images/' + req.file.filename : ''; // Path gambar jika ada
                await Car.create({ name, price, category, imageUrl });
                req.flash("message", "Ditambah");
                res.redirect("/cars");
            }
        });
    } catch (err) {
        console.log(err.message);
    }
};


const editCarPage = async (req, res) => {
    try {
        const car = await Car.findByPk(req.params.id);

        res.render("cars/edit.ejs", {
            car,
        });
    } catch (err) {
        res.render("error.ejs", {
            message: err.message,
        });
    }
};

const editCar = async (req, res) => {
    try {
        await Car.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        req.flash("message", "Diedit");
        res.redirect("/cars");
    } catch (err) {
        res.render("error.ejs", {
            message: err.message,
        });
    }
};

const deleteCar = async (req, res) => {
    try {
        await Car.destroy({
            where: {
                id: req.params.id,
            },
        });
        req.flash("message", "Dihapus");
        res.redirect("/cars");
    } catch (err) {
        res.render("error.ejs", {
            message: err.message,
        });
    }
};

module.exports = {
    carPage,
    createCarPage,
    createCar,
    editCarPage,
    editCar,
    deleteCar
};
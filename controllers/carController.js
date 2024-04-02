const { Car } = require("../models");

const getAllCars = async (req, res) => {
    try {
        // Mengambil semua data mobil dari basis data
        const cars = await Car.findAll();

        // Mengirim response dengan data mobil yang berhasil diambil
        res.status(200).json({
            status: "success",
            data: {
                cars
            }
        });
    } catch (err) {
        // Mengirim response dengan pesan error jika terjadi kesalahan
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};

const getCarById = async (req, res) => {
    const { id } = req.params; // Mendapatkan _id dari parameter URL

    try {
        // Mengambil data mobil berdasarkan _id dari basis data
        const car = await Car.findByPk(id);

        // Jika data mobil ditemukan, kirim response dengan data mobil
        if (car) {
            res.status(200).json({
                status: "success",
                data: {
                    car
                }
            });
        } else {
            // Jika data mobil tidak ditemukan, kirim response dengan pesan bahwa data tidak ditemukan
            res.status(404).json({
                status: "error",
                message: "Data car not found"
            });
        }
    } catch (err) {
        // Mengirim response dengan pesan error jika terjadi kesalahan
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};

const createCar = async (req, res) => {
    const { name, category, price, image } = req.body

    try {
        //create data baru kedalam database
        const newCar = await Car.create({
            name,
            category,
            price,
            image,
        })

        // Mengirim response dengan data mobil yang berhasil diambil
        res.status(200).json({
            status: "succes",
            data: {
                newCar
            }
        })
    } catch (err) {
        // Mengirim response dengan pesan error jika terjadi kesalahan
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
}


module.exports = {
    getAllCars,
    getCarById,
    createCar,
}

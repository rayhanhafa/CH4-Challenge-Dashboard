const { Car } = require("../models");

const createCar = async (req, res) => {
    //destructuting object
    const { name, category, price, image } = req.body

    try {
        const newCar = await Car.create({
            name,
            category,
            price,
            image,
        })

        res.status(200).json({
            status: "succes",
            data: {
                newCar
            }
        })
    } catch (err) {
        console.log(err.message)
    }
}


module.exports = {
    createCar,
}

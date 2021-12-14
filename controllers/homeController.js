// const { json } = require("express")

const BigPromise = require('../middlewares/bigPromise');

exports.home = BigPromise((req, res) => {
    res.status(200).json({
        success : true,
        greeting : "Hello from home CONTROLLER "
    });
});



// If we want to use try-catch and async-await, following method should be followed as written in homeDummy example
exports.homeDummy = async (req, res) => {

    try {

        // const db = await something();

        res.status(200).json({
            success : true,
            greeting : "Hello from home dummy "
        })
    } catch (error) {
        console.log(error);
    };


    
};
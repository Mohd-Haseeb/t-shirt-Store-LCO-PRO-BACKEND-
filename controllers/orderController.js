const Order = require('../models/order');
const Product = require('../models/product');
const CustomError = require("../utils/customError");
const BigPromise = require("../middlewares/bigPromise");
const cloudinary = require("cloudinary");




exports.createOrder = BigPromise(async (req, res, next) => {

    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        taxAmount,
        shippingAmount,
        totalAmount,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        taxAmount,
        shippingAmount,
        totalAmount,
        user : req.user._id,
    });

    res.status(200).json({
        success : true,
        order,
    });

});

exports.getOneOrder = BigPromise(async (req,res, next) => {

    const order = await Order.findById(req.params.id).populate('user', 'name email role') ;

    if(!order){
        return next(new CustomError('please check order id again', 401));
    };

    res.status(200).json({
        success : true,
        order,
    });

});


exports.getLoggedInUserOrders = BigPromise(async (req, res, next) => {

    const order = await Order.find({user : req.user._id});

    if(!order){
        return next(new CustomError('please check order id', 401));
    }

    res.status(200).json({
        success : true,
        order,
    });
});


exports.adminGetAllOrders = BigPromise(async (req, res, next) => {    

        const orders = await Order.find();
    
        res.status(200).json({
            success : true,
            orders,
        });
});


exports.adminUpdateOrder = BigPromise(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if(order.orderStatus === 'Delivered'){
        return next(new CustomError('order is already marked as delivered', 401));
    }

    order.orderStatus === req.body.orderStatus;

    order.orderItems.forEach( async prod => {
        updateProductStock(prod.product, prod.quantity)
    });

    await order.save();

    res.status(200).json({
        success : true,
        order,
    });
});


exports.adminDeleteOrder = BigPromise(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    await order.remove();

    res.status(200).json({
        success : true,
    });
});


async function updateProductStock(productId, quantity){

    const product = await Product.findById(productId);
    
    product.stock = product.stock - qunatity;

    await product.save({validateBeforeSave : false});

}
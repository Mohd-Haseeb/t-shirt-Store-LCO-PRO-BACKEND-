const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'please provide product name'],
        trim : true,
        maxlength : [120, 'product name should not exceed more than 120 char']
    },

    price : {
        type : Number,
        required : [true, 'please provide product price'],
        maxlength : [6, 'product price should be more than 6 digits']
    },

    description : {
        type : String,
        required : [true, 'please provide product description']
    },  

    photos : [
        {
            id : {
                type : String,
                required : true
            },
            secure_url : {
                type : String,
                required : true
            }
        },
    ],

    category : {
        type : String,
        required : [true, 'please select category from - short-sleeves, long-sleeves, sweat-shirt and hoodies'],
        enum : {
            values : [
                'shortsleeves',
                'longsleeves',
                'sweatshirt',
                'hoodies'
            ],
            message : " please select category only from short-sleeves, long-sleeves, sweat-shirt and hoodies"
        },
    },

    brand : {
        type : String,
        required : [true, 'please add a brand for clothing '],
    },

    // this property stock was added during Order section
    stock : {
        type : Number,
        required : [true, 'please enter number of stocks available for this item'],
    },

    ratings : {
        type : Number,
        default : 0,
    },

    numberOfReviews : {
        type : Number,
        default : 0,
    },

    reviews : [
        {
            user : {
                type : mongoose.Schema.ObjectId,
                ref : 'User',
                required : true
            },
            name : {
                type : String,
                required : true
            },
            rating : {
                type : Number,
                required : true
            },
            comment : {
                type : String,
                required : true
            },


        }
    ],

    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
        required : true,
    },

    createdAt : {
        type : Date,
        default : Date.now
    },


});


module.exports = mongoose.model('Product',productSchema);
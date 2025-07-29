const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Title is required']
    },
    author: {
        type: String,
        trim: true,
        required: [true, 'Author is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: [20, 'Description must be greater than 20 characters']
    },
    cover_image: {
        type: String,
        validate: {
            validator: value => /\.(jpg|jpeg|png)$/i.test(value),
            message: props => `${props.value} is not a valid image format!`
        }
    }
})

module.exports = mongoose.model('Book', bookSchema);
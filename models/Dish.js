import mongoose from 'mongoose';


const DishSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },

    price: {
        type: Number,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    imageUrl: String,
    
    tags: {
        type: Array,
        default: [],
    },

    /** Пользователь, добавивший блюдо */
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
},
{
    // Временные метки при создании/изменении пользователя
    timestamps: true,
});

export default mongoose.model('Dish', DishSchema);
import mongoose from 'mongoose';

/** Модель блюда */
const DishSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },

    cookingtime: {
        type: String,
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

    ingredients: {
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
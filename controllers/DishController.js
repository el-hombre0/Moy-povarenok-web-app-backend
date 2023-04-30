import DishModel from '../models/Dish.js';
/**
 * Создание статьи
 * @param {*} req Запрос от клиента
 * @param {*} res Ответ от сервера
 */
export const create = async (req, res) => {
    try {
        const doc = new DishModel({
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const dish = await doc.save();
        res.json(dish);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to create a new dish!",
        });
    }
};

/**
 * Получение всех статей
 * @param {*} req Запрос от клиента
 * @param {*} res Ответ от сервера
 */
export const getAll = async (req, res) => {
    try {
        const dishes = await DishModel.find();
        res.json(dishes);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to get all dishes!",
        });
    }
};
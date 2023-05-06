import DishModel from '../models/Dish.js';
/**
 * Создание блюда
 * @param {*} req Запрос от клиента
 * @param {*} res Ответ от сервера
 */
export const create = async (req, res) => {
    try {
        const doc = new DishModel({
            title: req.body.title,
            cookingtime: req.body.cookingtime,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            ingredients: req.body.ingredients,
            tags: req.body.tags,
            user: req.userId,
        });

        const dish = await doc.save();
        res.json(dish);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to create the new dish!",
        });
    }
};

/**
 * Получение всех блюд
 * @param {*} req Запрос от клиента
 * @param {*} res Ответ от сервера
 */
export const getAll = async (req, res) => {
    try {
        /**
         * Передача связи user между документами и выполнение 
         */
        const dishes = await DishModel.find().populate('user').exec();
        res.json(dishes);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to get all dishes!",
        });
    }
};

/**
 * Получение одной блюда
 * @param {*} req Запрос от клиента
 * @param {*} res Ответ от сервера
 */
export const getOne = async (req, res) => {
    try {
        const dish = await DishModel.findById(req.params.id).populate('user').exec();
        if(!dish){
            return res.status(404).json({
                message: "The dish is not found!",
            })
        }
        res.json(dish);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to get the dish!",
        });
    }
};

/**
 * Удаление блюда
 * @param {*} req Запрос от клиента
 * @param {*} res Ответ от сервера
 */
export const remove = async (req, res) => {
    try {
        const dishId = req.params.id;
        DishModel.findOneAndDelete({_id: dishId})
        .then((doc) => {
            if(!doc){
                return res.status(404).json({
                    message: "The dish is not found!",
                })
            };
            res.json({
                success: true,
            });         
        })
        .catch((err) => {
            
            if(err){
                console.log(err); 
                return res.status(500).json({
                    message: "Failed to delete the dish!",
                }) 
            };
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to get the dish!",
        });
    }
};

export const update = (req, res) => {
    try {
        const dishId = req.params.id;
        DishModel.findOneAndUpdate({
            _id: dishId,
        },
        {
            title: req.body.title,
            cookingtime: req.body.cookingtime,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            ingredients: req.body.ingredients,
            user: req.userId,
        })
        .then((doc)=>{
            if(!doc){
                return res.status(404).json({
                    message: "The dish is not found!",
                })
            };
            res.json({
                success: true,
            })
        });        
    } 
    catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Failed to update the dish!',
        });
    }
}

/**
 * Получение тэгов из последних 5 статей
 */
export const getLastTags = async (req, res) => {
    try {
        
        const dishes = await DishModel.find().limit(5).exec();
        /** Берёт все статьи из массива данных блюда. 
         * С помощью flat() происходит конкатенация тэгов. 
         * Берутся полседние 5
         * */
        const tags = dishes.map(obj => obj.tags).flat().slice(0, 5);

        res.json(tags);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to get all dishes!",
        });
    }
};


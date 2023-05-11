import Dish from "../../models/Dish.js";
import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const resolvers = {
  Query: {
    /** Пользователи */
    async user(_, { ID }) {
      return await User.findById(ID);
    },

    async getUsers(_) {
      return await User.find();
    },

    async loginUser(_, { loginUserInput: { email, password } }) {
      const user = await User.findOne({ email: email });
      if (!user) {
        return {
          message: "User not found",
        };
      }
    //   console.log({ user });
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
    //   const isValidPass = await bcrypt.compare(
    //     password,
    //     User.findOne({ email: email }).passwordHash
    //   );
    //   console.log(isValidPass);
      if (user.passwordHash != hash) {
        return { message: "Incorrect login or password" };
      }
      const token = jwt.sign(
        {
          _id: user._id,
        },
        "secret123",
        {
          expiresIn: "10d",
        }
      );
      return{user} 
    },

    /** Блюда */
    async dish(_, { ID }) {
      return await Dish.findById(ID);
    },

    async getDishes(_) {
      return await Dish.find();
    },
  },

  Mutation: {
    /** Пользователи */
    async registerUser(
      _,
      { userInput: { fullName, email, password, avatarUrl } }
    ) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const registeredUser = new User({
        fullName: fullName,
        email: email,
        avatarUrl: avatarUrl,
        passwordHash: hash,
      });

      const res = await registeredUser.save();

      const token = jwt.sign(
        {
          _id: res._id,
        },
        "secret123",
        {
          expiresIn: "10d",
        }
      );

      return {
        id: res.id,
        ...res._doc,
        token,
      };
    },

    /** Создание блюда */
    async createDish(
      _,
      {
        dishInput: {
          title,
          cookingtime,
          description,
          imageUrl,
          tags,
          ingredients,
          user,
        },
      }
    ) {
      const createdDish = new Dish({
        title: title,
        cookingtime: cookingtime,
        description: description,
        imageUrl: imageUrl,
        tags: tags,
        ingredients: ingredients,
        user: user,
      });

      /** Сохранение в MongoDB */
      const res = await createdDish.save();
      console.log(res._doc);
      return {
        id: res.id,
        ...res._doc,
      };
    },

    /** Удаление блюда */
    async deleteDish(_, { ID }) {
      /** 1, если удаление произошло и 0, если нет */
      const wasDeleted = (await Dish.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted;
    },

    /** Изменение блюда */
    async editDish(
      _,
      {
        ID,
        dishInput: {
          title,
          cookingtime,
          description,
          imageUrl,
          tags,
          ingredients,
          user,
        },
      }
    ) {
      /** 1, если удаление произошло и 0, если нет */
      const wasEdited = (
        await Dish.updateOne(
          { _id: ID },
          {
            title: title,
            cookingtime: cookingtime,
            description: description,
            imageUrl: imageUrl,
            tags: tags,
            ingredients: ingredients,
            user: user,
          }
        )
      ).modifiedCount;
      return wasEdited;
    },
  },
};

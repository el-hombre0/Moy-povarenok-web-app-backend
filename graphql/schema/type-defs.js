import { gql } from "apollo-server";
export const typeDefs = gql`
  type User {
    _id: ID
    fullName: String
    email: String
    passwordHash: String
    avatarUrl: String
    token: String
  }

  type Dish {
    _id: ID
    title: String
    cookingtime: Int
    description: String
    imageUrl: String
    tags: [String]
    ingredients: [String]
    user: String
  }

  input UserInput {
    fullName: String
    email: String
    password: String
    avatarUrl: String
  }

  input LoginUserInput {
    email: String
    password: String
  }

  input DishInput {
    title: String
    cookingtime: Int
    description: String
    imageUrl: String
    tags: [String]
    ingredients: [String]
    user: String
  }

  type Query {
    user(ID: ID!): User!
    getUsers(amount: Int): [User]
    loginUser(loginUserInput: LoginUserInput): User!

    dish(ID: ID!): Dish!
    getDishes(amount: Int): [Dish]
  }

  type Mutation {
    registerUser(userInput: UserInput): User!

    createDish(dishInput: DishInput): Dish!
    deleteDish(ID: ID!): Boolean
    editDish(ID: ID, dishInput: DishInput): Boolean
  }
`;

import mongoose from "mongoose";
/** Модель пользователя */
const RoleSchema = new mongoose.Schema({
  value: {
    type: String,
    unique: true,
    default: "USER",
  },
});

export default mongoose.model("Role", RoleSchema);

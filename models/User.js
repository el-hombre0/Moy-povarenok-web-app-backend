import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    avatarUrl: String,
},
{
    // Временные метки при создании/изменении пользователя
    timestamps: true,
});

export default mongoose.model('User', UserSchema);
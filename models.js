
const mongoose = require('./db');

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    phoneNo: String,
    gender: String,
    qualification: String,
}, {
    versionKey: false,
}
);

const Users = mongoose.model('register', userSchema);

module.exports = Users;

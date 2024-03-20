var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    password:{
        type:String,
        default: ''
    },
    
});

UserSchema.pre('save', async function(next) {
try {
    // check method of registration
    const user = this;
    if (!user.isModified('password')) next();
    // generate salt
    const salt = await bcrypt.genSalt(10);
    // hash the password
    const hashedPassword = await bcrypt.hash(this.password, salt);
    // replace plain text password with hashed password
    this.password = hashedPassword;
    next();
    } catch (error) {
        return next(error);
    }
});
  
  UserSchema.methods.matchPassword = async function (password) {
    try {
        console.log("password",password);
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

var user = new mongoose.model('User', UserSchema);

module.exports = user;
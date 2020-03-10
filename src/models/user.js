const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: 
    {
        type: String,   
        required: true,
        trim: true
    },
    email:
    {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value)
        {
            if (!validator.isEmail(value))
            {
                throw new Error('Email is invalid')
            }
        }  
    },
    password:
    {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value)
        {
            if(value.toLowerCase().includes('password'))
            {throw new Error ('Please make you password more secure')}
        }
    },
    age: 
    {
        type: Number,
        default: 0,
        validate(value)
        {
            if (value < 0)
            {
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens: 

    [{
        token:
        {
            type: String,
            required: true
        }
    }]
}, //second argument of mongoose schema which is also an object and not object property for the user
{
    timestamps:true
})

userSchema.virtual('tasks',
{
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

//use methods to deal with individual documents 
userSchema.methods.generateAuthToken  = async function() //calling on a specific user
{
    const user = this 
    const token = jwt.sign( { _id: user._id.toString()}, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token }) //shorthand for token:token
    await user.save()

    return token
}


//use statics to deal with the whole collection
userSchema.statics.findByCredentials = async (email, password) =>
{
    const user = await User.findOne({ email }) //shorthand for email:email

    if(!user)
    {
        throw new Error('unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch)
    {
        throw new Error('Unable to login')
    }

    return user
}



//defining middleware which pauses and hashes the plain text password just before saving the user details 
userSchema.pre('save', async function (next)
{
    const user = this

    if (user.isModified('password'))
    {
        user.password = await bcrypt.hash(user.password, 8)
    }    
    next()
})


//delete user tasks when user is removed
userSchema.pre('remove', async function (next) 
{
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model('User', userSchema)


module.exports = User

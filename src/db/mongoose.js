const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, 
{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})



// const me = new User( 
//     {
//         name: '    price in the mix   ',
//         email: 'mailinator@GMAIL.COM     ',
//         password: 'PaSSword123'
//     }
// )

// me.save().then( () =>
// {
//     console.log(me)
// }).catch((error) =>
// {
//     console.log(error)
// })

// const Tasks = mongoose.model('Tasks',
// {
//     description:
//     {
//         type: String,
//         trim: true,
//         required: true
//     },
//     completed:
//     {
//         type: Boolean,
//         default: false
//     }
// })

// const task = new Tasks(
//     {
//         description: 'cycling around the city',
//     }
// )

// task.save().then( () =>
// {
//     console.log(task)
// }).catch( (error) =>
// {
//     console.log(error)
// })
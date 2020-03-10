const express = require('express')
require('./db/mongoose')        //calling mongoose to make sure the file runs 
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express() 
const port = process.env.PORT  //getting port for express

app.use(express.json())
app.use(userRouter)  // routing user endpoints
app.use(taskRouter)  // routing task endpoints

app.listen(port, () =>
{
    console.log('Server is up on port ' + port)
}) 

// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
//     // const task = await Task.findById('5c2e505a3253e18a43e612e6')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('5e638ca7539fd15994c66c7e')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()






// app.use( (req, res, next) => 
// {
//     if (req.method === 'GET') 
//     {
//         res.send('GET requests are disabled')
//     }
//     else
//     {
//         next()
//     }
// })

// app.use( (req, res, next) => 
// {
//     res.status(503).send(' the site is under maintenence ')

// })



// const jwt = require('jsonwebtoken')

// // hashing password using middleware before saving to DB
// const myfunction = async () => 
// {
//     const token = jwt.sign({ _id: 'abc123' }, 'this is my new course', { expiresIn: '7 days' })
//     console.log(token)

//     const data = jwt.verify(token, 'this is my new course')
//     console.log(data)
// }

// myfunction()


// // CRUD create read update delete

// const {MongoClient, ObjectId} = require('mongodb')

// const connectionURL = 'mongodb://127.0.0.1:27017'
// const databaseName = 'task-manager'


// MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) =>
// {
//     if(error)
//     {
//         return console.log('Unable to connect to database')
//     }
        
//     const db = client.db(databaseName)

//     // db.collection('users').deleteMany(
//     //     {
//     //         age: 22
//     //     }
//     // ).then( (result) =>
//     // {
//     //     console.log(result)
//     // }).catch( (error) =>
//     // {
//     //     console.log(error)
//     // })

//     // db.collection('tasks')
//     // .deleteOne({description: 'renew inspection'})
//     // .then( (result) =>{console.log(result)})
//     // .catch( (error) =>{console.log(error)})

//     // db.collection('tasks').updateMany(
//     //     {
//     //         completed: false
//     //     }, 
//     //     {
//     //         $set: 
//     //         {
//     //             completed: true
//     //         },
//     //     }
//     // ).then( (result) =>
//     // {
//     //     console.log(result.modifiedCount)
//     // }).catch( (error) =>
//     // {
//     //     console.log(error)
//     // })

    
//     // db.collection('tasks').findOne({ _id: new ObjectID("5e4f75848ba09d7b3d7126c9") }, (error, user) =>
//     // {
//     //     if(error)
//     //     {
//     //         return console.log('unable to fetch')
//     //     }
  
//     //     console.log(user)
//     // })

//     // db.collection('tasks').find({ completed: false }).toArray((error, task) =>
//     // {
//     //     console.log(task)
//     // })


// })  
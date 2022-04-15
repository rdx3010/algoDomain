const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;


const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager'; 

mongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if(error){
        console.log('Mongo database not connected!')
    }

    // console.log('Mongo database connected successfully!');

    const db = client.db(databaseName);

    // db.collection('users').insertMany([
    //     {
    //         name: 'Shyam Kumar',
    //         age: 27,
    //         city: 'Bengaluru'
    //     },
    //     {
    //         name: 'Ram Kumar',
    //         age: 27,
    //         city: 'Bengaluru'
    //     },
    //     {
    //         name: 'Purshottam Kumar',
    //         age: 27,
    //         city: 'Bengaluru'
    //     }
    // ], (error, result) => {
    //     if(error){
    //        return console.log('Data has not been inserted');
    //     }

    //     console.log(result);
    // })

    // db.collection('users').findOne({ _id: new ObjectId('624d45c7c773c9821bf1985a')}, (error, user) => {
    //     if(error){
    //         return console.log('Unable to fetch user');
    //     }

    //     console.log(user);
    // })

    db.collection('users').find({age: 27}).toArray((error, users) => {
        if(error){
            return console.log('Unable to fetch users');
        }

        console.log(users);
    })

    
});
const exp = require('express')
const dotenv = require('dotenv').config()
const app = exp()
const path = require('path')
app.use(exp.static(path.join(__dirname, './build')))
const { MongoClient } = require('mongodb')

const PORT = process.env.PORT || 3500
app.listen(PORT, () => console.log('server listening on port 3500...'))

const userApp = require('./APIs/usersAPI')
app.use('/user-api', userApp)

const conversationsApp = require('./APIs/conversationsAPI')
app.use('/conversation-api', conversationsApp)

const MONGODB_URI = process.env.MONGODB_URI
const client = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

client.connect()
.then((dbRef) => {
    const dbObj = dbRef.db('chatsdb')
    const usersCollectionObj = dbObj.collection('usersCollection')
    const conversationsCollectionObj = dbObj.collection('conversationsCollection')

    app.set('usersCollectionObj', usersCollectionObj)
    app.set('conversationsCollectionObj', conversationsCollectionObj)
    app.set('dbObj', dbObj);

    console.log('DB Connection Success..')
})
.catch(err => console.log('DB error' + err))

const pageRefresh = (req, res, next) => {
    res.sendFile(path.join(__dirname, './build/index.html'))
}
app.use("*", pageRefresh)

const invalidPathMiddleware = (req, res, next) => {
    res.send({message: 'Invalid Path'})
}
app.use(invalidPathMiddleware)

const errhandlingMiddleware = (error, req, res, next) => {
    res.send({message: error.message})
}
app.use(errhandlingMiddleware)
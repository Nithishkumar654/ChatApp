const exp = require('express')
const dotenv = require('dotenv').config()
const app = exp()
const path = require('path')
app.use(exp.static(path.join(__dirname, './build')))

const PORT = process.env.PORT || 3500
app.listen(PORT, () => console.log('server listening on port 3500...'))

const userApp = require('./APIs/usersAPI')
app.use('/user-api', userApp)

const conversationsApp = require('./APIs/conversationsAPI')
app.use('/conversation-api', conversationsApp)

const mclient = require('mongodb').MongoClient;

mclient.connect('mongodb://127.0.0.1')
.then(dbRef => {
    const dbObj = dbRef.db('chatsdb')
    const usersCollectionObj = dbObj.collection('usersCollection')
    const conversationsCollectionObj = dbObj.collection('conversationsCollection')
    const pdfCollectionObj = dbObj.collection('pdfCollection')

    app.set('usersCollectionObj', usersCollectionObj)
    app.set('conversationsCollectionObj', conversationsCollectionObj)
    app.set('pdfCollectionObj', pdfCollectionObj)

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
const exp = require('express')
const conversationsApp = exp.Router()
const bcryptjs = require('bcryptjs')
//const multerObj = require('./cloudinaryConfig')
const jwt = require('jsonwebtoken')

const expressAsyncHandler = require('express-async-handler')

conversationsApp.use(exp.json())

conversationsApp.post('/get-messages', expressAsyncHandler( async(req, res) => {
    const conversationsCollectionObj = req.app.get('conversationsCollectionObj')

    let messagesList = await conversationsCollectionObj.find({ $or: [{ $and: [ {senderId: req.body.host}, {receiverId: req.body.person} ] }, 
        { $and: [ {senderId: req.body.person}, {receiverId: req.body.host} ] } ] }).toArray();

    
    res.status(200).send({message: 'Conversation', chat: messagesList})
}))

conversationsApp.post('/send-message', expressAsyncHandler( async(req, res) => {
    const conversationsCollectionObj = req.app.get('conversationsCollectionObj')

    const newMessage = req.body

    let response = await conversationsCollectionObj.insertOne(newMessage)

    res.status(200).send({success: true, message: 'Message Sent'})

}))

const fs = require('fs');

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads'); // Set the destination folder where files will be stored temporarily
    },
    filename: (req, file, cb) => {
      console.log(file)
      cb(null, file.originalname); // Use the original filename
    },
  });

const multerObj = multer({storage})

conversationsApp.post('/send-file', multerObj.single('photo'), expressAsyncHandler( async(req, res) => {
    
    const conversationsCollectionObj = req.app.get('conversationsCollectionObj')
    const newMessage = JSON.parse(req.body.details)

    fs.readFile(req.file.path, async(err, data) => {
        if (err) {
          console.error('Error reading image file:', err);
          return res.status(500).send('Error reading image file');
        }
    
        newMessage.image = data.toString('base64');

        let response = await conversationsCollectionObj.insertOne(newMessage)

        res.status(200).send({success: true, message: 'Message Sent'})
      });

}))

const os = require('os');
const path = require('path')
const bodyParser = require('body-parser')
conversationsApp.use(bodyParser.json())
const { ObjectId } = require('mongodb');

conversationsApp.post('/download-file', expressAsyncHandler( async(req, res) => {

    const conversationsCollectionObj = req.app.get('conversationsCollectionObj')
    console.log(req.body)
    try{

        let id = req.body.id;
        let fileData = await conversationsCollectionObj.findOne({_id: new ObjectId(id)});

        const downloadPath = path.join(os.homedir(), 'Downloads', fileData.fileName);

        const imageBuffer = Buffer.from(fileData.image, 'base64')

        fs.writeFileSync(downloadPath, imageBuffer);
        res.status(200).send({success: true, message: 'File Downloaded Successfully'})
    
    }
    catch(err){
        res.status(400).send({message: 'Error while Downloading the file.. Consider re-downloading or re-sending..'})
    }
})
)


module.exports = conversationsApp;
const exp = require('express')
const conversationsApp = exp.Router()
const bcryptjs = require('bcryptjs')
//const multerObj = require('./cloudinaryConfig')
const jwt = require('jsonwebtoken')
const fs = require('fs');
const os = require('os');
const path = require('path')
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb');

const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, os.tmpdir()); // Create a destination folder - temporary folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename
  },
});

const multerObj = multer({storage})

const expressAsyncHandler = require('express-async-handler')

conversationsApp.use(exp.json())
conversationsApp.use(bodyParser.json())

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

conversationsApp.post('/send-file', multerObj.single('photo'), expressAsyncHandler( async(req, res) => {
    
    const conversationsCollectionObj = req.app.get('conversationsCollectionObj')
    const newMessage = JSON.parse(req.body.details)

    newMessage.fileType = req.file.mimetype;

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


conversationsApp.post('/download-file', expressAsyncHandler( async(req, res) => {

    const conversationsCollectionObj = req.app.get('conversationsCollectionObj')
  

    try{

        console.log(req.body)
        let id = req.body.id;
        let fileData = await conversationsCollectionObj.findOne({_id: new ObjectId(id)});
        
        console.log(fileData)

        const imageBuffer = Buffer.from(fileData.image, 'base64')
        console.log(imageBuffer)
        const downloadPath = path.join(os.homedir(), 'Downloads', fileData.fileName);
        console.log(downloadPath)
       

        fs.writeFileSync(downloadPath, imageBuffer);
        res.status(200).send({success: true, message: 'File Downloaded Successfully'})
    
    }
    catch(err){
        res.status(400).send({message: 'Error while Downloading the file.. Consider re-downloading or re-sending..'})
    }
})
)


module.exports = conversationsApp;

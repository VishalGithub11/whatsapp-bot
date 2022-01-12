const express = require("express");

require('dotenv').config();

const webApp = express();

webApp.use(express.urlencoded({
    extended:true
}));
webApp.use(express.json());
const {LocalStorage} = require('node-localstorage') 

const PORT = process.env.PORT;

var localStorage = new LocalStorage('./');

const senderFunction = require('./senderMessage');

//route
webApp.get("/", (req, res) => {
    res.send("Hello World")
})

webApp.post("/whatsapp", async(req, res) => {
    console.log("response", req.body)

      localStorage.setItem("prevmessage", req.body.Body)
    
        // Write a function to send message back to WhatsApp
        await senderFunction.sendMessage('Hello from the other side.', req.body.From, req.body.Body);

})


webApp.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}`);
});
 

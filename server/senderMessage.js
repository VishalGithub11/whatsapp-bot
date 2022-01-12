var accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
 
const client = require('twilio')(accountSid, authToken, { 
    lazyLoading: true 
});
const {LocalStorage} = require('node-localstorage') 


// Function to send message to WhatsApp
const sendMessage = async (message, senderID, prevMsg) => {
var localStorage = new LocalStorage('./');


    const msg1 = ["Supermarket", "Restaurant and Hotel", "Last Minute Persishables"]
    const msg = `Choose where you want to shop from  \n ${msg1.map((item, index) => {
        return (
            `${index+1}. ${item} \n`
        )
    }).join(" ")}`

    const prevMessage = localStorage.getItem("prevmessage")
    let nextMsg = ""
    if (prevMessage === msg1[0]) {
        nextMsg = "1. International, 2. National"

    }

    try {
        await client.messages.create({
            to: senderID,
            body: nextMsg == "" ?msg : nextMsg,
            from: `whatsapp:+14155238886`
        });
    } catch (error) {
        console.log(`Error at sendMessage --> ${error}`);
    }
};

module.exports = {
    sendMessage
}
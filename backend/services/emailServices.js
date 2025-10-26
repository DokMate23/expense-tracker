require("dotenv").config();
const brevoSdk = require("@sendinblue/client");

const client = new brevoSdk.TransactionalEmailsApi();
client.setApiKey(brevoSdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

async function sendEmail() {
  try {
    const emailData = {
      sender: { name: "Mateo", email: "mateodoka23@gmail.com" },
      to: [{ email: "mateodoka23@gmail.com", name: "Mateo" }],
      subject: "Expenses limit reached",
      htmlContent: "<html><body><h1>You have reached your expenses limit of $1000!</h1></body></html>",
    };

    const response = await client.sendTransacEmail(emailData);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email sending failed:", error);
  }
}

module.exports = { sendEmail };
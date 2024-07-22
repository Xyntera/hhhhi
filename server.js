const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

app.post('/subscribe', (req, res) => {
    const email = req.body.email;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Airdrop Reminder',
        text: 'Don\'t forget to check your pending airdrops!'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Error sending email', error });
        }
        res.status(200).json({ message: 'Email sent successfully!' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

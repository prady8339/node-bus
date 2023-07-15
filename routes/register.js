const nodemailer = require('nodemailer');

module.exports = function (app, User, passport) {

  app.get("/register", function (req, res) {
    res.render("register", { username: req.username });
  });

  app.post("/register", async function (req, res) {
    try {
      await User.register({ email: req.body.email, username: req.body.username, photo: "https://picsum.photos/200" }, req.body.password);
      passport.authenticate("local")(req, res, function () {
        res.redirect("/secrets");
      });
    } catch (err) {
      console.log(err);
      res.redirect("/register");
    }
  });
};

 //     const output = `
    //                   <h3>Hi,</h3>
    //                   <p>Hi,

    // We have received your request to create an account at Node Bus. We are excited to have you on board! To complete the registration process, please follow the link provided below: </p>
    //                   <button><a href="http://localhost:3000/createAccount">create account</a></button>
    //                 `;

    //     // create reusable transporter object using the default SMTP transport
    //     let transporter = nodemailer.createTransport({
    //       host: 'smtp.gmail.com',
    //       port: 587,
    //       secure: false, // true for 465, false for other ports
    //       auth: {
    //         user: process.env.USER_ID,
    //         pass: process.env.USER_PASSWORD
    //       },
    //       tls: {
    //         rejectUnauthorized: false
    //       }
    //     });

    //     // setup email data with unicode symbols
    //     let mailOptions = {
    //       from: '<node.nexsus@gmail.com>', // sender address
    //       to: req.body.email,// list of receivers
    //       subject: 'New Project Request', // Subject line
    //       text: 'Hello world?', // plain text body
    //       html: output // html body
    //     };

    //     // send mail with defined transport object
    //     transporter.sendMail(mailOptions, (error, info) => {
    //       if (error) {
    //         return console.log(error);
    //       }
    //       console.log('Message sent: %s', info.messageId);
    //       console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    //       res.redirect('/');
    //     });

module.exports = function(app,User){

app.get("/chat", (req, res) => {

    User.find({}, function (err, users) {
      if(err){console.log(err);}else{
        
        res.render('chat.ejs', {
              users: users,
              userDP: "https://lh3.googleusercontent.com/a/AATXAJwtzq2EGAbTWB1lF_6zsXabeCdTs6fLkvapTmne=s96-c",
              
            });
          }
        })
       })
     
}
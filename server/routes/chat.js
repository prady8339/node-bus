
module.exports = function(app,User,chatModel){

app.get("/chat", (req, res) => {

  if (req.isAuthenticated()) {

    chatModel.find({ }, function (err,chat) {
      if (err) {
        console.log(err);
      } else {

        
        res.render('chat.ejs',{
          chat: chat,
          username:req.user.username
        });
          }
        })



    }  else {
        res.redirect("/login")
      }

       })


       app.post('/chat', (req, res) => {



User.find({ "_id": { $eq:req.user.id} }, function (err, foundUsers) {
  if (err) {
    console.log(err);
  } else {

    const chat = new chatModel({
      username:foundUsers[0].username,
      content:req.body.content
     
    });

    chat.save();
res.redirect('/chat');
  }
});
      
       })
     

       app.post('/delete', (req, res) => {

         chatModel.findByIdAndRemove(req.body.deletePost, (err) => {
          
          if(err){
            console.log(err);
          }
          else{
            res.redirect("/chat")
          }
          });

       })
       app.post('/modify', (req, res) => {
        res.send("<h1>under construction... :)</h1> ")
       })
}

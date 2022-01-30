
module.exports = function(app,Post){
  
    app.get("/compose", (req, res) => {
    if (req.isAuthenticated()) {
            res.render('compose.ejs');
            }  else {
                res.redirect("/login")
              }
            })
       app.post('/compose', (req, res) => {
        const post = new Post({
          title: req.body.postTitle,
          content: req.body.postBody,
          UserId:req.user.id
        });
      
        post.save();
        res.redirect("/");
      
      });
            

    
         
    }
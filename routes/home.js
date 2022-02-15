
module.exports = function(app,Post,Trend){

  

app.get("/", (req, res) => {
  
    Post.find({}, function (err, posts) {
      if(err){
        console.log(err);
      }else{
        Trend.find({},function(err,trends){
          if(err){
            console.log(err);
          }
          else{
            res.render('home.ejs', {
             posts: posts,
              userDP: "https://lh3.googleusercontent.com/a/AATXAJwtzq2EGAbTWB1lF_6zsXabeCdTs6fLkvapTmne=s96-c",
              trends:trends
            });
          }
        })
       }
    })
  
});

         
    }
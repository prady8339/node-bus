
module.exports = function(app,Post,User){

  

app.get("/", (req, res) => {
  const users = [];
  Post.find({}, function (err, posts) {

      if(err){console.log(err);}
      else{
        
       
        posts.forEach(function(post){
          let i=0;
         console.log(post.UserId);
          User.find({ "_id": { $eq: post.UserId} }, function (err, foundUsers) {
            if (err) {
              console.log(err);
            } else {
           
     
           users.push(foundUsers[i].username);
             console.log(foundUsers[i].username)
            i++;
            }
            
          })
          
        });
  
    console.log(users);
        
   
            res.render('home.ejs', {
              posts: posts,
             users:users
            });
           
          
        
      }

    })
  
});

   
    }
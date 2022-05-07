
module.exports = function(app,Post,User){
  
    app.get("/compose", (req, res) => {
    if (req.isAuthenticated()) {
            res.render('compose.ejs',{username:req.username});
            }  else {
                res.redirect("/login")
              }
            })
       app.post('/compose', (req, res) => {



        User.find({ "_id": { $eq:req.user.id} }, function (err, foundUsers) {
          if (err) {
            console.log(err);
          } else {

            const today = new Date();
            
            const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

            const sufix = ["st","nd","rd","th"];
            let mysufix = "";
            if(today.getDate()%10-1<4)
             mysufix = [(today.getDate()%10-1)];
            else
            mysufix = "th";

            const date =today.getDate()+ mysufix + ' '+(monthNames[today.getMonth()]) +' '+today.getFullYear();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
          const post = new Post({
          title: req.body.postTitle,
          content: req.body.postBody,
          date:date,
          time:time,
          UserId:foundUsers[0]._id,
          username:foundUsers[0].username
        });
  
        post.save();
        res.redirect("/");


      }


      })
    
      
      });
            

    
         
    }

    




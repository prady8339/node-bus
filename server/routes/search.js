
module.exports = function(app){

    app.get("/search", function (req, res) {
        res.render("search",{username:req.username});
      });
      
      app.post("/search", function (req, res) {
        console.log(req.body.search);

        

      });
      
             
        }
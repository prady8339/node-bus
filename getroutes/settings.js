
module.exports = function(app,imgModel){
  
  
    app.get('/settings', (req, res) => {
        imgModel.find({}, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            }
            else {
                res.render('settings', { items: items });
            }
        });
    });
    
         
    }
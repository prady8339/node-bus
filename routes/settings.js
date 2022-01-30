
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
     
      cb(null,'/routes/uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage }); 



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
  

module.exports = function(app,imgModel){
  


    app.post('/settings', upload.single('image'), (req, res, next) => {
  
        var obj = {
            name: req.body.name,
            desc: req.body.desc,
            img: {
                data: fs.readFileSync(path.join('/uploads' + req.file.filename)),
                contentType: 'image/png'
            },
            UserId:req.user.id
        }
        imgModel.create(obj, (err, item) => {
            if (err) {
                console.log(err);
            }
            else {
                // item.save();
                res.redirect('/settings');
            }
        });
    });
    
    
         
    }
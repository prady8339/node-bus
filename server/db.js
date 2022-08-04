const mongoose = require('mongoose');

module.exports = async function connection(){
    try {
        const connectionParams = {
            useNewUrlParser: true,
             useUnifiedTopology: true 
        }
        await mongoose.connect(process.env.MONGOOSE_CLUSTER, connectionParams);
        // mongoose.connect("mongodb://localhost:27017/blogDBpost", { useNewUrlParser: true });
       // mongoose.set("useCreateIndex", true);

    } catch (error) {
       console.log(error);
       console.log("could not connect to database db.js");
    }
};
// // const mongoose=require('mongoose');
// // mongoose.connect("mongodb://localhost:27017/e-commerce");
// const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017/e-commerce", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 5000, // 5 seconds timeout
// })
// .then(() => console.log('Database connected successfully'))
// .catch((err) => console.log('Database connection error: ', err));


const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/e-commerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // 5 seconds timeout
})
.then(() => console.log('Database connected successfully'))
.catch((err) => console.log('Database connection error: ', err));

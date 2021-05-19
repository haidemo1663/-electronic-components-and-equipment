require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const user = require('./routers/user.router')
const category = require('./routers/categories.router');
const upload = require('./routers/upload.router');
const product = require('./routers/product.route')
const checkout = require('./routers/checkout.route')
const payment = require('./routers/payment.route')
const message=require('./routers/message.route')
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true
}));

//monkeylearn for ai
const MonkeyLearn = require('monkeylearn')

const ml = new MonkeyLearn('cc5a3979635888b734f715339adac34ce60bd288')
let model_id = 'ex_5mXzFYie'



//Routes
app.use('/user', user);
app.use('/category', category);
app.use('/images', upload);
app.use('/products', product);
app.use('/checkout', checkout);
app.use('/payment', payment);
app.use('/message',message);




//connect to mongoDB
mongoose
    .connect(process.env.URL_MONGODB, {
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error(`Connection failed...`)
    );

app.get('/', (req, res) => {
    res.json('test');
})


const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log('server is running on port', PORT);
})
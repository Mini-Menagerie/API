const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const db = require('./config/db');
require('./config/strategies').strategies()
const passport = require('passport');

app.use(cors())
//route
const userRouter = require('./routes/Users')
const breedRouter = require('./routes/Breed')
const categoryPetRouter = require('./routes/CategoryPet')
const userAccountRouter = require('./routes/UserAccount')
const adminAccountRouter = require('./routes/AdminAccount')
const productRouter = require('./routes/Product')
const productImageRouter = require('./routes/ProductImage')
const transactionRouter = require('./routes/Transaction')
const transactionDetailsRouter = require('./routes/TransactionDetails')
const petRouter = require('./routes/Pet')
const petUpForAdoptionRouter = require('./routes/PetUpForAdoption')
const petImageRouter = require('./routes/PetImage')
const formRequestRouter = require('./routes/FormRequest')

// Set up port
const port = process.env.PORT;

// Set up body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Set up database connection
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('we are connected'));

app.get('/', (req, res) => {
  res.send('Welcome to Web Service Mini Menagerie!')
})

app.use('/', userRouter)
app.use('/', breedRouter)
app.use('/', categoryPetRouter)
app.use('/', userAccountRouter)
app.use('/', adminAccountRouter)
app.use('/', productRouter)
app.use('/', productImageRouter)
app.use('/', transactionRouter)
app.use('/', transactionDetailsRouter)
app.use('/', petRouter)
app.use('/', petUpForAdoptionRouter)
app.use('/', petImageRouter)
app.use('/', formRequestRouter)

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
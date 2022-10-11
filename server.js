// Libraries
require("dotenv").config(); 
const express = require('express');
const mongoose = require("mongoose");

// URLS and Ports
const dbPath = 'mongodb://127.0.0.1:27017/comments-section'
const port = process.env.PORT || 5000;

// Using Libraries
const app = express();

// Routes
const userRouter = require('./routes/user')
const commentsRouter = require('./routes/comments')
const repliesRouter = require('./routes/replies')
const pageRouter = require('./routes/page')

// Set up routes
app.use(express.static('public'));
app.use(express.json())

// NOTE: pageRouter MUST come after all other routers
app.use(userRouter)
app.use(commentsRouter)
app.use(repliesRouter)
app.use(pageRouter)

// Set up MongoDB
mongoose.connect(dbPath, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err)=>{
  if(err) {
    console.log(err)
  } else {
    console.log("Success")
  }
})
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to DB'))

// Set up server
app.listen(port, () => {
  console.log(`Server is up at port ${port}`);
  console.log(`http://localhost:${port}`)
});
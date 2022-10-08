require("dotenv").config(); 
const path = require('path');
const dbPath = 'mongodb://127.0.0.1:27017/comments-section'
const express = require('express');
const app = express();

const commentsRouter = require('routes/comments')
const pageRouter = require('routes/page')

const port = process.env.PORT || 5000;
const mongoose = require("mongoose");

app.use(express.static('public'));
app.use(pageRouter)

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

app.use(express.json())
app.use(commentsRouter)


app.listen(port, () => {
  console.log(`Server is up at port ${port}`);
  console.log(`http://localhost:${port}`)
});




require("dotenv").config(); 
const dbPath = 'mongodb://127.0.0.1:27017/comments-section'
// Boilerplate
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");

app.use(express.static('public'));
app.get('*', (req, res) => {
  return res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

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

const commentsRouter = require('./routes/comments')
app.use('/comments', commentsRouter)


app.listen(port, () => {
  console.log(`Server is up at port ${port}`);
  console.log(`http://localhost:${port}`)
});




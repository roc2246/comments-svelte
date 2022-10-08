require("dotenv").config(); 

// Boilerplate
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL)
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

// const path = require('path');
// const mongodb = require('mongodb');

// // MongoDB


// const commentSchema = new mongoose.Schema({
//   id: Number,
//   content:
//     String,
//   createdAt: String,
//   score: Number,
//   user: {
//     image: {
//       png: String,
//       webp: String,
//     },
//     username: String,
//   },
//   replies: Array,
// }
// )

// const Comment = mongoose.model('Comment', commentSchema);

// app.get('/comments', (req, res) => {
//   Comment.find({}, (err, found) => {
//       if (!err) {
//           res.send(found);
//       }
//       console.log(err);
//       res.send("Some error occured!")
//   }).catch(err => console.log("Error occured, " + err));
// });

// // Routing
// app.use(express.static('public'));
// app.get('*', (req, res) => {
//   return res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// });

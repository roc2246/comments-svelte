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


// // Routing
// app.use(express.static('public'));
// app.get('*', (req, res) => {
//   return res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// });

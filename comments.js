// Create web server
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comment', { useNewUrlParser: true });

// Create schema
const commentSchema = new mongoose.Schema({
    name: String,
    content: String,
    timestamp: String
});

// Create model
const Comment = mongoose.model('Comment', commentSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create routes
app.get('/comments', async (req, res) => {
    const comments = await Comment.find();
    res.send(comments);
});

app.post('/comments', async (req, res) => {
    const comment = new Comment(req.body);
    await comment.save();
    res.send(comment);
});

// Start server
app.listen(3000, () => {
    console.log('Server started');
});
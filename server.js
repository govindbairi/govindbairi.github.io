const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();
const port = 3000; // or any port you prefer

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // If you are accessing from different origin

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/contactform', {
  
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define the Contact schema and model
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// Route to handle form submission
app.post('/submit', async (req, res) => {
  const { name, email, message } = req.body;

  const newContact = new Contact({
    name,
    email,
    message,
  });

  try {
    await newContact.save();
    res.json({ message: 'Thank you for contacting us!' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'There was an error. Please try again.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

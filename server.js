const express = require('express');
const app = express();

const connectDB = require('./config/db');
connectDB();

// Init Middleware
app.use(
  express.json({
    extended: false
  })
);

app.get('/', (req, res) => {
  res.send('API Running');
});

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

const PORT = process.env.PORT || '5000';
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});

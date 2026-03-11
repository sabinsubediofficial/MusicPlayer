require('dotenv').config();

//dns for mongodb atlas
const dns = require('node:dns/promises');
dns.setServers(['1.1.1.1', '8.8.8.8']);

//routes
const songRoutes = require('./routes/songRoute');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//connect mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

//test routes
app.get('/', (req, res) => {
  res.send('Music player API is running');
});

//apis
app.use('/api/songs', songRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

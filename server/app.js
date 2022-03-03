const express = require('express');
const app = express();
const connectDB = require('./db/connect');
require('dotenv').config();
const errorHandlerMiddleware = require('./middleware/error-handler');

const todos = require('./routes/todos');

app.use(express.static('../client/public'));
app.use(express.json());

app.use('/api/v1/todos', todos);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(PORT, async () => {
      console.log(`Le serveur écoute le port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

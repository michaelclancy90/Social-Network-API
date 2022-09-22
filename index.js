const express = require('express');
const { appendFile } = require('fs');
const db = require('./config/connection');
const routes = require('./routes');
const PORT = prcess.env.PORT || 3001;
constapp = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
  });
});

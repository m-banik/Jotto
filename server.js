const express = require('express');
const app = express();
const cors = require('cors');
const port = '8080';

app.use(cors());

const secretWords = ['party', 'train', 'agile'];

app.get('/get_secret_word', function (req, res) {
  console.log('Request has been made for the secret word.');
  const index = Math.floor(Math.random() * secretWords.length);
  const data = secretWords[index];
  res.status('200').send(data);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});

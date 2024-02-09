const express = require('express')
const app = express()
const port = 3000

import connectDB from './database';

connectDB();
// Rest of your server setup...


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
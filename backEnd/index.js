const connectToMongo = require('./db');
connectToMongo();
const express = require('express')

const app = express()
const port = 5000

app.use(express.json());
const authRoute = require("./routes/auth");
app.use("/api/user", authRoute);

// Available Routes
// app.use('/api/auth', require("./routes/auth"))
// app.use('/api/notes', require('./routes/notes'))

// app.use = (express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
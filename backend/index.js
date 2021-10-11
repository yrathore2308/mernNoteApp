const connectToDB=require('./db');
const express = require('express')
// const authRoute=require('./routes/auth');
// const notesRoute=require('./routes/notes');
const app = express()
var cors = require('cors')
 
app.use(cors())
connectToDB();
const port = 5000
app.use(express.json());
app.use("/api/auth",require('./routes/auth'))
app.use("/api/notes",require('./routes/notes'))

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`iNotebook app listening at http://localhost:${port}`)
})

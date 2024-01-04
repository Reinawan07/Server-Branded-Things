if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config()
}

const express = require('express')
const app = express()
// const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(require("./router"));

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

module.exports = app;
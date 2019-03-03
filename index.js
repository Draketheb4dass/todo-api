const express = require('express')
const app = express()

app.get('/notes', (req, res) => {
    res.send('read all note')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server is up and running on ${port}`)
})
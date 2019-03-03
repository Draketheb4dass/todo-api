const express = require('express')
const app = express()

app.get('/notes', (req, res) => {
    res.send('read note')
})

app.listen(3000, () => {
    console.log('server is up and running on 3000')
})
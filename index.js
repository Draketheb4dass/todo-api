const express = require('express')
const app = express()
const Joi = require('joi')

const port = process.env.PORT || 3000
app.use(express.json())

//get all the notes
app.get('/api/notes', (req, res) => {
    res.send(noteList)
})
const noteList = [
    {id:1, noteBody: 'Bonjou'},
    {id: 2, noteBody: 'Bonsoir'} 
]

//Get a specific note
app.get('/api/notes/:id', (req,res) => {
    const note = noteList.find( n => n.id === parseInt(req.params.id))
    if(!note) res.status(404).send("Note not found") 
    res.send(note.noteBody)
})

//Add a note
app.post('/api/notes', (req, res) => {
    const schema = {
        noteBody: Joi.string().min(2).required()
    }
    const result = Joi.validate(req.body, schema)

    if(result.error) {
        res.status(404).send(result.error.details[0].message)
        return
    }
    const note = {
        id: noteList.length + 1,
        noteBody: req.body.noteBody
    }
    noteList.push(note)
    res.send(note)
})

app.delete('/api/notes/:id', (req, res) => {

})

app.listen(port, () => {
    console.log(`server is up and running on ${port}`)
})
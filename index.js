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
    if(!note) return res.status(404).send("Note not found") 
    res.send(note.noteBody)
})

//Add a note
app.post('/api/notes', (req, res) => {
    const { error } = validateNote(req.body)
    if(error) return res.status(404).send(error.details[0].message)
    const note = {
        id: noteList.length + 1,
        noteBody: req.body.noteBody
    }
    noteList.push(note)
    res.send(note)
})

//Edit a note
app.put('/api/notes/:id', (req, res) => {
    //check if note exist
    const note = noteList.find( n => n.id === parseInt(req.params.id))
    if(!note) return res.status(404).send("Note not found") 

    const { error } = validateNote(req.body)
    if(error) return res.status(404).send(error.details[0].message)
    note.noteBody = req.body.noteBody
    res.send(note)
})

//Delete note
app.delete('/api/notes/:id', (req, res) => {
    const note = noteList.find( n => n.id === parseInt(req.params.id))
    if(!note) return res.status(404).send("Note not found")

    const index = noteList.indexOf(note)
    noteList.splice(index, 1)
    res.send(note)
})

//Check if note has more than 2 character
function validateNote(note) {
    const schema = {
        noteBody: Joi.string().min(2).required()
    }
    return result = Joi.validate(note, schema)
}

app.listen(port, () => {
    console.log(`server is up and running on ${port}`)
})
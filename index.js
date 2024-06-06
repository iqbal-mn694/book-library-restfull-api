require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json())

// make connection to database 
const supabase = require('./models/dbConnection')

// get all books
app.get('/', async(req, res) => {
    const getBooks = await supabase
        .from('books')
        .select()
        
    res.send(getBooks)
})

// post book
app.post('/post', async(req, res) => {
    const userData = {
        title: req.body.title,
        author: req.body.author,
        released_date: req.body.released_date
    }

    const insertBook = await supabase
        .from('books')
        .insert(userData)
        .select()

    res.send(insertBook)
})

// update book
app.put('/post', async(req,res) => {
    const userData = {
        title: req.body.title,
        author: req.body.author,
        released_date: req.body.released_date
    }

    const updateBook = await supabase
        .from('books')
        .update(userData)
        .eq('id', req.body.id)
        .select()

    res.send(updateBook)
})

// delete book
app.delete('/post', async(req, res) => {
    const deleteBook = await supabase
        .from('books')
        .delete()
        .eq('id', req.body.id)

    deleteBook ? res.redirect('/') : req.send("Gagal menghapus data")
})
app.listen(3000, () => {
    console.log('Running on port 3000')
})
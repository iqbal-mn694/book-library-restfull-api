
require('dotenv').config()

const express = require('express')
const app = express()

const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

app.use(express.json())

app.get('/', async(req, res) => {
    const getBooks = await supabase.from('books').select()
    res.send(getBooks)
})

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
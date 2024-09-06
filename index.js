const path = require('path')
const { v4: uuidv4 } = require('uuid');
const express = require('express')
const methodOverride = require('method-override')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

let comments = [
    {
        id: uuidv4(),
        username: 'bambang',
        text: 'ini adalah bambang'
    },
    {
        
        id: uuidv4(),
        username: 'bimbing',
        text: 'ini adalah bimbing'
    },
    {
        id: uuidv4(),
        username: 'bombong',
        text: 'ini adalah bombong'
    },
    {
        id: uuidv4(),
        username: 'bembeng',
        text: 'ini adalah bembeng'
    },
    {
        id: uuidv4(),
        username: 'bumbung',
        text: 'ini adalah bumbung'
    },
    {
        id: uuidv4(),
        username: 'mamat',
        text: 'ini adalah mamat'
    },
    {
        id: uuidv4(),
        username: 'memet',
        text: 'ini adalah memet'
    },
    {
        id: uuidv4(),
        username: 'mimit',
        text: 'ini adalah mmimit'
    },
    {
        id: uuidv4(),
        username: 'mumut',
        text: 'ini adalah mumut'
    },
    {
        id: uuidv4(),
        username: 'momot',
        text: 'ini adalah momot'
    },
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

app.get('/comments/create', (req, res) => {
    res.render('comments/create')
})

app.post('/comments', (req, res) => {
    const {username, text} = req.body
    comments.push({username, text, id: uuidv4()})
    res.redirect('/comments')
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', { comment })
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit', { comment })
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params
    const newComment = req.body.text
    const foundComment = comments.find(c => c.id === id)
    foundComment.text = newComment
    res.redirect('/comments')
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params
    comments = comments.filter(c => c.id !== id)
    res.redirect('/comments')
})

app.get('/order', (req, res) => {
    res.send('GET order response oke')
})

app.post('/order', (req, res) => {
    const {item, qty} = req.body
    res.send(`Item : ${item} - Qty : ${qty}`)
})

app.listen(8080, () => {
    console.log(`Server is running on: http://localhost:8080`)
})
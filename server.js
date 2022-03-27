const express = require('express')
const app = express()
const article_router = require('./routes/articles')
const mongoose = require('mongoose')
const Article = require('./models/article')
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost/blog')

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false}))

app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
    created_at: 'desc'    
    })
    res.render('articles/index', {articles: articles})
})

app.use('/articles', article_router)

app.listen(5000) 
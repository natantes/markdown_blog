const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const { stringify } = require('nodemon/lib/utils')
const create_dom_purify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = create_dom_purify(new JSDOM().window)

const article_schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description : {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitized_html: {
        type: String,
        required: true
    }
})

article_schema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true})
    }
    if (this.markdown) {
        this.sanitized_html = dompurify.sanitize(marked.parse(this.markdown))
    }

    next()
})

module.exports = mongoose.model('Article', article_schema)
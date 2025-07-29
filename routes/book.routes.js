const router = require('express').Router()
const bookController = require('../controllers/book.controllers')
const upload = require('../middlewares/upload.middlewares')
const validate = require('../middlewares/book.middlewares')

router.get('/create', bookController.showCreate)

router.post('/create', (req, res, next) => {
    upload.single('cover_image')(req, res, (err) => {
        if (err) {
            return res.status(400).render('Book/create', { error: err.message })
        }
        next()
    })
}, validate, bookController.create)

router.get('/index', bookController.getAll)

router.get('/detail/:id', bookController.showDetail)

router.get('/edit/:id', bookController.showEdit)

router.post('/update/:id', (req, res, next) => {
    upload.single('cover_image')(req, res, (err) => {
        if (err) {
            return res.status(400).render('Book/update', { error: err.message, book: req.body })
        }
        next()
    })
}, bookController.update)

router.post('/delete/:id', bookController.remove)

router.post('/search', bookController.search)

module.exports = router

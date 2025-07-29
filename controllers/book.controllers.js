const bookModel = require('../models/book.model.js')

const showCreate = (req, res) => {
    try {
        return res.status(200).render('Book/create', { message: req.query.message || null })
    } catch (error) {
        return res.status(500).render('error', { error: error.message })
    }
}

const create = async (req, res) => {
    try {
        const newBook = new bookModel({...req.body, cover_image: req.file ? req.file.filename : 'default_cover.jpg' })
        await newBook.save()
        return res.status(201).redirect('/books/create/?message=Create book successfully')
    } catch (error) {
        return res.status(500).render('error', { error: error.message})
    }
}

const getAll = async (req, res) => {
    try {
        const books = await bookModel.find()
        if (books.length === 0) {
            return res.status(404).render('Book/index', { message: 'List books is empty', books: [] })
        }
        return res.status(200).render('Book/index', { books, message: req.query.message || null })
    } catch (error) {
        return res.status(500).render('error', { error: error.message })
    }
}

const showDetail = async (req, res) => {
    try {
        const book = await bookModel.findById(req.params.id)
        if (!book) {
            return res.status(404).render('error', { error: 'Book not found' })
        }
        return res.status(200).render('Book/detail', { book })
    } catch (error) {
        return res.status(500).render('error', { error: error.message })
    }
}

const showEdit = async (req, res) => {
    try {
        const book = await bookModel.findById(req.params.id)
        if (!book) {
            return res.status(404).render('error', { error: 'Book not found. Cannot update' })
        }
        return res.status(200).render('Book/update', { book, message: req.query.message || null })
    } catch (error) {
        return res.status(500).render('error', {error: error.message})
    }
}

const update = async (req, res) => {
    try {
        const book = await bookModel.findById(req.params.id)
        if (!book) {
            return res.status(404).render('error', { error: 'Book not found. Cannot update' })
        }
        const updatedData = { ...req.body, cover_image: req.file ? req.file.filename : book.cover_image }
        await bookModel.findByIdAndUpdate(req.params.id, updatedData)
        return res.status(200).redirect(`/books/updateForm/${req.params.id}/?message=Update book successfully`)
    } catch (error) {
        return res.status(500).render('error', { error: error.message })
    }
}

const remove = async (req, res) => {
    try {
        const result = await bookModel.deleteOne({ _id: req.params.id })
        if (!result.deletedCount === 0) {
            return res.status(404).redirect('/books/index/?message=Book not found. Cannot delete')
        }
        return res.status(200).redirect('/books/index/?message=Delete book successfully')
    } catch (error) {
        return res.status(500).render('error', { error: error.message })
    }
}

const search = async (req, res) => {
    try {
        const query = {}
        if (req.body.title) {
            query.title = { $regex: req.body.title, $options: 'i' }
        }
        if (req.body.author) {
            query.author = { $regex: req.body.author, $options: 'i' }
        }
        const books = await bookModel.find(query)
        if (books.length === 0) {
            return res.status(404).render('Book/index', { error: 'No books found matching your search criteria', books })
        }
        return res.status(200).render('Book/index', { books })
    } catch (error) {
        return res.status(500).render('error', { error: error.message })
    }
}

module.exports = {
    showCreate,
    create,
    getAll,
    showDetail,
    showEdit,
    update,
    remove,
    search
}
// Schemas
const createBookSchema = require("../schemas/createBookSchema");

module.exports = {

    createBook: async (req, res) => {
        const { id } = req.params;
    
        const book = req.body;
    
        const newBook = new createBookSchema({
            author: book.author,
            title: book.title,
            pages: book.pages,
            year: book.year,
            cover: book.cover,
            isFinished: book.isFinished,
            userId: book.userId,
        })
    
        await newBook.save()
    
        const allCreatedBooks = await createBookSchema.find(
            { userId: id, isFinished: false })
    
        res.send({ok: 'Book created successfully', allBooks: allCreatedBooks})
    },
    

    getBooksInProgress: async (req, res) => {
        const { id } = req.params;
    
        const notFinishedBooks = await createBookSchema.find(
            { userId: id, isFinished: false })
    
        res.send({ok: 'ok', booksInProgress: notFinishedBooks})
    
    }
}

// Schemas
const createBookSchema = require("../schemas/createBookSchema");

module.exports = {
    
    deleteBookInProgress: async (req, res) => {
        const { bookId, userId } = req.body;
    
        const deleteBookById = await createBookSchema.deleteOne({
            _id: bookId,
        })
    
        const notFinishedBooks = await createBookSchema.find(
            { userId: userId, isFinished: false })
    
    
        res.send({ok: "Book was deleted successfully", booksInProgress: notFinishedBooks})
    },

    deleteFinishedBook: async (req, res) => {
        const { bookId, userId } = req.body;
    
        const deleteBookById = await createBookSchema.deleteOne({
            _id: bookId,
        })
    
        const finishedBooks = await createBookSchema.find({
            userId: userId, isFinished: true
        })
    
        res.send({ok: "ok", finishedBooks: finishedBooks})
    }
}
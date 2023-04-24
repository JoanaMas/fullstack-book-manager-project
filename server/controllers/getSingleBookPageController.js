// Schemas
const createBookSchema = require("../schemas/createBookSchema");
const userSchema = require("../schemas/userSchema");

module.exports = {
    
    getSingleBook: async (req, res) => {
        const { bookId } = req.params;
        
        const singleBook = await createBookSchema.findOne({
            _id: bookId
        })
    
        const currentUser = await userSchema.findOne({
            _id: singleBook.userId
        })
    
        res.send({ok: 'ok', book: singleBook, currentUser: currentUser})
    }
}
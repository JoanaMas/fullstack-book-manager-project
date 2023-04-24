// Schemas
const createBookSchema = require("../schemas/createBookSchema");

module.exports = {

    updateToBookIsFinished: async (req, res) => {
        const { id } = req.params;
    
        const { finished, bookId } = req.body;
    
        const bookIsFinishedUpdate = await createBookSchema.updateOne(
            { _id: bookId },
            { $set: { isFinished: finished }}
        )
    
        const notFinishedBooks = await createBookSchema.find(
            { userId: id, isFinished: false })
    
        
        res.send({ok: "ok", booksInProgress: notFinishedBooks})
    }
}
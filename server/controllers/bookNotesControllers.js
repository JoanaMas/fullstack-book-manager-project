// Schemas
const createBookNoteSchema = require("../schemas/createBookNoteSchema");

module.exports = {

    addBookNote: async (req, res) => {

        const newBookNote = req.body;
    
        const noteBookSchema = createBookNoteSchema({
            bookId: newBookNote.bookId,
            bookNote: newBookNote.bookNote,
            userId: newBookNote.userId,
        })
    
        await noteBookSchema.save();
    
        const allBookNotes = await createBookNoteSchema.find({ bookId: newBookNote.bookId });
    
        res.send({ ok: 'ok', allBookNotes: allBookNotes })
    },

    getAllBookNotes: async (req, res) => {
        const { bookId } = req.params;
        
        const allBookNotes = await createBookNoteSchema.find({bookId: bookId});
    
        res.send({ok: 'ok', allBookNotes: allBookNotes})
    },

    deleteBookNote: async (req, res) => {
        const { bookNoteId, bookId } = req.body;
    
        const deleteBook = await createBookNoteSchema.deleteOne({
            _id: bookNoteId
        })
    
        const allBookNotes = await createBookNoteSchema.find({ bookId: bookId });
    
        res.send({ok: 'Book note was delete successfully', deletedBook: deleteBook, allBookNotes: allBookNotes})
    },

    updateBookNote: async (req, res) => {
        const { bookNote, noteId, bookId } = req.body;
        console.log(bookId)
        
        const updateBookNote = await createBookNoteSchema.updateOne(
            { _id: noteId },
            { $set: { bookNote: bookNote }},
        )
    
        const allBookNotes = await createBookNoteSchema.find({ bookId: bookId });
        console.log(allBookNotes)
    
        res.send({ok: 'ok', updatedBook: updateBookNote, allBookNotes: allBookNotes})
    }
}
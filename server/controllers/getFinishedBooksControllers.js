// Schemas
const createBookSchema = require("../schemas/createBookSchema");

module.exports = {

    finishedBooks: async (req, res) => {
        const { id } = req.params;
    
        const finishedBooks = await createBookSchema.find({
            userId: id, isFinished: true
        })
    
        res.send({ok: "ok", finishedBooks: finishedBooks})
    }
}
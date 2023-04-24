// Schemas
const userSchema = require("../schemas/userSchema");

module.exports = {

    getUserProfile: async (req, res) => {
        const { id } = req.params;
    
        const registeredUser = await userSchema.findOne({
            _id: id
        })
    
      
        res.send({registeredUser})
    },

    uploadProfileImage: async (req, res) => {
        const { imageUrl, userId } = req.body;
    
        const updateUserProfilePicture = await userSchema.updateOne
        ({ _id: userId },
        { $set: { profilePicture: imageUrl} })
    
        const findUserWithUpdatedPicture = await userSchema.findOne({
            _id: userId
        })
    
        res.send({ ok: "ok", updatedUser: findUserWithUpdatedPicture })
    }
}
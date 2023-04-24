// Schemas
const userSchema = require("../schemas/userSchema");

module.exports = {

    // REGISTER USER
    registerUser: async (req, res) => {
        const newUser = req.body;
        console.log(newUser);
    
        const registeredUser = new userSchema({
            firstName: newUser.name,
            email: newUser.email,
            password: newUser.password,
            profilePicture: newUser.profilePicture,
        })
    
        // CHECKING IF USER ALREADY EXIST IN DATABASE WITH THE SAME EMAIL
        const findUserByEmail = await userSchema.findOne({ email: newUser.email });
    
        if(findUserByEmail) {
            return res.status(409).send({ error: "User with same email already exists." });
        } else {
            await registeredUser.save()
            res.status(201).send({ ok: "User registration successful." })
        }
    
    },

    // LOGIN USER
    loginUser: async (req, res) => {
        const user = req.body;
        // console.log(user);
    
        const registeredUser = await userSchema.findOne({
            email: user.email,
            password: user.password,
        })
    
        if(registeredUser) {
            return res.status(202).send({ success: "User successfully logged in.", user: registeredUser })
        } else {
            res.status(409).send({ error: "User was not found." })
        }
    }
}

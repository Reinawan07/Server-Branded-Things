const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const {User} = require('../models')

class UsersControllers {

    static async AddUser(req, res, next) {
        try {
            const { username, email, password, role, phoneNumber, address } = req.body;

            const createdUser = await User.create({ username, email, password, role, phoneNumber, address });

            console.log(createdUser);

            res.status(201).json({
                "id": createdUser.id,
                "username": createdUser.username,
                "email": createdUser.email,   
                "phoneNumber": createdUser.phoneNumber, 
                "address": createdUser.address
            })
        } catch (error) {
            console.log (error)
            next(error);
        }
    }

    static async Login(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email) {
                res.status(400).json({ message: "Email is missing" })
                return;
            }

            if (!password) {
                res.status(400).json({ message: "Password is missing" })
                return;
            }

            const user = await User.findOne({ where: { email } })

            if (!user)  {
                throw ({ name: "Invalid email/password"})
            }

            const isPasswordValid = comparePassword(password, user.password)
            if (!isPasswordValid) {
                throw ({ name: "Invalid email/password"})
            }

            const access_token = signToken({ id: user.id })

            res.status(200).json({ access_token })
        } catch (error) {            
            next(error)
        }
    }
}

module.exports = UsersControllers
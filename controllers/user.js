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
}

module.exports = UsersControllers
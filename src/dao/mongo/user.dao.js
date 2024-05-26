const userModel = require("./models/user.model")
const { hashPassword } = require('../../utils/hashing')


class UserDAO {

    async login(email) {
        try {
            const user = await userModel.findOne(email)
            return user.toObject()
        }
        catch (err) {
            console.error(err)
            return null
        }
    }

    async getUsers() {
        try {
            const users = await userModel.find()
            return users.map(u => u.toObject())
        }
        catch (err) {
            console.error(err)
            return null
        }
    }

    async getUserById(id) {
        try {
            const user = await userModel.findById(id)
            return user?.toObject() ?? null
        }
        catch (err) {
            console.error(err)
            return null
        }
    }

    async saveUser(user) {
        try {
            const savedUser = await userModel.create(user)
            return savedUser.toObject()
        }
        catch (err) {
            console.error(err)
            return null
        }
    }

    async updateUserPassword(email, password) {
        try {
            const updatedUser = await userModel.updateOne(email, { $set: { password: hashPassword(password) } })
            //return updatedUser.toObject()
        }
        catch (err) {
            console.error(err)
            return null
        }
    }

}

module.exports = { UserDAO }
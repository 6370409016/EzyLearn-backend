const User = require('../model/userModel');

const deleteAUser = async (id) => {
    return await User.findOneAndDelete({ _id: id })
}

const updateAUser = async (body) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: body.id },
            { $set: { name: body.name, email: body.email } },
            { new: true }
        )

        return updatedUser;
    } catch (error) {
        console.log(error)
    }
}
module.exports = { deleteAUser, updateAUser };
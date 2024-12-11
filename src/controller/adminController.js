
const { getUsers, deleteUserById, getAUser, updateUser } = require('../service/adminServices');

const getUsersDetails = async (req, res) => {
    try {
        const users = await getUsers();
        if (users) {
            res.status(200).json({ users });
        } else {
            res.send(404).json({ message: "No users found in Database" })
        }
    } catch (error) {
        console.log(error);
    }



}

const deleteAUserById = async (req, res) => {

    try {
        const { id } = req.params;

        const result = await deleteUserById(id);
        if (result) {
            res.status(200).json({ message: "User is deleted successfully" });
        } else {
            res.status(404).json({ message: `User with ID ${id} not found.` });
        }

    } catch (err) {
        console.log(err)
    }



}

const getAUserDetails = async (req, res) => {

    const { email } = req.params;
    try {
        const user = await getAUser(email);
        res.json({ user });
    } catch (error) {
        console.log(error)
    }
}


const updateUserDetails = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const data = {
        id: id,
        name: body.name,
        email: body.email
    }
    try {
        const userDetails = await updateUser(data);
        if (userDetails) {
            res.json({ userDetails });
        }
    } catch (error) {
        console.log(error);
    }
}
module.exports = { getUsersDetails, deleteAUserById, getAUserDetails, updateUserDetails };

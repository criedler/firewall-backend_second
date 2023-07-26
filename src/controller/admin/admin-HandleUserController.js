const userService = require("../../services/userService");

async function getUsers(req, res) {
    res.json(await userService.getUsersFromDatabase());
}

async function deleteUser(req, res) {
    const username = req.params.username;
    const message = await userService.deleteUserFromDataBase(username);
    //check if message is an error
    if (message.status) {

    }

    res.json(message);
}


module.exports = {
    getUsers,
    deleteUser
}
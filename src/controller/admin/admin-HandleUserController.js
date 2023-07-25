const userService = require("../../services/userService");

async function getUsers(req, res) {
    res.send(await userService.getUsersFromDatabase());
}

async function deleteUser(req, res) {
    const username = req.params.username;
    const message = await userService.deleteUserFromDataBase(username);

    res.send(message);
}


module.exports = {
    getUsers,
    deleteUser
}
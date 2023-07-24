const pool = require("../../config/mysql");
const {userService} = require("../../services/userService");

async function getUsers(req, res) {
    res.send(userService.getUsers());
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
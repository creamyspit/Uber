const User = require('../models/user')
const create = (user) => {
    const postUser = User.create({ password: user.password, username: user.username });
    return postUser.then((postUser) => {
        console.log('postUser', postUser)
        return postUser
    })
       
}
const index = async (user) => {
    const users = await User.findAll();
    console.log(users.every(user => user instanceof User)); // true
    console.log("All users:", JSON.stringify(users, null, 2));
    return users    
       
}
module.exports = {
    create,
    index
}
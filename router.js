const {getUsers, createUser, deleteUser, getUserHobbies, updateUserHobbies}  = require('./handlers.js');
const {response} = require('./utils/response');

const routes = {
    '/api/users': {
        'POST': createUser,
        'GET': getUsers,
        'DELETE': deleteUser,
    },
    '/api/users/:userId': {
        'DELETE': deleteUser,
    },
    '/api/users/:userId/hobbies': {
        'GET': getUserHobbies,
        'PATCH':updateUserHobbies
    },
    notFound: (_req, res) => {
        response(res, {
          status: 404,
          data: { message: "requested resource not found!" },
        });
    },
}



module.exports = { routes };
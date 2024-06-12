const {parseRequestBody} = require('./utils/parseRequestBody');
const {response} = require('./utils/response');

let users = [];

function getUsers(_, res) {
    const usersWithLinks = users.map(user => ({
        user: user,
        links: {
          hobbies: `/api/users/${user.id}/hobbies`,
          self: `/api/users/${user.id}`
        }
      }));
    response(res, {data: {data:usersWithLinks, error: null}, status: 200, cacheControl:'public, max-age=3600' })
  }

function createUser(req, res) {
  parseRequestBody(req)
    .then(body => {
      const id = crypto.randomUUID();
      const newUser = { id,  ...body };
      users.push(newUser);
      response(res, {data: {
        data: {
          user:newUser,
          links: {
            hobbies: `/api/users/${id}/hobbies`,
            self: `/api/users/${id}`
          }
        },
        error: null
      }, status: 201 })
    })
}

function deleteUser(req, res) {
  const userId = req.url.split('/')[3];
  const index = users.findIndex(user => user.id === userId);
  if (index !== -1) {
    users.splice(index, 1);
    response(res, {data: {data:{'success': true}, error: null}, status: 200 })
  } else {
    response(res, {data: { data: null, error: `User with id ${userId} doesn't exist` }, status: 404 })
  }
}

function getUserHobbies(req, res) {
  const userId = req.url.split('/')[3];
  const user = users.find(user => user.id === userId);
  if (user) {
    response(
      res,
      {
        data: {data: {hobbies: user.hobbies || [], links: {user: `/api/users/${userId}`, self: `/api/users/${userId}/hobbies`,}}},
        status: 200,
        cacheControl:'private, max-age=3600'
      }
      )
  } else {
    response(res, {data: { data: null, error: `User with id ${userId} doesn't exist` }, status: 404 })
  }
}

function updateUserHobbies(req, res) {
  const userId = req.url.split('/')[3];
  const user = users.find(user => user.id === userId);
  if (user) {
    parseRequestBody(req)
      .then(body => {
        if (!user.hobbies) {
          user.hobbies = body.hobbies;
        } else {
          user.hobbies = Array.from(new Set([...user.hobbies, ...body.hobbies]));
        }
        response(res, {data: {
          data: {
            user,
            links: {
              hobbies: `/api/users/${user.id}/hobbies`,
              self: `/api/users/${user.id}`
            }
          }
        }, status: 200})
      })
  } else {
    response(res, {data: {data: null,  error: `User with id ${userId} doesn't exist` }, status: 404 })
  }
}

module.exports = { createUser, getUsers, deleteUser, getUserHobbies, updateUserHobbies };
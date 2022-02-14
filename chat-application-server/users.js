/**
 * users =
 * {
 *  id: socketId,
 *  username: username,
 *  room: room
 * }
 */
const users = [];

const addUser = (socketID, username, room) => {
  const existingUser = users.find(
    (user) => user.room == room && user.username == username
  );
  if (existingUser) {
    return { error: "Username is taken" };
  }

  const user = { id: socketID, username: username, room: room };
  users.push(user);

  return { user };
};

const removeUser = (socketID) => {
  const index = users.findIndex((user) => user.id == socketID);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (socketId) => {
  return users.find((user) => user.id == socketId);
};

const getUsersInRoom = (room) => {
  const usersInRoom = users.filter((user) => user.room === room);
  return usersInRoom;
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };

/**
 * users =
 * {
 *  id: socketId,
 *  username: username,
 *  room: room
 * }
 */
const users = [];
const allUsers = [];

// For managing all users

const loginUser = (socketID, username) => {
  const existingUser = allUsers.find((user) => user.username == username);
  if (existingUser) {
    return { error: "User already logged in", user: null };
  } else {
    const user = { id: socketID, username: username };
    allUsers.push(user);

    return { error: null, user: user };
  }
};

const logoutUser = (socketID) => {
  const index = allUsers.findIndex((user) => user.id == socketID);

  if (index !== -1) {
    return allUsers.splice(index, 1)[0];
  }
};

const getOneOnlineUser = (socketID) => {
  return allUsers.find((user) => user.id == socketID);
};

const getAllOnlineUsers = () => {
  return allUsers;
};

// For managing rooms

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

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  loginUser,
  logoutUser,
  getOneOnlineUser,
  getAllOnlineUsers,
};

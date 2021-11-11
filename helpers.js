

function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

//return the object value of the user
// const getUserByEmail = (email) => {
//   for (let key in users) {
//     if (email === users[key].email) {
//       return users[key];
//     }
//   }
//   return false;
// };



module.exports = {generateRandomString, getUserByEmail};
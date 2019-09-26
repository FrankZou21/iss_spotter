const { fetchMyIP, fetchCoordsByIP } = require('./iss');
const request = require("request");

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  fetchCoordsByIP(ip, (error, objLocation) => {
    if (error) {
      console.log("There was a error!", error)
      return;
    }
    let obj = {
      latitude: objLocation.lat,
      longitude: objLocation.lng
    }
    return obj;
  })
});

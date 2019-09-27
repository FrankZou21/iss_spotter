const request = require("request");

const fetchMyIP = function(callback) { 
  const webAPI = "https://api6.ipify.org?format=json"
  request(webAPI, (error, response, body) => {
    if (error) {
      callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(null, JSON.parse(body).ip);
  })
}

const fetchCoordsByIP = function (ip, callback) {
  let website = `https://geo.ipify.org/api/v1?apiKey=at_ohBKQ3ShEFx5fNqGXS2wdSnNpeTtJ&ipAddress=${ip}`;
  request(website, (error, response, body) => {
    if (error) {
      callback(error, null)
    }
    if(response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching location from IP address. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
     callback(error, JSON.parse(body).location);
  })
}

const fetchISSFlyOverTimes = function(coords, callback) {
   console.log(coords);
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null)
    }
    if(response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching location from IP address. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(error, JSON.parse(body).response);
});
}

const nextISSTimesForMyLocation = function(error, callback) {
  if (error) {
    return console.log("It didn't work!", error);
  }
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
      fetchISSFlyOverTimes(obj, (error, passtime) => {
        if (error) {
          console.log("There was a error!", error)
          return;
        }
        callback(passtime);
      })
    })
  });
}

module.exports = { 
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};
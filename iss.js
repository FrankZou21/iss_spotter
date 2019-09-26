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
    return;
  })
}

const fetchCoordsByIP = function (ip, callback) {
  let website = `https://geo.ipify.org/api/v1?apiKey=at_ohBKQ3ShEFx5fNqGXS2wdSnNpeTtJ&ipAddress=${ip}`;
  request(website, (error, response, body) => {
    if (error) {
      callback(error, null)
    }
    if(response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching location from IP adress. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
     let locat = callback(error, JSON.parse(body).location);
     console.log(locat);
     return locat;
  })
}

module.exports = { 
  fetchMyIP,
  fetchCoordsByIP
};

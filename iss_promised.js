const request = require('request-promise-native');

const fetchMyIp = function () {
  return request("https://api.ipify.org?format=json")
}

const fetchCoordsByIp = function(ipIn) {
  let parsedIp = JSON.parse(ipIn).ip
  return request(`https://geo.ipify.org/api/v1?apiKey=at_ohBKQ3ShEFx5fNqGXS2wdSnNpeTtJ&ipAddress=${parsedIp}`);
};

const fetchISSFlyOverTimes = function(inputCoords) {
  let coords = JSON.parse(inputCoords).location;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords.lat}&lon=${coords.lng}`)
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIp()
    .then(fetchCoordsByIp)
    .then(fetchISSFlyOverTimes)
    .then((body) => {
      const { response } = JSON.parse(body);
      return response;
    });
};

module.exports =  {nextISSTimesForMyLocation};
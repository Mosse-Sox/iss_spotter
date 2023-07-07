const request = require("request-promise-native");

const fetchMyIP = () => {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body);
  return request(`http://ipwho.is/${ip.ip}`);
};

const fetchISSFlyOverTimes = (coords) => {

  const coordsParsed = JSON.parse(coords);
  const location = {
    longitude: coordsParsed.longitude,
    latitude: coordsParsed.latitude
  };

  return request(`https://iss-flyover.herokuapp.com/json/?lat=${location.latitude}&lon=${location.longitude}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(data => {
    const response  = JSON.parse(data);
    return response.response;
  });
};
module.exports = { nextISSTimesForMyLocation };

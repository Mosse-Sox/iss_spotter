const request = require("request");
/*
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A cb (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = (cb) => {
  /* use request to fetch IP address from JSON API */

  request("https://api.ipify.org?format=json", (err, resp, bod) => {
    if (err) {
      cb(err, null);
      return;
    }

    if (resp.statusCode !== 200) {
      const errMsg = `Status Code ${resp.statusCode} when fetching IP. Response: ${bod}`;
      cb(Error(errMsg), null);
      return;
    }

    const ip = JSON.parse(bod).ip;
    cb(null, ip);
  });
};

/*
 * Makes a single API request to retrieve the user's location based on ip address.
 * Input:
 *   - An IP address
 *   - A cb (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The Long and Lat in an object like: { longitude: -113.4909267, latitude: 53.544389 }
 */
const fetchCoordsByIP = (ip, cb) => {
  request(`http://ipwho.is/${ip}`, (e, r, b) => {
    if (e) {
      cb(e, null);
      return;
    }

    if (r.statusCode !== 200) {
      const errMsg = `Status Code ${r.statusCode} when fetching IP. Response: ${b}`;
      cb(Error(errMsg), null);
      return;
    }

    const data = JSON.parse(b);
    const location = {
      longitude: data.longitude,
      latitude: data.latitude,
    };

    if (location.latitude === undefined || !data.success) {
      cb(Error(data.message), null);
      return;
    }

    cb(null, location);
  });
};

/*
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = (coords, cb) => {
  request(
    `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,
    (e, r, b) => {
      if (e) {
        cb(e, null);
        return;
      }

      if (r.statusCode !== 200) {
        cb(Error(e), null);
        return;
      }

      const data = JSON.parse(b);

      cb(null, data.response);
    }
  );
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };

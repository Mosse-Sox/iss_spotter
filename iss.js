/*
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A cb (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require("request");

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

module.exports = { fetchMyIP, fetchCoordsByIP };

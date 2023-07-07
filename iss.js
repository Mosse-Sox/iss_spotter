/*
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require("request");

const fetchMyIP = (callback) => {
  /* use request to fetch IP address from JSON API */

  request("https://api.ipify.org?format=json", (err, resp, bod) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (resp.statusCode !== 200) {
      const errMsg = `Status Code ${resp.statusCode} when fetching IP. Response: ${bod}`;
      callback(Error(errMsg), null);
      return;
    }

    const ip = JSON.parse(bod).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = () => {
  
};

module.exports = { fetchMyIP };

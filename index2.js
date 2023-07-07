const { nextISSTimesForMyLocation } = require("./iss_promised");

const flyoverTimes = (passTimes) => {

  for (const pass of passTimes) {
    // set the date and time with to 00:00:00
    const datetime = new Date(0);
    // set time to the rise time something like: 11:28:46 GTM+000, etc.
    datetime.setUTCSeconds(pass.risetime);
    // duration is set from the pass objects duration property
    const duration = pass.duration;

    console.log(`Next pass at ${datetime} for ${duration} seconds!`); 
  }
}

nextISSTimesForMyLocation()
  .then(passTimes => {
    flyoverTimes(passTimes);
  })
  .catch(error => {
    console.log("It didn't work: ", error.message);
  });



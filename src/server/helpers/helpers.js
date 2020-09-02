const Results = require("../models/results");
const fetch = require("node-fetch");

const log4js = require("log4js");
const log = log4js.getLogger("helpers");

let time, calls, limit;
calls = 0;
limit = 100;

const _ = {
  setUser: async function (req) {
    log.info("Entered setUser function in HELPERS");
    log.info(`Params: req`);
    log.info(req);
    try {
      log.debug("Creating a new user");
      const created = await Results.create({ amazon: [], ebay: [] });
      log.debug(`User is created: ${created}`);
      log.debug(`Setting a session.id to ${created._id}`);
      req.session.id = created._id;
      log.debug(`Setting a session.id.key to ${req.query.key}`);
      req.session.id.key = req.query.key; // id = search key
      log.debug(`Setting a session.id.amazonPage to 0`);
      req.session.id.amazonPage = 0;
      log.debug(`Setting a session.id.ebayPage to 0`);
      req.session.id.ebayPage = 0;
      log.debug(`session.id is set: ${req.session.id}.`);
      log.info("Returning ${created} to a caller");
      return created;
    } catch (e) {
      log.error(
        `Something went wrong in setUser function in HELPERS. Error: ${e}`
      );
      throw Error("Can not set new user");
    }
  },
  storeResults: async function (id, data) {
    log.info("Entered storeResults function in HELPERS");
    log.info(`Params: id, data`);
    log.info(id);
    log.info(data);
    try {
      const update = {};
      log.debug(`Created update object: ${update}`);
      log.debug(`Data from Amazon: ${data[0]}`);
      log.debug(`Data from Ebay: ${data[1]}`);
      if (data[0]) update["amazon"] = data[0].results;
      if (data[1]) update["ebay"] = data[1].results;
      log.debug(`Changed update object: ${update}`);
      log.debug(`Updating db with ${id}, ${update}`);
      const updatedDB = await Results.findByIdAndUpdate(id, update, {
        new: true,
      });
      log.debug(`Updated db: ${updatedDB}`);
      log.debug("Returning updatedDB obj to a caller");
      return updatedDB;
    } catch (e) {
      log.error(
        `Something went wrong in setUser function in HELPERS. Error: ${e}`
      );
      throw Error("Can not store results to DB");
    }
  },
  getResults: async function (req) {
    log.info("Entered getResults function in HELPERS");
    log.info(`Params: req`);
    log.info(req);
    try {
      log.debug(`Searching DB by id ${req.session.id}`);
      const found = await Results.findById(req.session.id);
      log.debug(`Found obj: ${found}`);
      if (found.amazon.length && found.ebay.length) {
        log.debug("Data from BOTH Amazon and Ebay is present");
        log.debug("sLicing 15 items from BOTH");
        const amazonArr = found.amazon.slice(0, 15);
        const ebayArr = found.ebay.slice(0, 15);
        log.debug(`Amazon Array Sliced: ${amazonArr}`);
        log.debug(`Ebay Array Sliced: ${ebayArr}`);
        if (amazonArr && ebayArr) {
          log.debug("BOTH Sliced Arrays are not empty");
          log.debug("sPLicing 15 items from BOTH");
          found.amazon.splice(0, 15);
          found.ebay.splice(0, 15);
          log.debug(`Amazon Spliced: ${found.amazon}`);
          log.debug(`Ebay Spliced: ${found.ebay}`);
          log.debug("Saving changes");
          await found.save();
          log.debug("Saved");
          log.info(`Worked? Checking... by id ${req.session.id}`);
          const check = await Results.findById(req.session.id);
          log.debug(`Updated obj: ${check}`);
          log.debug("Conveting to string and returning arrays to a caller");
          return JSON.stringify({
            amazon: amazonArr,
            ebay: ebayArr,
          });
        }
      }
      if (!found.amazon.length) {
        log.debug("Amazon is empty");
        req.session.id.amazonPage = (req.session.id.amazonPage || 0) + 1;
        log.debug(`Set req.session.amazonPage to ${req.session.id.amazonPage}`);
        req.session.id.fetchAmazon = true;
        log.debug(
          `Set req.session.fetchAmazon to ${req.session.id.fetchAmazon}`
        );
      } else {
        log.debug("Amazon is NOT empty");
        req.session.id.fetchAmazon = false;
        log.debug(
          `Set req.session.fetchAmazon to ${req.session.id.fetchAmazon}`
        );
      }
      if (!found.ebay.length) {
        log.debug("Ebay is empty");
        req.session.id.ebayPage = (req.session.id.ebayPage || 0) + 1;
        log.debug(`Set req.session.ebayPage to ${req.session.id.ebayPage}`);
        req.session.id.fetchEbay = true;
        log.debug(`Set req.session.fetchEbay to ${req.session.id.fetchEbay}`);
      } else {
        log.debug("Ebay is not empty");
        req.session.id.fetchEbay = false;
        log.debug(`Set req.session.fetchEbay to ${req.session.id.fetchEbay}`);
      }
      log.debug("Not all data is present. Returning NULL");
      return null;
    } catch (e) {
      log.error(
        `Something went wrong in setUser function in HELPERS. Error: ${e}`
      );
      throw Error("Can not get results to DB");
    }
  },
  getData: async (url) => {
    log.info("Entered getData function in HELPERS");
    log.info(`Params: url`);
    log.info(url);
    if (url) {
      log.debug("Url is not empty");
      try {
        let i, status, response, json;
        i = 0;
        status = 404;
        log.debug("Set vars for while loop");
        log.debug(`i: ${i}`);
        log.debug(`status: ${status}`);
        log.debug(`response: ${response}`);
        log.debug(`json: ${json}`);
        while (i < 10 && status !== 200) {
          log.debug("Entering while loop");
          log.debug(`i: ${i}`);
          log.debug("Fetching url");
          response = await fetch(url);
          log.debug(`Fetched from url: ${url}`);
          log.debug(`Response:`);
          log.debug(response);
          log.debug(`Status from response: ${response.status}`);
          status = response.status;
          log.debug(`Set status variable to ${status}`);
          i++;
          log.debug(`i++: ${i}`);
        }
        log.debug("Condition met");
        log.debug(`i: ${i}`);
        log.debug(`status: ${status}`);
        json = await response.json();
        log.debug(`json data from response`);
        log.debug(json);
        log.debug("Returning json to caller");
        return json;
      } catch (e) {
        log.error(
          `Something went wrong in setUser function in HELPERS. Error: ${e}`
        );
        throw Error("Can not get results from API");
      }
    } else {
      log.debug("Url is empty returning false");
      return false;
    }
  },
  checkLimit: function () {
    log.info("Checking the limit");
    if (calls < limit) {
      log.debug(`Num of calls ${calls} < Limit ${limit}`);
      calls++;
      log.debug(`Num of calls increased: ${calls}`);
      log.debug("Returning true to a caller");
      return true;
    }
    log.debug(`Num of calls ${calls} > Limit ${limit}`);
    const fullDay = 1000 * 3600 * 24;
    log.debug(`Set full day variable: ${fullDay}`);
    const timeNow = Date.now();
    log.debug(`Set timeNow variable: ${timeNow}`);
    log.debug(`Time: ${time}`);
    if (timeNow - time > fullDay) {
      log.debug(`Full day is passed: ${timeNow - time} > ${fullDay}`);
      log.debug(`Reseting calls and time`);
      calls = 0;
      log.debug(`Reset calls: ${calls}`);
      time = timeNow;
      log.debug(`Reset time: ${time}`);
      log.debug("Returning true to a caller");
      return true;
    }
    log.debug(`Full day is NOT passed: ${timeNow - time} > ${fullDay}`);
    log.debug("Returning false to a caller");
    return false;
  },
  setTime: function () {
    log.info("Setting up the time");
    time = Date.now();
    log.debug(`Time is set: ${time}`);
  },
};

module.exports = _;

const express = require("express");
const apiRouter = express.Router();

const _ = require("../helpers/helpers");
const log4js = require("log4js");
const log = log4js.getLogger("api");

require("dotenv").config();
const apiKey = process.env.API_KEY;
const scrKey = process.env.SRCP_API;

apiRouter.get("/", (req, res, next) => {
  log.trace("Reached API CHECK middleware");
  log.trace(`Api in url: ${req.query.api}`);
  log.trace(`Api in .env: ${apiKey}`);
  if (req.query.api === apiKey) {
    log.trace("Match. next()");
    next();
  } else {
    log.fatal("NO Match");
    log.fatal("Responding back with error");
    res.status(404).send("Invalid API KEY");
  }
});

apiRouter.get("/", (req, res, next) => {
  log.trace("Reached LIMIT CHECK middleware");
  if (_.checkLimit()) {
    log.trace("Limit is NOT exceeded. next()");
    next();
  } else {
    log.fatal("Limit is exceeded");
    log.fatal("Responding back with error");
    res.status(404).send("Limit is exceeded");
  }
});

apiRouter.get("/", async (req, res, next) => {
  log.trace("Reached SESSION CHECK middleware");
  log.trace(`Current session: ${req.session}`);
  if (req.session) log.trace(`Current id: ${req.session.id}`); // id = search key
  if (req.session.id) {
    log.trace(`Current key: ${req.session.id.key}`);
    log.trace(`Current amazonPage: ${req.session.id.amazonPage}`);
    log.trace(`Current ebayPage: ${req.session.id.ebayPage}`);
  }
  // log.trace("Resesting the session");
  // req.session.id = null;
  // log.trace(`Session: ${req.session}`);
  // log.trace(`Id: ${req.session.id}`);
  if (!req.session.id || req.session.id.key !== req.query.key) {
    log.trace("No id is present for session");
    try {
      log.trace("Setting User");
      const user = await _.setUser(req);
      log.trace(`User is set. User : ${user}`);
      log.trace(`Set params on req.session`);
      log.trace(`req.session.id: ${req.session.id}`);
      log.trace(`req.session.id.key: ${req.session.id.key}`);
      log.trace(`req.session.id.amazonPage: ${req.session.id.amazonPage}`);
      log.trace(`req.session.id.ebayPage: ${req.session.id.ebayPage}`);
    } catch (e) {
      log.error(`Failed to set User. Error : ${e}`);
      log.fatal("Responding back with error");
      res.status(404).send(e);
      return;
    }
  }
  log.trace(`Id is present for session: ${req.session.id}`);
  next();
});

apiRouter.get("/", async (req, res, next) => {
  log.trace("Enetered the first GET /api/results/ ROUTER");
  try {
    log.trace("Getting results from db");
    const results = await _.getResults(req);
    log.trace(`Results from db: ${results}`);
    if (results) {
      log.trace(
        "Results are not null. Data from BOTH amazon and ebay is present. Responding with results"
      );
      res.send(results);
      return;
    }
    log.warn(
      "Results are null. Some data is missing. Have to fetch results. Going to next router :/key"
    );
    next();
  } catch (e) {
    log.error(`Something went wrong in FIRST ROUTER /:key. Error: ${e}`);
    log.fatal("Responding back with error");
    res.status(404).send(e);
  }
});

apiRouter.get("/", async (req, res) => {
  log.trace("Enetered the second GET /api/results/ ROUTER");
  const key = req.session.id.key;
  log.trace(`Search key: ${key}`);
  const pageAmazon = req.session.id.amazonPage;
  log.trace(`Amazon page to fetch: ${pageAmazon}`);
  const pageEbay = req.session.id.ebayPage;
  log.trace(`Ebay page to fetch: ${pageEbay}`);
  log.trace(
    `Creating an amzonUrl. Looking on req.session.fetchAmazon: ${req.session.id.fetchAmazon}`
  );
  let amazonUrl = req.session.id.fetchAmazon
    ? `https://amzn-api.herokuapp.com/${scrKey}?key=${key}&page=${pageAmazon}`
    : "";
  log.trace(`Amazon URL is set: ${amazonUrl} `);
  log.trace(
    `Creating an ebayUrl. Looking on req.session.fetchAmazon: ${req.session.id.fetchEbay}`
  );
  let ebayUrl = req.session.id.fetchEbay
    ? `https://eby-api.herokuapp.com/${scrKey}?key=${key}&page=${pageEbay}`
    : "";
  log.trace(`Ebay URL is set: ${ebayUrl} `);
  try {
    log.trace("Fetching data from APIs");
    const data = await Promise.all([_.getData(amazonUrl), _.getData(ebayUrl)]);
    log.trace("Data is fethced");
    log.trace(`Fetched data from Amazon API:`);
    log.debug(data[0]);
    log.trace(`Fetched data from Ebay API:`);
    log.debug(data[1]);
    log.trace("Storing data to db");
    const dataInDb = await _.storeResults(req.session.id, data);
    log.trace(`Data is stored: ${dataInDb}`);
    log.trace("Retrieving a part of the results from db");
    const json = await _.getResults(req);
    log.debug(`Retrieved data: ${json}`);
    if (json) {
      log.trace("Data from Amazon and Ebay is present. Responding with it");
      res.send(json);
      return;
    }
    log.error("Some data is missing");
    log.fatal("Responding back with error");
    res.status(404).send("No data was  found");
  } catch (e) {
    log.error(`Something went wrong in second router :/key. Error : ${e}`);
    log.fatal("Responding back with error");
    res.status(404).send(e);
  }
});

module.exports = apiRouter;

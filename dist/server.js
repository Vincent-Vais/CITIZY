!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=5)}([function(e,t){e.exports=require("log4js")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("mongoose")},function(e,t,n){function r(e,t,n,r,a,o,s){try{var i=e[o](s),c=i.value}catch(e){return void n(e)}i.done?t(c):Promise.resolve(c).then(r,a)}function a(e){return function(){var t=this,n=arguments;return new Promise((function(a,o){var s=e.apply(t,n);function i(e){r(s,a,o,i,c,"next",e)}function c(e){r(s,a,o,i,c,"throw",e)}i(void 0)}))}}var o,s,i=n(10),c=n(11),u=n(0).getLogger("helpers");s=0;var d,g,f,l,b={setUser:(l=a(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return u.info("Entered setUser function in HELPERS"),u.info("Params: req"),u.info(t),e.prev=3,u.debug("Creating a new user"),e.next=7,i.create({amazon:[],ebay:[]});case 7:return n=e.sent,u.debug("User is created: ".concat(n)),u.debug("Setting a session.id to ".concat(n._id)),t.session.id=n._id,u.debug("Setting a session.id.key to ".concat(t.query.key)),t.session.id.key=t.query.key,u.debug("Setting a session.id.amazonPage to 0"),t.session.id.amazonPage=0,u.debug("Setting a session.id.ebayPage to 0"),t.session.id.ebayPage=0,u.debug("session.id is set: ".concat(t.session.id,".")),u.info("Returning ${created} to a caller"),e.abrupt("return",n);case 22:throw e.prev=22,e.t0=e.catch(3),u.error("Something went wrong in setUser function in HELPERS. Error: ".concat(e.t0)),Error("Can not set new user");case 26:case"end":return e.stop()}}),e,null,[[3,22]])}))),function(e){return l.apply(this,arguments)}),storeResults:(f=a(regeneratorRuntime.mark((function e(t,n){var r,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return u.info("Entered storeResults function in HELPERS"),u.info("Params: id, data"),u.info(t),u.info(n),e.prev=4,r={},u.debug("Created update object: ".concat(r)),u.debug("Data from Amazon: ".concat(n[0])),u.debug("Data from Ebay: ".concat(n[1])),n[0]&&(r.amazon=n[0].results),n[1]&&(r.ebay=n[1].results),u.debug("Changed update object: ".concat(r)),u.debug("Updating db with ".concat(t,", ").concat(r)),e.next=15,i.findByIdAndUpdate(t,r,{new:!0});case 15:return a=e.sent,u.debug("Updated db: ".concat(a)),u.debug("Returning updatedDB obj to a caller"),e.abrupt("return",a);case 21:throw e.prev=21,e.t0=e.catch(4),u.error("Something went wrong in setUser function in HELPERS. Error: ".concat(e.t0)),Error("Can not store results to DB");case 25:case"end":return e.stop()}}),e,null,[[4,21]])}))),function(e,t){return f.apply(this,arguments)}),getResults:(g=a(regeneratorRuntime.mark((function e(t){var n,r,a,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return u.info("Entered getResults function in HELPERS"),u.info("Params: req"),u.info(t),e.prev=3,u.debug("Searching DB by id ".concat(t.session.id)),e.next=7,i.findById(t.session.id);case 7:if(n=e.sent,u.debug("Found obj: ".concat(n)),!n.amazon.length||!n.ebay.length){e.next=34;break}if(u.debug("Data from BOTH Amazon and Ebay is present"),u.debug("sLicing 15 items from BOTH"),r=n.amazon.slice(0,15),a=n.ebay.slice(0,15),u.debug("Amazon Array Sliced: ".concat(r)),u.debug("Ebay Array Sliced: ".concat(a)),!r||!a){e.next=34;break}return u.debug("BOTH Sliced Arrays are not empty"),u.debug("sPLicing 15 items from BOTH"),n.amazon.splice(0,15),n.ebay.splice(0,15),u.debug("Amazon Spliced: ".concat(n.amazon)),u.debug("Ebay Spliced: ".concat(n.ebay)),u.debug("Saving changes"),e.next=26,n.save();case 26:return u.debug("Saved"),u.info("Worked? Checking... by id ".concat(t.session.id)),e.next=30,i.findById(t.session.id);case 30:return o=e.sent,u.debug("Updated obj: ".concat(o)),u.debug("Conveting to string and returning arrays to a caller"),e.abrupt("return",JSON.stringify({amazon:r,ebay:a}));case 34:return n.amazon.length?(u.debug("Amazon is NOT empty"),t.session.id.fetchAmazon=!1,u.debug("Set req.session.fetchAmazon to ".concat(t.session.id.fetchAmazon))):(u.debug("Amazon is empty"),t.session.id.amazonPage=(t.session.id.amazonPage||0)+1,u.debug("Set req.session.amazonPage to ".concat(t.session.id.amazonPage)),t.session.id.fetchAmazon=!0,u.debug("Set req.session.fetchAmazon to ".concat(t.session.id.fetchAmazon))),n.ebay.length?(u.debug("Ebay is not empty"),t.session.id.fetchEbay=!1,u.debug("Set req.session.fetchEbay to ".concat(t.session.id.fetchEbay))):(u.debug("Ebay is empty"),t.session.id.ebayPage=(t.session.id.ebayPage||0)+1,u.debug("Set req.session.ebayPage to ".concat(t.session.id.ebayPage)),t.session.id.fetchEbay=!0,u.debug("Set req.session.fetchEbay to ".concat(t.session.id.fetchEbay))),u.debug("Not all data is present. Returning NULL"),e.abrupt("return",null);case 40:throw e.prev=40,e.t0=e.catch(3),u.error("Something went wrong in setUser function in HELPERS. Error: ".concat(e.t0)),Error("Can not get results to DB");case 44:case"end":return e.stop()}}),e,null,[[3,40]])}))),function(e){return g.apply(this,arguments)}),getData:(d=a(regeneratorRuntime.mark((function e(t){var n,r,a,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(u.info("Entered getData function in HELPERS"),u.info("Params: url"),u.info(t),!t){e.next=48;break}u.debug("Url is not empty"),e.prev=5,n=0,r=404,u.debug("Set vars for while loop"),u.debug("i: ".concat(n)),u.debug("status: ".concat(r)),u.debug("response: ".concat(a)),u.debug("json: ".concat(o));case 13:if(!(n<10&&200!==r)){e.next=30;break}return u.debug("Entering while loop"),u.debug("i: ".concat(n)),u.debug("Fetching url"),e.next=19,c(t);case 19:a=e.sent,u.debug("Fetched from url: ".concat(t)),u.debug("Response:"),u.debug(a),u.debug("Status from response: ".concat(a.status)),r=a.status,u.debug("Set status variable to ".concat(r)),n++,u.debug("i++: ".concat(n)),e.next=13;break;case 30:return u.debug("Condition met"),u.debug("i: ".concat(n)),u.debug("status: ".concat(r)),e.next=35,a.json();case 35:return o=e.sent,u.debug("json data from response"),u.debug(o),u.debug("Returning json to caller"),e.abrupt("return",o);case 42:throw e.prev=42,e.t0=e.catch(5),u.error("Something went wrong in setUser function in HELPERS. Error: ".concat(e.t0)),Error("Can not get results from API");case 46:e.next=50;break;case 48:return u.debug("Url is empty returning false"),e.abrupt("return",!1);case 50:case"end":return e.stop()}}),e,null,[[5,42]])}))),function(e){return d.apply(this,arguments)}),checkLimit:function(){if(u.info("Checking the limit"),s<100)return u.debug("Num of calls ".concat(s," < Limit ").concat(100)),s++,u.debug("Num of calls increased: ".concat(s)),u.debug("Returning true to a caller"),!0;u.debug("Num of calls ".concat(s," > Limit ").concat(100));u.debug("Set full day variable: ".concat(864e5));var e=Date.now();return u.debug("Set timeNow variable: ".concat(e)),u.debug("Time: ".concat(o)),e-o>864e5?(u.debug("Full day is passed: ".concat(e-o," > ").concat(864e5)),u.debug("Reseting calls and time"),s=0,u.debug("Reset calls: ".concat(s)),o=e,u.debug("Reset time: ".concat(o)),u.debug("Returning true to a caller"),!0):(u.debug("Full day is NOT passed: ".concat(e-o," > ").concat(864e5)),u.debug("Returning false to a caller"),!1)},setTime:function(){u.info("Setting up the time"),o=Date.now(),u.debug("Time is set: ".concat(o))}};e.exports=b},function(e,t){e.exports=require("dotenv")},function(e,t,n){n(6);var r=n(7),a=n(1),o=n(8),s=n(2),i=n(9);n(4).config();var c=process.env.PORT||3e3,u=__dirname,d=r.join(u,"index.html"),g=n(3),f=n(0);f.configure({appenders:{index:{type:"file",filename:"logs.log"},helpers:{type:"file",filename:"logs.log"},api:{type:"file",filename:"logs.log"}},categories:{default:{appenders:["index"],level:"trace"},debug:{appenders:["helpers"],level:"trace"},trace:{appenders:["api"],level:"trace"}}}),f.getLogger().level="off";var l=f.getLogger("index"),b=a();s.connect(process.env.DATABASEURL||"mongodb://localhost:27017/scr_api",{useNewUrlParser:!0,useUnifiedTopology:!0}).then((function(){l.info("Connected to db")})).catch((function(e){l.fatal("Failed to connect to db"),l.error(e)})),s.set("useFindAndModify",!1),b.use(o({name:"session",keys:["key1","key2"]})),b.use(a.static(u)),b.use("/api/results",i),b.get("/",(function(e,t,n){l.info("Reached home page"),t.sendFile(d)})),b.listen(c,(function(){l.info("Server has started"),l.info("Setting up a timer"),g.setTime()}))},function(e,t){e.exports=require("regenerator-runtime")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("cookie-session")},function(e,t,n){function r(e,t,n,r,a,o,s){try{var i=e[o](s),c=i.value}catch(e){return void n(e)}i.done?t(c):Promise.resolve(c).then(r,a)}function a(e){return function(){var t=this,n=arguments;return new Promise((function(a,o){var s=e.apply(t,n);function i(e){r(s,a,o,i,c,"next",e)}function c(e){r(s,a,o,i,c,"throw",e)}i(void 0)}))}}var o=n(1).Router(),s=n(3),i=n(0).getLogger("api");n(4).config();var c=process.env.API_KEY,u=process.env.SRCP_API;o.get("/",(function(e,t,n){i.trace("Reached API CHECK middleware"),i.trace("Api in url: ".concat(e.query.api)),i.trace("Api in .env: ".concat(c)),e.query.api===c?(i.trace("Match. next()"),n()):(i.fatal("NO Match"),i.fatal("Responding back with error"),t.status(404).send("Invalid API KEY"))})),o.get("/",(function(e,t,n){i.trace("Reached LIMIT CHECK middleware"),s.checkLimit()?(i.trace("Limit is NOT exceeded. next()"),n()):(i.fatal("Limit is exceeded"),i.fatal("Responding back with error"),t.status(404).send("Limit is exceeded"))})),o.get("/",function(){var e=a(regeneratorRuntime.mark((function e(t,n,r){var a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(i.trace("Reached SESSION CHECK middleware"),i.trace("Current session: ".concat(t.session)),t.session&&i.trace("Current id: ".concat(t.session.id)),t.session.id&&(i.trace("Current key: ".concat(t.session.id.key)),i.trace("Current amazonPage: ".concat(t.session.id.amazonPage)),i.trace("Current ebayPage: ".concat(t.session.id.ebayPage))),t.session.id&&t.session.id.key===t.query.key){e.next=25;break}return i.trace("No id is present for session"),e.prev=6,i.trace("Setting User"),e.next=10,s.setUser(t);case 10:a=e.sent,i.trace("User is set. User : ".concat(a)),i.trace("Set params on req.session"),i.trace("req.session.id: ".concat(t.session.id)),i.trace("req.session.id.key: ".concat(t.session.id.key)),i.trace("req.session.id.amazonPage: ".concat(t.session.id.amazonPage)),i.trace("req.session.id.ebayPage: ".concat(t.session.id.ebayPage)),e.next=25;break;case 19:return e.prev=19,e.t0=e.catch(6),i.error("Failed to set User. Error : ".concat(e.t0)),i.fatal("Responding back with error"),n.status(404).send(e.t0),e.abrupt("return");case 25:i.trace("Id is present for session: ".concat(t.session.id)),r();case 27:case"end":return e.stop()}}),e,null,[[6,19]])})));return function(t,n,r){return e.apply(this,arguments)}}()),o.get("/",function(){var e=a(regeneratorRuntime.mark((function e(t,n,r){var a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i.trace("Enetered the first GET /api/results/ ROUTER"),e.prev=1,i.trace("Getting results from db"),e.next=5,s.getResults(t);case 5:if(a=e.sent,i.trace("Results from db: ".concat(a)),!a){e.next=11;break}return i.trace("Results are not null. Data from BOTH amazon and ebay is present. Responding with results"),n.send(a),e.abrupt("return");case 11:i.warn("Results are null. Some data is missing. Have to fetch results. Going to next router :/key"),r(),e.next=20;break;case 15:e.prev=15,e.t0=e.catch(1),i.error("Something went wrong in FIRST ROUTER /:key. Error: ".concat(e.t0)),i.fatal("Responding back with error"),n.status(404).send(e.t0);case 20:case"end":return e.stop()}}),e,null,[[1,15]])})));return function(t,n,r){return e.apply(this,arguments)}}()),o.get("/",function(){var e=a(regeneratorRuntime.mark((function e(t,n){var r,a,o,c,d,g,f,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i.trace("Enetered the second GET /api/results/ ROUTER"),r=t.session.id.key,i.trace("Search key: ".concat(r)),a=t.session.id.amazonPage,i.trace("Amazon page to fetch: ".concat(a)),o=t.session.id.ebayPage,i.trace("Ebay page to fetch: ".concat(o)),i.trace("Creating an amzonUrl. Looking on req.session.fetchAmazon: ".concat(t.session.id.fetchAmazon)),c=t.session.id.fetchAmazon?"https://amzn-api.herokuapp.com/".concat(u,"?key=").concat(r,"&page=").concat(a):"",i.trace("Amazon URL is set: ".concat(c," ")),i.trace("Creating an ebayUrl. Looking on req.session.fetchAmazon: ".concat(t.session.id.fetchEbay)),d=t.session.id.fetchEbay?"https://eby-api.herokuapp.com/".concat(u,"?key=").concat(r,"&page=").concat(o):"",i.trace("Ebay URL is set: ".concat(d," ")),e.prev=13,i.trace("Fetching data from APIs"),e.next=17,Promise.all([s.getData(c),s.getData(d)]);case 17:return g=e.sent,i.trace("Data is fethced"),i.trace("Fetched data from Amazon API:"),i.debug(g[0]),i.trace("Fetched data from Ebay API:"),i.debug(g[1]),i.trace("Storing data to db"),e.next=26,s.storeResults(t.session.id,g);case 26:return f=e.sent,i.trace("Data is stored: ".concat(f)),i.trace("Retrieving a part of the results from db"),e.next=31,s.getResults(t);case 31:if(l=e.sent,i.debug("Retrieved data: ".concat(l)),!l){e.next=37;break}return i.trace("Data from Amazon and Ebay is present. Responding with it"),n.send(l),e.abrupt("return");case 37:i.error("Some data is missing"),i.fatal("Responding back with error"),n.status(404).send("No data was  found"),e.next=47;break;case 42:e.prev=42,e.t0=e.catch(13),i.error("Something went wrong in second router :/key. Error : ".concat(e.t0)),i.fatal("Responding back with error"),n.status(404).send(e.t0);case 47:case"end":return e.stop()}}),e,null,[[13,42]])})));return function(t,n){return e.apply(this,arguments)}}()),e.exports=o},function(e,t,n){var r=n(2);resSchema=new r.Schema({amazon:[],ebay:[]}),e.exports=r.model("Results",resSchema)},function(e,t){e.exports=require("node-fetch")}]);
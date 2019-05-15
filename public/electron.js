/**
 * I dont like to place my main.js for electron here - so I´m just requiring it.
 * Maybe there´s a better way but I guess one had to eject react
 */
process.env.NODE_ENV === "development" ? require("../build/backend/main") : require("./backend/main");

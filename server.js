// const http = require('http');
// const app = require('./app');

// const normalizePort = val => {
// 	const port = parseInt(val, 10);

// 	if (isNaN(port)) {
// 		return val;
// 	}
// 	if (port >= 0) {
// 		return port;
// 	}
// 	return false;
// };
// const port = normalizePort(process.env.PORT ||'5678');
// app.set('port', port);

// const errorHandler = error => {
// 	if (error.syscall !== 'listen') {
// 		throw error;
// 	}
// 	const address = server.address();
// 	const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
// 	switch (error.code) {
// 		case 'EACCES':
// 			console.error(bind + ' requires elevated privileges.');
// 			process.exit(1);
// 			break;
// 		case 'EADDRINUSE':
// 			console.error(bind + ' is already in use.');
// 			process.exit(1);
// 			break;
// 		default:
// 			throw error;
// 	}
// };

// const server = http.createServer(app);

// server.on('error', errorHandler);
// server.on('listening', () => {
// 	const address = server.address();
// 	const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
// 	console.log('Listening on ' + bind);
// });

// server.listen(port);

// ********************************************************test vercel*****************************************************

const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const swaggerDocs = yaml.load("swagger.yaml");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use("/images", express.static(path.join(__dirname, "images")));

const db = require("./models");
const userRoutes = require("./routes/user.routes");
const categoriesRoutes = require("./routes/categories.routes");
const worksRoutes = require("./routes/works.routes");

db.sequelize.sync().then(() => console.log("db is ready"));

app.use("/api/users", userRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/works", worksRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || "5678");
app.set("port", port);

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port);

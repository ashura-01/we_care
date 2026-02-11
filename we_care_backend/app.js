const express = require("express");
const ratelimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose");
const router = require("./src/routes/api");
const dotENV = require("dotenv");

dotENV.config();

const app = new express();

app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());


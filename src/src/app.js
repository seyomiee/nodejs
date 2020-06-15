import express from "express";

import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "conneect-mongo";
import { localMiddleware } from "./middlewares";

import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";

import "./passport";

const app= express();

const CookieStore= MongoStore(session);

app.use(helmet());
app.set("view engine","pug");
app.use("/uploads",express.static("uploads"));
app.use("/static",express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(morgan("dev"));
app.use(
    session({
    secret: process.env.COOKIE_SECRET,
    resave:true,
    saveUninitialized: false,
    store: new CookieStore({mongooseConnection: mongoose.connection})
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localMiddleware);

/*
app.get("/",handleHome);
//route, found home

//app.get("/profile", handleProfile);
*/
app.use("/", globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;

/*
VIDEO : home/search
USER : join/login/logout
*/ 
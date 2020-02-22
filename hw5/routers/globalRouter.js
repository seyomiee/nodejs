import express from "express";
import routes from "../src/routes";
import {
  home,
  join,
  login,
  confirmAccount
} from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.join, join);
globalRouter.get(routes.login, login);
globalRouter.get(routes.confirmAccount, confirmAccount);

export default globalRouter;

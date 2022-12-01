import express from "express";
import AuthRouter from "./authRoutes.js";
import NotesRouter from "./notesRoutes.js";


const AppRouter = express.Router();

AppRouter.use("/notes", NotesRouter);
AppRouter.use("/auth", AuthRouter);

export default AppRouter;
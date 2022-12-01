import express from 'express'
import NotesController from '../controllers/noteController.js'

const NotesRouter = express.Router();

NotesRouter.route("/:userId")
    .get(NotesController.findAll)
    .post(NotesController.create)
    .delete(NotesController.deleteAll);

NotesRouter.route("/note/:noteId")
    .get(NotesController.findOne)
    .delete(NotesController.delete)
    .post(NotesController.update);


export default NotesRouter;
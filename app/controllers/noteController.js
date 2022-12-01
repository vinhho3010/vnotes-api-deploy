import NotesModel from "../models/note.js";
import { ObjectId } from "mongodb";

class NotesController {
  //create new note for specific user
  create = async (req, res, next) => {
    try {
      const { userId } = req.params;
      //const data = this.extractNotesData(req.body);
      const { title, content, color, isPin, isDeleted } = req.body;
      // console.log(data);
      const result = await NotesModel.create({
        ownerID: ObjectId(userId),
        title,
        content,
        color,
        isPin,
        isDeleted,
      });

      return res.status(201).json({
        status: true,
        message: `Create new note for user: ${userId} successful`,
        result,
      });
    } catch (error) {
      next(error);
    }
  };

  //find all note of one user
  findAll = async (req, res, next) => {
    try {
      const { userId } = req.params;

      const result = await NotesModel.find({ ownerID: userId });

      if (result.length == 0) {
        return res.json({
          message: "User do not have any notes",
        });
      } else {
        return res.status(201).json({
          status: true,
          message: `get all Notes of user with id ${userId}`,
          result,
        });
      }
    } catch (error) {
      next(error);
    }
  };

  //find a specific note
  findOne = async (req, res, next) => {
    try {
      const { noteId } = req.params;
      const result = await NotesModel.find({ _id: ObjectId(noteId) });

      if (result.length == 0) {
        return res.json({
          message: "Note have not created",
        });
      } else {
        return res.status(201).json({
          status: true,
          message: "get notes with specific id succesful",
          result,
        });
      }
    } catch (error) {
      next(error);
    }
  };

  //update note of specific user
  update = async (req, res, next) => {
    if (Object.keys(req.body).length == 0) {
      return res.status(400).json({
        message: "update data can not be empty",
      });
    }

    try {
      const { noteId } = req.params;
      const {title, content, color, isPin, isDeleted } = req.body;
      const filter = {_id: noteId};
      const update = { 
        title,
        content,
        color,
        isPin,
        isDeleted,}
      const result = await NotesModel.findOneAndUpdate(filter, update, 
        {
          new: true,
        });
      return res.status(201).json({
        status: true,
        message: "update note successfully",
        result,
      });
    } catch (error) {
      next(error);
    }
  };

  //delete specific note with id in params
  delete = async (req, res, next) => {
    try {
      const { noteId } = req.params;

      const result = await NotesModel.findOneAndDelete({
        _id: ObjectId(noteId),
      });

      return res.status(201).json({
        status: true,
        message: "delete note successfully",
        result,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteAll = (req, res) => {
    res.send({ message: "deleteAll Note Handler" });
  };
}

export default new NotesController();

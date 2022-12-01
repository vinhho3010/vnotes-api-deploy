import mongoose from "mongoose";
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    ownerID: {
        type: Schema.Types.ObjectId,
        ref: 'account'
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    color:{
        type: String,
        default: "#000000",
    },
    isPin: {
        type: Boolean,
        required: true
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    }
});

export default mongoose.model("Notes", NoteSchema)
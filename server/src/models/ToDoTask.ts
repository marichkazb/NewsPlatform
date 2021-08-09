import { Document, Model, model, Schema } from "mongoose";


export interface IToDoTask extends Document {
    title: string;
    description: string;
    time: number;
    isPublic:boolean;
    isDeleted: boolean
}

const todoTaskSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    isPublic: {
        type: Boolean,
        required: true
    },
    userId: {
        type:  Schema.Types.ObjectId,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

const ToDoTask: Model<IToDoTask> = model("ToDoTask", todoTaskSchema);

export default ToDoTask;

import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  task: string;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema: Schema = new Schema(
  {
    task: { type: String, required: true },
  },
  { timestamps: true }
);

//Every document in the tasks collection follows the ITask interface
export default mongoose.model<ITask>("Task", taskSchema);

/*

✔ export interface ITask

This creates a TypeScript interface named ITask.
The I at the beginning is a naming style meaning “Interface”.
It simply defines what data your Task has.

✔ extends Document

ITask includes everything from Mongoose’s Document type.
A Mongoose document has many built-in properties and methods (like _id, save(), etc.)
“ITask is a Mongoose document + our own fields.”

*/

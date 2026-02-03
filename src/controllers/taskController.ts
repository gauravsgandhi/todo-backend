import { Request, Response } from "express";
import Task from "../models/Task";

//Create
export async function createTask(
  req: Request,
  res: Response
): Promise<Response> {
  const { task } = req.body as { task?: string };
  if (!task) {
    return res.status(400).json({ Error: "Task is required" });
  }
  try {
    const newTask = await Task.create({ task });
    return res.status(201).json(newTask);
  } catch (error: any) {
    return res.status(500).json({ Error: error.message });
  }
}

//Read
export async function readTask(req: Request, res: Response): Promise<Response> {
  try {
    const getTask = await Task.find();
    return res.status(200).json(getTask);
  } catch (error: any) {
    return res.status(500).json({ Error: error.message });
  }
}

//Update
export async function updateTask(
  req: Request,
  res: Response
): Promise<Response> {
  const { task } = req.body as { task?: string };
  const { id } = req.params;
  if (!task) {
    return res.status(400).json({ Error: "Task is required" });
  }
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { task },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ Error: "Task not found" });
    }
    return res.status(200).json(updatedTask);
  } catch (error: any) {
    return res.status(500).json({ Error: error.message });
  }
}

//Delete
export async function deleteTask(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ Error: "Task not found" });
    }
    return res.status(200).json({ message: "Task deleted succefully" });
  } catch (error: any) {
    return res.status(500).json({ Error: error.message });
  }
}

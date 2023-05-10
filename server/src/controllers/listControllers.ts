import { Response } from "express";
import { IRequest, IUsername, TEntry, TUser } from "../config/inferfaces";
import { User } from "../models/userModel";

export async function createEntry(req: IRequest, res: Response) {
  try {
    const { username } = req.user as IUsername;
    const user = await User.findOne({ username: username });
    if (!user) return res.status(403).json({ message: "Unauthorized access!" });
    const { entry } = req.body;
    if (!entry)
      return res.status(401).json({ message: "Please enter an entry." });
    const newEntry: TEntry = {
      entry: entry,
    };
    user.list.push(newEntry);
    await user.save();
    res.json(user);
  } catch (error) {
    return res.json({message:"Error!"})
  }
}
export async function deleteEntry(req: IRequest, res: Response) {
  try {
    const { username } = req.user as IUsername;
    const user:any = await User.findOne({ username: username });
    if (!user) return res.status(403).json({ message: "Unauthorized access!" });
    const entry = user.list.id(req.params.id);
    const entryExists = user.list.includes(entry);
    if (entryExists) {
      await entry.deleteOne();
      const updatedUser = user.save();
      res.json(updatedUser);
    } else {
      return res.status(403).json({ message: "Entry not found!" });
    }
  } catch (error) {
    return res.json({message:"Error!"})
  }
}

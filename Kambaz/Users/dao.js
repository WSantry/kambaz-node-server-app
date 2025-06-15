import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

/* ────────── C R E A T E ─────────────────────────────── */
export const createUser = (user) => {
  const newUser = { ...user };
  delete newUser._id;            // avoid conflicts
  newUser._id = uuidv4();
  return model.create(newUser);
};

/* ────────── R E A D ─────────────────────────────────── */
export const findAllUsers            = ()      => model.find();
export const findUserById            = (id)    => model.findById(id);
export const findUserByUsername      = (u)     => model.findOne({ username: u });
export const findUserByCredentials   = (u,p)   => model.findOne({ username:u, password:p });
export const findUsersByRole         = (role)  => model.find({ role });
export const findUsersByPartialName  = (p)     => {
  const re = new RegExp(p, "i");
  return model.find({ $or: [{ firstName:{ $regex:re } }, { lastName:{ $regex:re } }] });
};

/* ────────── U P D A T E / D E L E T E ───────────────── */
export const updateUser = (id, user)   => model.updateOne({ _id:id  }, { $set:user });
export const deleteUser = (id)         => model.deleteOne({ _id:id  });

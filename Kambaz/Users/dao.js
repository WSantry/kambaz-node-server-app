// Users/dao.js

import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

/**
 * Escape special regex characters so the string can be used literally.
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* ────────── C R E A T E ─────────────────────────────────────────── */
export const createUser = (user) => {
  const newUser = { ...user };
  delete newUser._id;           // avoid conflicts if caller sent one
  newUser._id = uuidv4();       // generate fresh UUID
  return model.create(newUser);
};

/* ────────── R E A D ─────────────────────────────────────────────── */
export const findAllUsers          = ()        => model.find();
export const findUserById          = (id)      => model.findById(id);
export const findUserByUsername    = (u)       => model.findOne({ username: u });
export const findUserByCredentials = (u, p)    => model.findOne({ username: u, password: p });
export const findUsersByRole       = (role)    => model.find({ role });

export const findUsersByPartialName = (input = "") => {
  const search = input.trim();
  if (!search) {
    // empty ⇒ all users
    return model.find();
  }

  const tokens = search.split(/\s+/);
  const first  = tokens[0];
  const escapedFirst = escapeRegex(first);
  const regexFirst   = new RegExp(`^${escapedFirst}`, "i");

  if (tokens.length === 1) {
    // single‐word: match firstName OR lastName
    return model.find({
      $or: [
        { firstName: { $regex: regexFirst } },
        { lastName:  { $regex: regexFirst } }
      ]
    });
  } else {
    // multi‐word: match firstName AND lastName
    const rest = tokens.slice(1).join(" ");
    const escapedRest = escapeRegex(rest);
    const regexRest   = new RegExp(`^${escapedRest}`, "i");

    return model.find({
      firstName: { $regex: regexFirst },
      lastName:  { $regex: regexRest }
    });
  }
};

/* ────────── U P D A T E / D E L E T E ─────────────────────────── */
export const updateUser = (id, user) =>
  model.updateOne({ _id: id }, { $set: user });

export const deleteUser = (id) =>
  model.deleteOne({ _id: id });

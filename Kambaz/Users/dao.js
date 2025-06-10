import db from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
let { users } = db;

export const createUser            = (user) => ({ ...user, _id: uuidv4() }) && (users = [...users, { ...user, _id: uuidv4() }]).slice(-1)[0];
export const findAllUsers          = ()              => users;
export const findUserById          = (id)            => users.find((u) => u._id === id);
export const findUserByUsername    = (username)      => users.find((u) => u.username === username);
export const findUserByCredentials = (u, p)          => users.find((x) => x.username === u && x.password === p);
export const updateUser            = (id, upd)       => users = users.map((u) => (u._id === id ? { ...u, ...upd } : u));
export const deleteUser            = (id)            => users = users.filter((u) => u._id !== id);
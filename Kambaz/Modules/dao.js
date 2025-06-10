import db from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export const findModulesForCourse = (cid)                 => db.modules.filter(m=>m.course===cid);
export const createModule         = (module)              => { const m={...module,_id:uuidv4(),lessons:[]}; db.modules=[...db.modules,m]; return m; };
export const deleteModule         = (mid)                 => { db.modules = db.modules.filter(m=>m._id!==mid); return 204; };
export const updateModule         = (mid,updates)         => { const m=db.modules.find(m=>m._id===mid); Object.assign(m,updates); return 204; };
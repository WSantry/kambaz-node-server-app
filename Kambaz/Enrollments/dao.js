import model from "./model.js";

export const findCoursesForUser = async (uid)=>{
  const e = await model.find({ user:uid }).populate("course");
  return e.map(x=>x.course);
};

export const findUsersForCourse = async (cid)=>{
  const e = await model.find({ course:cid }).populate("user");
  return e.map(x=>x.user);
};

export const enrollUserInCourse   = (uid,cid)=>
  model.create({ _id:`${uid}-${cid}`, user:uid, course:cid });

export const unenrollUserFromCourse = (uid,cid)=>
  model.deleteOne({ user:uid, course:cid });

export const findEnrollmentsForUser = (uid)=>
  model.find({ user:uid });

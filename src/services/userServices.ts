import Users from "../models/usersModel";


const checkUser = async (email:String) => {
  const user = await Users.findOne({where: {email} });
  return user; 
}

const createUser = async (name:String, email:String, password:String) => {
  const user = await Users.create({email, password, name});
  return user;
    
}


export default {    
  checkUser,
  createUser
}


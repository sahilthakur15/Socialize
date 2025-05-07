import { Request, Response } from 'express';
import { registerValidation, loginValidation } from '../utils/validations/authvalidation';
import authServices from '../services/authServices';
import { APIResponse } from '../utils/apiResponse';
import MESSAGES from '../utils/messages';
import PasswordHandler from '../utils/handlers/passHandler';
import tokenHandler from '../utils/handlers/JWTHandler';




// register user
export const registerUser = async (
  req: Request,
  res: Response,
) => {
  try{
   const {error, value} = registerValidation(req.body);
   if (error) {
    return APIResponse.error(res, {
      status: 400,
      message: 'Validation failed',
      data: error.details.map((err) => err.message),
    });
  }

    const existingUser = await authServices.checkUser(value.email);
    if(existingUser){
      return APIResponse.error(res,{
        status: 400,
        message: MESSAGES.ERROR.USER_ALREADY_EXISTS,
      })
    }
    const hashedPassword = await PasswordHandler.hashPassword(value.password);

    const newUser = await authServices.createUser(value.name, value.email, hashedPassword);
    return APIResponse.success(res, {
      status: 201,
      message: MESSAGES.SUCCESS.REGISTER,
      data: newUser,
      
    })  
  
  }catch(error){
     return APIResponse.error(res, {
      status: 500,
      message: MESSAGES.ERROR.INTERNAL_SERVER_ERROR,
      data: error,
    })

  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { error, value } = loginValidation(req.body);
    if (error) {
      return APIResponse.error(res, {
        status: 400,
        message: 'Validation failed',
        data: error.details.map((err) => err.message),
      });
    }

    const user = await authServices.checkUser(value.email);
    if (!user) {
      return APIResponse.error(res, {
        status: 400,
        message: MESSAGES.ERROR.USER_NOT_FOUND,
      });
    }

    const isPasswordValid = await PasswordHandler.comparePassword(
      value.password,
      user.getDataValue('password')
    );
    
    if (!isPasswordValid) {
      return APIResponse.error(res, {
        status: 400,
        message: MESSAGES.ERROR.INVALID_CREDENTIALS,
      });
    }

    const token = await tokenHandler.generateToken(user.getDataValue('id'));
    
    return APIResponse.success(res, {
      status: 200,
      message: MESSAGES.SUCCESS.LOGIN,
      data: { token, user }
    });
    
  } catch (error) {
    return APIResponse.error(res, {
      status: 500,
      message: MESSAGES.ERROR.LOGIN_FAILED,
      data: error,
    });
  }
};



// export {
//   registerUser,
//   loginUser
// }
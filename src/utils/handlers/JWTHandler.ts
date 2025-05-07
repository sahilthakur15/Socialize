import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const SECRET_KEY: Secret = process.env.SECRET_KEY as Secret

class tokenHandler {
static generateToken (userId: string){
return jwt.sign({
    id:userId,   
},
    SECRET_KEY,
    {expiresIn: "1d"}
)}

static verifyToken(token: string): JwtPayload | string{
    return jwt.verify(token, SECRET_KEY);
}

}


export default tokenHandler;
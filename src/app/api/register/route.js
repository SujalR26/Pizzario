import { User } from "../../../app/models/User";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';


export async function POST(req){
    const body=await req.json();
    mongoose.connect(process.env.MONGO_URL);
    const pass=body.password;
    if(!pass?.length||pass.length<6){
        new Error('password must be atleast 6 characters');
        return false;
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPass=await bcrypt.hash(pass, salt);
    body.password = hashedPass;

    const user=await User.create(body);
    return Response.json(user);
}
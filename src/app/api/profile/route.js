import { UserInfo } from "@/app/models/UserInfo";
import { User } from "../../models/User";
import { authOptions } from "../auth/[...nextauth]/route";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";


export async function PUT(req){
    await mongoose.connect(process.env.MONGO_URL);
    const data=await req.json();
    const {name,...otherInfo}=data;
    const url=new URL(req.url);
    const _id=url.searchParams.get('_id');
    if(_id){
        const user= await User.findOne({_id});
        await User.updateOne({_id},{name});
        await UserInfo.findOneAndUpdate({email:user.email},otherInfo,{upsert:true});
    }
    // const user=await User.findOne({email});
    else{
        const session=await getServerSession(authOptions);
        const email=session.user?.email;
        await User.updateOne({email},{name});
        await UserInfo.findOneAndUpdate({email},otherInfo,{upsert:true});
    }
    
    return Response.json(true);

}

export async function GET(req){
    mongoose.connect(process.env.MONGO_URL);

    const url=new URL(req.url);
    const _id=url.searchParams.get('_id');

    if(_id){
        const user=await User.findOne({_id}).lean();
        const userInfo=await UserInfo.findOne({email:user.email}).lean();
        return Response.json({...user,...userInfo});
    }
    else{
        const session=await getServerSession(authOptions);
        const email=session?.user?.email;
        if(!email){
            return Response.json({})
        }
        const user=await User.findOne({email}).lean();
        const userInfo=await UserInfo.findOne({email}).lean();
        return Response.json({...user,...userInfo});
    }

    
}
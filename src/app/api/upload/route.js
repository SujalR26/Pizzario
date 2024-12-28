import { User } from "../../../app/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


export async function PUT(req){
    await mongoose.connect(process.env.MONGO_URL);
    const url=new URL(req.url);
    const _id=url.searchParams.get('_id');
    const data=await req.json();
    const {image}=data;
    if(_id){
        const resp=await User.updateOne({_id},{image});
    }
    else{
        const session=await getServerSession(authOptions);
        const email=session.user?.email;

        // const user=await User.findOne({email});

        const resp=await User.updateOne({email},{image});
    }
    
    return Response.json(true);

}
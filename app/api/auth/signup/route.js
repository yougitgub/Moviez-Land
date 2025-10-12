import { NextResponse } from "next/server";
import {dbConnect} from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
    const data = await req.json();
    const { name, email, password } = await data;
    try{
        await dbConnect();
        const user = new User({ name: name, email:email, password:password });
        const existingName = await User.find({name:user.name});
        if(existingName.length !== 0){
            return NextResponse.json({ error: 'Name already exists ' }, { status: 400 });
        }
        const existingEmail = await User.find({email:user.email});
        if(existingEmail.length !== 0){
            return NextResponse.json({ error: 'Email already exists ' }, { status: 400 });
        }
        await user.save();
        return NextResponse.json({ message: 'User created', id: user._id, email: user.email, name:user.name, favorites:user.favorites }, { status: 201 });
    }catch(err){
        console.error('auth signup error', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
    

}
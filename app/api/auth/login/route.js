import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import User from "@/models/User";


export async function POST(req){
  try{
    const data = await req.json();
    await dbConnect();
    const user = await User.find({ email: data.email });
    if(user.length === 0){
      return NextResponse.json({ error: 'Invalid User Name' }, { status: 400 });
    }
    if(user[0].password !== data.password){
      return NextResponse.json({ error: 'Incorrect password' }, { status: 400 });
    }
    console.log(user)
    return NextResponse.json({ name: user[0].name, email: user[0].email, favorites: user[0].favorites, id: user[0]._id }, { status: 200 });
  }catch(err){
    console.error('auth login error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
};
import { NextResponse } from "next/server";
import { GRADES } from "@/utils/schema";
import { db } from "@/utils/dbConfig";

export async function GET(req){
    const result = await db.select().from(GRADES); // select * from GRADES ---> similar command
    return NextResponse.json(result); 
}
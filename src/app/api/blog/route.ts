import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function main(){
    try{
        await prisma.$connect();
    }catch(error){
        throw new Error("DB接続に失敗しました。"); // ここをthrowに！
    }
}

// ブログの全記事取得API
export const GET = async (req: Request, res: NextResponse) => { 
    try {
        await main();
        const posts = await prisma.post.findMany();
        return NextResponse.json({ message: "Success", posts }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error: String(error) }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

// ブログ投稿用API
export const POST = async (req: Request, res: NextResponse) => { 
    try {
        const {title, description} = await req.json();

        await main();
        const post = await prisma.post.create({data: {title, description}});
        return NextResponse.json({ message: "Success", post }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error: String(error) }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};
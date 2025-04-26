import { NextResponse } from "next/server";
import { main } from "../route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ブログの詳細記事取得API
export const GET = async (req: Request, res: NextResponse) => { 
    try {
        const id: number = parseInt(req.url.split("/blog/")[1]);
        await main();
        const post = await prisma.post.findFirst({where: {id}});
        return NextResponse.json({ message: "Success", post }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error: String(error) }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};
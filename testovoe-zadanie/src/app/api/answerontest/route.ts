import { database } from "@/firebase/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const headersList = headers()
    const referer = headersList.get('referer')

    if(referer?.includes("http://localhost:3000")) {
        try {
            const body = await req.json()
            console.log(body)
            await updateDoc(doc(database, "tests", body.id), {
                results: arrayUnion(body.result)
            })
            return new NextResponse("Заебись все", {
                status: 200
            })
        } catch(e: any) {
            console.log(e.message)
            return new NextResponse(e.message, {
                status: 500
            })
        }
    } else {
        return new NextResponse("Access is denied", {
            status: 403
        })
    }
}
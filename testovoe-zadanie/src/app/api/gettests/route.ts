import { database } from "@/firebase/firebase"
import { collection, getDocs } from "firebase/firestore"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const headersList = headers()
    const referer = headersList.get('referer')
    console.log(referer)

    if(referer?.includes("http://localhost:3000")) {
        try {
            const data = await getDocs(collection(database, 'tests'))
            const tests: any = data.docs.map(test => ({...test.data(), id: test.id}))
            
            return NextResponse.json(tests)
        } catch(e: any) {
            console.log(e.message)
            return new NextResponse(e.message, {
                status: 500
            })
        }
    } else {
        return new NextResponse("Access is denied", {
            status: 403,
        })
    }
}
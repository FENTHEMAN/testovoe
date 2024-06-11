'use server'

import { revalidateTag } from "next/cache"

export const revalidateTests = () => {
    revalidateTag('tests')
}
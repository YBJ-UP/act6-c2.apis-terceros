import cataasResponse from "@/model/cataas"
import { errorType } from "@/model/error"

export async function getRandomImage(message?:string): Promise<cataasResponse | errorType> {
    const res = message? await fetch(`https://cataas.com/cat/says/${message}`) : await fetch("https://cataas.com/cat")
    if (!res.ok) {
        return { error:res.status, message:res.statusText }
    }
    return res.json()
}

export async function getGIF(): Promise<cataasResponse | errorType> {
    const res = await fetch("https://cataas.com/cat/gif")
    if (!res.ok) {
        return { error:res.status, message:res.statusText }
    }
    return res.json()
}
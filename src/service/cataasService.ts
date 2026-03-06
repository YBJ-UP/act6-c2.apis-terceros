import cataasResponse from "@/model/cataas"
import { errorType } from "@/model/error"

export async function getRandomImage(message?:string): Promise<cataasResponse | errorType> {
    try {
        const res = message? await fetch(`https://cataas.com/cat/says/${message}?json=true`) : await fetch("https://cataas.com/cat?json=true")
        if (!res.ok) {
            return { error:res.status, message:res.statusText }
            throw new Error("Error al conseguir los datos: " + res.status + "\n" + res.statusText) //yac q no funciona pero noc q hacerle
        }
        return res.json()
    } catch (error:any) {
        throw new Error(error)
    }
}

export async function getGIF(): Promise<cataasResponse | errorType> {
    const res = await fetch("https://cataas.com/cat/gif?json=true")
    if (!res.ok) {
        return { error:res.status, message:res.statusText }
    }
    return res.json()
}
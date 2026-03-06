import { errorType } from "@/model/error";
import meowFactsResponse from "@/model/meowfact";

export async function fetchMeowFacts (number?:number):Promise<meowFactsResponse | errorType> {
    try {
        const res = number? await fetch(`https://meowfacts.herokuapp.com/?lang=esp-mx&count=${number}`) : await fetch("https://meowfacts.herokuapp.com/?lang=esp-mx")
        if (!res.ok) {
            return { error:res.status, message:res.statusText }
        }
        return res.json()
    } catch (error:any) {
        throw new Error(error)
    }
}
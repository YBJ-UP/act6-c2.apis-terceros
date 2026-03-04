import meowFactsResponse from "@/model/meowfact";

export async function fetchMeowFacts (number?:number):Promise<meowFactsResponse> {
    const res = number? await fetch(`https://meowfacts.herokuapp.com/?lang=esp-mx&count=${number}`) : await fetch("https://meowfacts.herokuapp.com/?lang=esp-mx")
    if (!res.ok) {
        throw new Error("Error de api")
    }
    return res.json()
}
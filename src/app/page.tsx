"use client"

import meowFactsResponse from "@/model/meowfact";
import { fetchMeowFacts } from "@/service/meowfactsService";
import { useState } from "react";

export default function Home() {

  const [ meowFacts, setMeowFacts ] = useState<meowFactsResponse>({data:[]})
  const [ isLoading, setLoading ] = useState<boolean>(false)

  async function handleClick(){
    try {
      setLoading(true)
      const res = await fetchMeowFacts()
      console.log(res)
      setMeowFacts(res)
    } catch(error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button type="button" onClick={handleClick}>Obtener dato curioso</button>
      {meowFacts && meowFacts.data.forEach( fact => <p>{fact}</p> )}
    </>
  );
}

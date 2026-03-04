"use client"

import meowFactsResponse from "@/model/meowfact";
import { fetchMeowFacts } from "@/service/meowfactsService";
import { useState } from "react";

export default function Home() {

  const [ meowFacts, setMeowFacts ] = useState<meowFactsResponse>({data:[]})
  const [ meowFactsAmount, setMeowFactsAmount ] = useState<number>(1)
  const [ isLoading, setLoading ] = useState<boolean>(false)

  async function handleFetchClick(){
    try {
      setLoading(true)
      const res = await fetchMeowFacts(meowFactsAmount)
      setMeowFacts(res)
    } catch(error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  function handleAmountClick(numero:string){
    if (Number(numero) > 0) {
      setMeowFactsAmount(Number(numero))
    }
  }

  return (
    <>
      <div>
        <button type="button" onClick={handleFetchClick}>Obtener dato curioso</button>
        <label htmlFor="nombre">Cantidad de datos curiosos:</label>
        <input type="number" name="nombre" id="id" placeholder={meowFactsAmount.toString()} onChange={(e) => handleAmountClick(e.target.value.trim())} />
      </div>
      {isLoading && <p>Cargando...</p>}
      {meowFacts && meowFacts.data.map( (fact:string, key:number) => <p key={key}>{fact}</p> )}
    </>
  );
}

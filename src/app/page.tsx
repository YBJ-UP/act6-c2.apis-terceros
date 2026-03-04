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
    <div className="m-5">
      <div className="flex gap-5 items-center mb-5">
        <button type="button" onClick={handleFetchClick} className="px-5 py-2 rounded-2xl bg-purple-600">Obtener dato curioso</button>
        <div>
          <label htmlFor="nombre">Cantidad de datos curiosos:</label>
          <input type="number" name="nombre" id="id" value={meowFactsAmount.toString()} onChange={(e) => handleAmountClick(e.target.value.trim())} />
        </div>
      </div>
      {isLoading && <p>Cargando...</p>}
      {meowFacts && meowFacts.data.map( (fact:string, key:number) => <p key={key}>{fact}</p> )}
    </div>
  );
}

"use client"

import meowFactsResponse from "@/model/meowfact";
import { fetchMeowFacts } from "@/service/meowfactsService";
import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const [ meowFacts, setMeowFacts ] = useState<meowFactsResponse>({data:[]})
  const [ meowFactsAmount, setMeowFactsAmount ] = useState<number>(1)
  const [ isLoading, setLoading ] = useState<boolean>(false)

  async function handleFetchClick(){
    try {
      setMeowFacts({data:[]})
      setLoading(true)
      const res = await fetchMeowFacts(meowFactsAmount)
      if ( 'error' in res ){
        throw new Error("Error al obtener los datos: " + res.message )
      }
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
      <h1 className="text-2xl font-bold mb-5">Meow Facts - Datos curiosos sobre gatos</h1>
      <div className="flex gap-5 items-center mb-5">
        <button type="button" onClick={handleFetchClick} className="px-5 py-2 rounded-2xl bg-purple-600">Obtener dato curioso</button>
        <div className="flex gap-2 bg-cyan-600 px-5 py-2 rounded-2xl">
          <label htmlFor="nombre">Cantidad de datos curiosos:</label>
          <input type="number" name="nombre" id="id" className="w-10" value={meowFactsAmount.toString()} onChange={(e) => handleAmountClick(e.target.value.trim())} />
        </div>
      </div>
      {isLoading &&
        <div className="flex flex-col justify-center items-center my-10">
          <Image src={"/michibaile.gif"} alt="Cargando..." width={200} height={100}/>
          <p>Cargando...</p>
        </div>}
        <div className="flex flex-col gap-2 p-7 rounded-2xl bg-fuchsia-700">
          {meowFacts.data.length == 0 && <p>Aquí van los datos curiosos (solo hay 89 en la API).</p>}
          {meowFacts && meowFacts.data.map( (fact:string, key:number) => <p key={key}>{key+1}.- {fact}</p> )}
        </div>
    </>
  );
}

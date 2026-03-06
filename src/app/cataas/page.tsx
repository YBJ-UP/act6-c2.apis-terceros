"use client"

import Image from "next/image"
import cataasResponse from "@/model/cataas"
import { getGIF, getRandomImage } from "@/service/cataasService"
import { useState } from "react"
import { errorType } from "@/model/error"

export default function cataas() {
    const [imagen, setImagen] = useState<cataasResponse>({tags:[], url:""})
    const [message, setMessage] = useState<string>("")
    const [selection, setSelection] = useState<"image" | "gif">("image")
    const [isLoading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<errorType>()

    function switchSelection() {
        if (selection == "image") {
            setSelection("gif")
        } else {
            setSelection("image")
        }
    }

    async function handleImageClick(message?:string) {
        try{
            setImagen({tags:[], url:""})
            setLoading(true)
            const res = await getRandomImage(message)
            if ('error' in res) {
                setError(res)
                throw new Error("Error al conseguir imagen: " + res.message + "\nCódigo de error: " + res.error)
            }
            setImagen(res)
        } catch(error:any) {
            throw new Error(error)
        } finally {
            setLoading(false)
        }
    }

    async function handleGIFClick() {
        try{
            setImagen({tags:[], url:""})
            setLoading(true)
            const res = await getGIF()
            if ('error' in res) {
                throw new Error("Error al conseguir gif: " + res.message)
            }
            setImagen(res)
        } catch(error) {
            throw new Error("Error inesperado: " + error)
        } finally {
            setLoading(false)
        }
    }

    if (error) {
        return (
            <div>
                <h1>Error al conseguir la imagen: {error.error}</h1>
                <h2>Detalles del error: {error.message || 'No se otorgaron detalles sobre el error'}</h2>
            </div>
        )
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">Cats As A Service - Imágenes y gifs de gatos</h1>
            <h2 className="font-medium mb-5">Puede que las imágenes y especialmente los GIFs tarden en cargar</h2>
            <div className="flex gap-10">
                <div className="flex gap-5 py-2 px-5 bg-gray-500 rounded-2xl items-center">
                    {selection=="image" && (<span className="font-bold text-sky-400">Imagen</span>) || (<span onClick={switchSelection}>Imagen</span>)}
                    {selection=="gif" && (<span className="font-bold text-sky-400">GIF</span>) || (<span onClick={switchSelection}>GIF</span>)}
                </div>
                {selection=="image" && (
                    <div className="flex gap-2 bg-cyan-600 px-5 rounded-2xl items-center">
                        <label htmlFor="texto">El gato dice:</label>
                        <input type="text" name="texto" placeholder="Nada..." onChange={(e) => setMessage(e.target.value.trim())}/>
                    </div>
                )}
                {selection=="image" && (
                    <button type="button" onClick={() => handleImageClick(message)} className="px-5 py-2 rounded-2xl bg-purple-600">Obtener Imágen</button>
                ) || (
                    <button type="button" onClick={handleGIFClick} className="px-5 py-2 rounded-2xl bg-purple-600">Obtener GIF</button>
                )}
            </div>

            {isLoading &&
                <div className="flex flex-col justify-center items-center my-10">
                    <Image src={"/michibaile.gif"} alt="Cargando..." width={200} height={100}/>
                    <p>Cargando...</p>
                </div>
            }

            <div>
                {imagen.url!="" && (
                    <div className="flex flex-col gap-5 items-center justify-center">
                        <img src={imagen.url} alt="gato" className="rounded-2xl border-4 m-10 max-h-100" />
                        <p>Etiquetas de la imagen:</p>
                        <ul>
                            {imagen.tags.length>0 && imagen.tags.map((etiqueta:string, key: number) => (
                                <li key={key}>{key+1}.- {etiqueta}</li>
                            )) || (
                                <li>Esta imagen no tiene etiquetas</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}
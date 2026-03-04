"use client"

import cataasResponse from "@/model/cataas"
import { getGIF, getRandomImage } from "@/service/cataasService"
import { useState } from "react"

export default function cataas() {
    const [imagen, setImagen] = useState<cataasResponse>({tags:[], url:""})
    const [message, setMessage] = useState<string>("")
    const [selection, setSelection] = useState<"image" | "gif">("image")
    const [ isLoading, setLoading ] = useState<boolean>(false)

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
                throw new Error("Error al conseguir imagen: " + res.message)
            }
            setImagen(res)
        } catch(error) {
            throw new Error("Error inesperado: " + error)
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

    return (
        <div>
            <h1 className="text-2xl font-bold mb-5">Cats As A Service - Imágenes y gifs de gatos</h1>
            <div className="flex gap-10">
                <div className="flex gap-5 px-5 bg-gray-500 rounded-2xl items-center">
                    {selection=="image" && (<span className="bg-sky-700 py-2">Imagen</span>) || (<span onClick={switchSelection}>Imagen</span>)}
                    {selection=="gif" && (<span className="bg-sky-700 py-2">GIF</span>) || (<span onClick={switchSelection}>GIF</span>)}
                </div>
                {selection=="image" && (
                    <div className="flex gap-2 bg-cyan-600 px-5 rounded-2xl items-center">
                        <label htmlFor="texto">El gato dice:</label>
                        <input type="text" name="texto" placeholder="Nada..." onChange={(e) => setMessage(e.target.value.trim())}/>
                    </div>
                )}
            </div>
        </div>
    )
}
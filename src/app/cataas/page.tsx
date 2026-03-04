"use client"

import cataasResponse from "@/model/cataas"
import { getGIF, getRandomImage } from "@/service/cataasService"
import { useState } from "react"

export default function cataas() {
    const [imagen, setImagen] = useState<cataasResponse>({tags:[], url:""})
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
        <h1 className="text-2xl font-bold mb-5">Cats As A Service - Imágenes y gifs de gatos</h1>
    )
}
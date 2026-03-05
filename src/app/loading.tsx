import Image from "next/image";

export default function loading() {
    return (
        <div className="flex flex-col items-center gap-5">
            <Image src={"/michibaile.gif"} alt="Cargando..." width={1000} height={500}/>
            <h1 className="font-bold text-3xl">Cargando...</h1>
        </div>
    )
}
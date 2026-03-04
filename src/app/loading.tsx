import Image from "next/image";

export default function loading() {
    return (
        <div>
            <Image src={"/michibaile.gif"} alt="Cargando..." width={1000} height={500}/>
            <p>Cargando...</p>
        </div>
    )
}
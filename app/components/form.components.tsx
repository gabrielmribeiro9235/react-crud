"use client";
import { useRef } from "react";

export default function Form({ onDataAvailable }: { onDataAvailable: (data: {city: string, temperature: string}) => void }) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = async () => {
        if(inputRef.current) {
            const city = inputRef.current.value;
            const response = await fetch(`https://goweather.xyz/v2/weather/${city}`);
            const data = await response.json();
            onDataAvailable({
                city,
                temperature: data.temperature                
            })
            inputRef.current.placeholder = "Cidade";
        }
    };

    return(
        <div className="flex flex-col w-100 items-center gap-10 text-white bg-zinc-800 px-10 py-20 rounded-3xl">
            <h1 className="font-bold text-3xl">Cadastro de cidades</h1>
            <input type="text" ref={inputRef} name="Cidade" autoComplete="off" placeholder="Cidade" className="outline-none border-2 p-2 w-50 rounded-xl" />
            <button type="button" className="px-8 py-2 font-bold bg-blue-600 rounded-xl cursor-pointer hover:opacity-80 active:scale-97" onClick={() => {
                handleClick();
                if(inputRef.current) {
                    inputRef.current.value = "";
                    inputRef.current.placeholder = "Buscando...";
                }
            }}>Enviar</button>
        </div>
    );
}
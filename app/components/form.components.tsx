"use client";
import { useRef } from "react";

export default function Form({ onDataAvailable }: { onDataAvailable: (data: {city: string, temperature: string}) => void }) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = async () => {
        try {
            const city = inputRef.current!.value.toUpperCase();
            const response = await fetch(`https://goweather.xyz/v2/weather/${city}`);
            const data = await response.json();
            if(!response.ok) {
                throw new Error("Cidade não encontrada!");
            }
            onDataAvailable({
                city,
                temperature: data.temperature                
            })
        } catch {
            alert("Cidade não encontrada!");
        } finally {
            inputRef.current!.placeholder = "Cidade";
        }
    };

    return(
        <div className="flex flex-col w-100 items-center gap-10 text-white bg-zinc-800 px-10 py-20 rounded-3xl">
            <h1 className="font-bold text-3xl">Cadastro de cidades</h1>
            <input type="text" ref={inputRef} name="Cidade" autoComplete="off" spellCheck="false" placeholder="Cidade" className="outline-none border-2 p-2 w-50 rounded-xl" />
            <button type="button" className="px-8 py-2 font-bold bg-blue-600 rounded-xl cursor-pointer hover:opacity-80 active:scale-97" onClick={() => {
                if(inputRef.current && inputRef.current.value !== ""){
                    handleClick();
                    inputRef.current.value = "";
                    inputRef.current.placeholder = "Buscando...";
                }
            }}>Enviar</button>
        </div>
    );
}
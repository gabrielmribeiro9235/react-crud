"use client";
import { useRef, useEffect } from "react";

export default function Form({ onDataAvailable }: { onDataAvailable: (data: string) => void }) {
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if(inputRef.current) {
            onDataAvailable(inputRef.current.value);
        }
    }, []);
    const handleClick = () => {
        if(inputRef.current) {
            onDataAvailable(inputRef.current.value);
        }
    };

    return(
        <div className="flex flex-col w-100 items-center gap-10 text-white bg-zinc-800 px-10 py-20 rounded-3xl">
            <h1 className="font-bold text-3xl">Cadastro de cidades</h1>
            <input type="text" ref={inputRef} defaultValue="Nada" name="Cidade" placeholder="Cidade" className="outline-none border-2 p-2 w-50 rounded-xl" />
            <button type="button" className="px-8 py-2 font-bold bg-blue-600 rounded-xl cursor-pointer hover:opacity-80 active:scale-97" onClick={handleClick}>Enviar</button>
        </div>
    );
}
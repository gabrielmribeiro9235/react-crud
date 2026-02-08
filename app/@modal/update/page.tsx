"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from 'react';

export default function Update() {    
    const router = useRouter();
    const searchParams = useSearchParams();
    const oldCity = searchParams.get("city") || "";
    const [newCity, setNewCity] = useState("");
    const formData: { city: string, temperature: string }[] = JSON.parse(localStorage.getItem("formData") || "[]");
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if(dialogRef.current) dialogRef.current.showModal();
    }, []);

    const handleSubmit = async () => {
        if(newCity) {
            const upperCaseNewCity = newCity.trim().toUpperCase();
            const exists = formData.some(item => item.city === upperCaseNewCity);
            if(!exists) {
                try{
                    const response = await fetch(`https://goweather.xyz/v2/weather/${upperCaseNewCity}`);
                    if(!response.ok) throw new Error("Cidade não encontrada!");
                    const data = await response.json();
                    const newContent: { city: string, temperature: string } = {
                        city: newCity.toUpperCase(),
                        temperature: data.temperature
                    };
                    const newList = formData.map(item => item.city === oldCity ? newContent : item);
                    localStorage.setItem("formData", JSON.stringify(newList));
                    router.back();

                } catch {
                    router.push("/alert?msg=Cidade não encontrada!");
                }
            } else {
                router.push("/alert?msg=Cidade já cadastrada!");
            }  
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/50"></div>
            <dialog
                onCancel={() => router.back()}
                ref={dialogRef}
                className="rounded-lg p-6 w-[400px] z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden"
            >
                <form action="dialog" onSubmit={(e) => {
                    e.preventDefault();
                    dialogRef.current?.close();
                    handleSubmit();
                }}>
                    <h2 className="text-xl mb-2">Insira a nova cidade</h2>
                    <label htmlFor="newCity" style={{ position: "fixed", left: "-9999999999999px" }}>Insira a nova cidade</label>
                    <input
                        required
                        id="newCity"
                        type="text"
                        placeholder="Insira a nova cidade"
                        spellCheck="false"
                        autoComplete="off"
                        onChange={(e) => setNewCity(e.target.value)}
                        className="rounded-lg outline-none border-2 p-2 w-[100%]"
                    />
                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="mt-4 cursor-pointer bg-red-500 text-white px-4 py-2 rounded-lg hover:opacity-80 active:scale-98"
                            onClick={() => router.back()}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="mt-4 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-80 active:scale-98"
                        >
                            Enviar
                        </button>
                        
                    </div>
                </form>
            </dialog>
        </>
    );
}
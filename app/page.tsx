"use client";
import { useState } from "react";
import Form from "./components/form.components";

type formDataType = {
  city: string,
  temperature: string
}

export default function Home() {
  const [formData, setFormData] = useState<formDataType[]>([]);
  const handleDataFromForm = (data: {city: string, temperature: string}) => {
    const exists = formData.some(item => item.city === data.city)
    if(!exists){
      setFormData(prev => [ ...prev, data]);
    } else {
      alert("Cidade já cadastrada!")
    }
  };

  const deleteCity = (city: string) => {
    const ok = confirm(`Tem certeza que quer excluir ${city} do cadastro?`)
    if(ok) {
      setFormData(prev => prev.filter(item => (item.city !== city)));
    } 
  };

  const updateCity = async (city: string) => {
    let newCity = prompt("Digite a nova cidade:")?.trim();
    if(newCity) {
      newCity = newCity.toUpperCase();
      try{
        const response = await fetch(`https://goweather.xyz/v2/weather/${newCity}`);
        if(!response.ok) throw new Error("Cidade não encontrada!")
        const data = await response.json();
        const newContent: formDataType = {
          city: newCity,
          temperature: data.temperature
        }
        setFormData(prev => prev.map(item => item.city === city ? newContent : item))
      } catch {
        alert("Cidade não encontrada!");
      }
    }
  };
  
  return (
    <>
      <Form onDataAvailable={handleDataFromForm} />
      {console.log(formData)}
      {formData.length !== 0 ? formData.map(item => (
        <div key={item.city} className="flex justify-between items-center mt-6 w-100 text-white bg-zinc-800 px-10 py-5 rounded-3xl">
          <div>
            <h2 className="text-2xl font-bold m-5">{item.city}</h2>
            <p className="text-xl m-5">Temperatura: {item.temperature}</p>
          </div>
          <div className="flex flex-col gap-2">
            <div onClick={() => deleteCity(item.city)} className="flex items-center justify-center cursor-pointer h-12 w-10 rounded hover:bg-red-500 group active:scale-97">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="bi bi-trash fill-current text-red-500 group-hover:text-white" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
              </svg>
            </div>
            <div onClick={() => updateCity(item.city)} className="flex items-center justify-center cursor-pointer h-12 w-10 rounded hover:bg-green-500 group active:scale-97">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="bi bi-pen fill-current text-green-500 group-hover:text-white" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
              </svg>
            </div>
          </div>
        </div>
      )): null}
    </>
  );
}

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
  return (
    <>
      <Form onDataAvailable={handleDataFromForm} />
      {console.log(formData)}
      {formData.length !== 0 ? formData.map(item => (
        <div key={item.city} className="mt-6 w-100 text-white bg-zinc-800 px-10 py-5 rounded-3xl">
          <h2 className="text-2xl font-bold text-center m-5">{item.city}</h2>
          <p className="text-xl text-center m-5">Temperatura: {item.temperature}</p>
        </div>
      )): null}
    </>
  );
}

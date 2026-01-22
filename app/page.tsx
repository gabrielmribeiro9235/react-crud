"use client";
import { useState } from "react";
import Form from "./components/form.components";
import Content from "./components/content.components";

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
    setFormData(prev => prev.filter(item => (item.city !== city)));
  };

  const updateCity = async (city: string) => {
    let newCity = prompt("Digite a nova cidade:")?.trim();
    if(newCity) {
      newCity = newCity.toUpperCase();
      const exists = formData.some(item => item.city === newCity)
      if(!exists) {
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
      } else {
        alert("Cidade já cadastrada!")
      }  
    }
  };
  
  return (
    <>
      <Form onDataAvailable={handleDataFromForm} />
      {console.log(formData)}
      {formData.length !== 0 ? formData.map(item => (
        <Content key={item.city} item={item} deleteCity={deleteCity} updateCity={updateCity} />
      )): null}
    </>
  );
}

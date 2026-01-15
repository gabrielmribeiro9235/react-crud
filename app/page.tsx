"use client";
import { useState } from "react";
import Form from "./components/form.components";

export default function Home() {
  const [formData, setFormData] = useState<{city: string, temperature: string}|null>(null);
  const handleDataFromForm = (data: {city: string, temperature: string}) => {
    setFormData(data);
  };
  return (
    <>
      <Form onDataAvailable={handleDataFromForm} />
      {console.log(formData)}
      {formData ? (
        <div className="mt-6 w-100 text-white bg-zinc-800 px-10 py-5 rounded-3xl">
          <h2 className="text-2xl font-bold text-center m-5">{formData.city}</h2>
          <p className="text-xl text-center m-5">Temperatura: {formData.temperature}</p>
        </div>
      ): null}
    </>
  );
}

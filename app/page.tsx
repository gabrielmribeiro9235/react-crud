"use client";
import { SetStateAction, useState } from "react";
import Form from "./components/form.components";

export default function Home() {
  const [formData, setFormData] = useState<string|null>(null);
  const handleDataFromForm = (data: string) => {
    setFormData(data);
  };
  return (
    <>
      <Form onDataAvailable={handleDataFromForm} />
      {console.log(formData)};
    </>
  );
}

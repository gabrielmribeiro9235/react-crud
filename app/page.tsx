"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"
import HeaderForm from "./components/headerForm.components";
import Content from "./components/content.components";
import Footer from "./components/footer.components";

type formDataType = {
  city: string,
  temperature: string
};

export default function Home() {
  const [formData, setFormData] = useState<formDataType[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if(savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, [pathname]);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleDataFromForm = (data: {city: string, temperature: string}) => {
    const exists = formData.some(item => item.city === data.city);
    if(!exists){
      setFormData(prev => [ ...prev, data]);
    } else {
      router.push("/alert?msg=Cidade já cadastrada!");
    }
  };

  const deleteCity = (city: string) => {
    setFormData(prev => prev.filter(item => (item.city !== city)));
  };

  const updateCity = async (city: string) => {
    router.push(`/update?city=${city}`);
  };
  
  return (
    <>
      <HeaderForm onDataAvailable={handleDataFromForm}  />
      <main className="flex justify-center items-center mt-30 mb-20">
          <div className="flex flex-wrap justify-start w-[1320px]">
            {formData.length !== 0 ? formData.map(item => (
              <Content key={item.city} item={item} deleteCity={deleteCity} updateCity={updateCity} />
            )): (
              <h1 className="text-white text-center font-bold text-5xl pt-10 w-full">Cadastre a primeira cidade</h1>
            )}
          </div>
      </main>
      <Footer />
    </>
  );
}

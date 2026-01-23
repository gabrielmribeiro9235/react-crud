import UpdateDeleteButtons from "./updateDeleteButtons.components";

export default function Content({ item, deleteCity, updateCity }: { item: { city: string, temperature: string }, deleteCity: (city: string) => void, updateCity: (city: string) => void}) {
    return(
        <div className="flex justify-between items-center mt-6 w-100 text-white bg-zinc-800 px-10 py-5 rounded-3xl">
          <div>
            <h2 className="text-2xl font-bold m-5">{item.city}</h2>
            <p className="text-xl m-5">Temperatura: {item.temperature}</p>
          </div>
          <UpdateDeleteButtons city={item.city} deleteCity={deleteCity} updateCity={updateCity} />
        </div>
    )
}
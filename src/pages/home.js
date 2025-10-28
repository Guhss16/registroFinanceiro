import Navbar from "../components/navbar"
import Header from "../components/header"
import GastoItem from "../components/gastoItem"
import FormGasto from "../components/formGasto"
import { useEffect } from "react"

import { useState } from "react"


export default function Home(){

    const [showEditPopup, setShowEditPopup] = useState(false)
    const [editIndex, setEditIndex] = useState(null)
    const [gastos, setGastos] = useState([])


    //Carrega os gastos do DB ao iniciar
    useEffect(() => {
    fetch("http://localhost:5000/gastos")
      .then((res) => res.json())
      .then(setGastos)
      .catch((err) => console.error("Erro ao carregar gastos:", err));
  }, []);


    //Adiciona o gasto (POST)
    const handleAdicionarGasto = (novoGasto) => {
    fetch("http://localhost:5000/gastos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoGasto),
    })
      .then((res) => res.json())
      .then((data) => setGastos((prev) => [...prev, data]))
      .catch((err) => console.error("Erro ao adicionar gasto:", err));
  };


    //Deleta o gasto (DELETE)
    const handleRemoverGasto = (id) => {
    fetch(`http://localhost:5000/gastos/${id}`, {
      method: "DELETE",
    })
      .then(() => setGastos((prev) => prev.filter((g) => g.id !== id)))
      .catch((err) => console.error("Erro ao remover gasto:", err));
  };

    return(
        <div className="flex h-screen bg-gray-200 ">
            <div className="p-4 bg-red-900">
                <Navbar/>
            </div>

            <div className="content flex-1 p-5">
                <Header/>
             
                <FormGasto onAdicionar={handleAdicionarGasto}/>
               <h1>Gastos Simples</h1>
                    {gastos
                    .filter((g) => g.tipo === "Simples")
                    .map((gasto) => (
                        <GastoItem
                        key={gasto.id}
                        gasto={gasto}
                        onRemover={() => handleRemoverGasto(gasto.id)}
                        />
                    ))}
                

                <h1>Gastos Parcelados</h1>
                    {gastos
                    .filter((g) => g.tipo === "Parcelado")
                    .map((gasto) => (
                        <GastoItem
                        key={gasto.id}
                        gasto={gasto}
                        onRemover={() => handleRemoverGasto(gasto.id)}
                        />
                    ))}

                <h1>Gastos Fixos</h1>
                    {gastos
                    .filter((g) => g.tipo === "Fixos")
                    .map((gasto) => (
                        <GastoItem
                        key={gasto.id}
                        gasto={gasto}
                        onRemover={() => handleRemoverGasto(gasto.id)}
                        />
                    ))}
            </div>
        </div>
    )
}

      
      
import Navbar from "../components/navbar"
import Header from "../components/header"
import GastoItem from "../components/gastoItem"
import FormGasto from "../components/formGasto"
import GastoEditPopUp from "../components/gastoEditPopUp"
import { useState } from "react"

export default function Home(){

    const [showEditPopup, setShowEditPopup] = useState(false)
    const [editIndex, setEditIndex] = useState(null)
    const [gastos, setGastos] = useState([])

    const handleAdicionarGasto = (novoGasto) => {
        setGastos((prev) => [...prev, novoGasto]);
    };

    const handleRemoverGasto = (index) =>{
        setGastos((prev) => prev.filter((_, i) => i !== index))
    }

    return(
        <div className="flex h-screen bg-gray-200 ">
            <div className="p-4 bg-red-900">
                <Navbar/>
            </div>

            <div className="content flex-1 p-5">
                <Header/>
                <GastoEditPopUp/>
                <FormGasto onAdicionar={handleAdicionarGasto}/>
                <h1>Gastos Simples</h1>
                {gastos
                    .filter((g) => g.tipo === "Simples")
                    .map((gasto, index) => (
                        <GastoItem key={index} id={index + 1} gasto={gasto} />
                    ))}
                <h1>Gastos Parcelados</h1>
                {gastos
                    .filter((g) => g.tipo === "Parcelado")
                    .map((gasto, index) => (
                        <GastoItem key={index} id={index + 1} gasto={gasto} />
                    ))}
                <h1>Gastos Fixos</h1>
                {gastos
                    .filter((g) => g.tipo === "Fixos")
                    .map((gasto, index) => (
                        <GastoItem key={index} id={index + 1} gasto={gasto} />
                    ))}
            </div>
        </div>
    )
}

      
      
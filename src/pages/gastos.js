import Navbar from "../components/navbar"
import GastoItem from "../components/gastoItem"
import FormGasto from "../components/formGasto"
import GastoEditPopUp from "../components/gastoEditPopUp";
import { useEffect, useState } from "react"

export default function Gastos() {
  const [gastos, setGastos] = useState([])
  const [showEditPopup, setShowEditPopup] = useState(false)
  const [gastoEditando, setGastoEditando] = useState(null)

  const somaGastos = gastos.reduce((total, gasto) => total + parseFloat(gasto.valor), 0).toFixed(2);

  const handleAbrirEdicao = (id) => {
    const gasto = gastos.find((g) => g.id === id)
    setGastoEditando(gasto)
    setShowEditPopup(true)
  }

  // Carrega os gastos do DB ao iniciar
  useEffect(() => {
    fetch("http://localhost:5000/gastos")
      .then((res) => res.json())
      .then(setGastos)
      .catch((err) => console.error("Erro ao carregar gastos:", err))
  }, [])

  // Adiciona o gasto (POST)
  const handleAdicionarGasto = (novoGasto) => {
    fetch("http://localhost:5000/gastos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoGasto),
    })
      .then((res) => res.json())
      .then((data) => setGastos((prev) => [...prev, data]))
      .catch((err) => console.error("Erro ao adicionar gasto:", err))
  }

  // Edita o gasto (PUT)
  const handleEditarGasto = async (id, gastoEditado) => {
    try {
        const res = await fetch(`http://localhost:5000/gastos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gastoEditado),
        });

        if (!res.ok) {
        throw new Error(`Erro HTTP: ${res.status}`);
        }

        const data = await res.json();

        setGastos((prev) => prev.map((g) => (g.id === id ? data : g)));
        console.log("Gasto atualizado com sucesso:", data);
        return true;
    } catch (err) {
        console.error("Erro ao editar gasto:", err);
        return false;
    }
    };

  // Deleta o gasto (DELETE)
  const handleRemoverGasto = (id) => {
    fetch(`http://localhost:5000/gastos/${id}`, {
      method: "DELETE",
    })
      .then(() => setGastos((prev) => prev.filter((g) => g.id !== id)))
      .catch((err) => console.error("Erro ao remover gasto:", err))
  }

  const handleSalvarGastoEditado = async (id, gastoEditado) => {
  const sucesso = await handleEditarGasto(id, gastoEditado);
  if (sucesso) {
    setShowEditPopup(false);
  }
};

  return (
    <div className="flex h-screen bg-gray-200 ">
      <div className="p-4 bg-red-900">
        <Navbar />
      </div>

      <div className="content flex-1 p-5">
        <h1 className="text-xl font-bold mb-4">Total Gasto: R$ {somaGastos}</h1>

        <FormGasto onAdicionar={handleAdicionarGasto} />
        <h1>Gastos Simples</h1>
        <div className="bg-white min-h-24 rounded-md">
          {gastos
            .filter((g) => g.tipo === "Simples")
            .map((gasto) => (
              <GastoItem
                key={gasto.id}
                gasto={gasto}
                onRemover={() => handleRemoverGasto(gasto.id)}
                onEditar={handleAbrirEdicao}
              />
            ))}
          </div>

        <h1>Gastos Parcelados</h1>
        <div className="bg-white min-h-24 rounded-md">
          {gastos
            .filter((g) => g.tipo === "Parcelado")
            .map((gasto) => (
              <GastoItem
                key={gasto.id}
                gasto={gasto}
                onRemover={() => handleRemoverGasto(gasto.id)}
                onEditar={handleAbrirEdicao}
              />
            ))}
          </div>

        <h1>Gastos Fixos</h1>
        <div className="bg-white min-h-24 rounded-md">
        {gastos
          .filter((g) => g.tipo === "Fixos")
          .map((gasto) => (
            <GastoItem
              key={gasto.id}
              gasto={gasto}
              onRemover={() => handleRemoverGasto(gasto.id)}
              onEditar={handleAbrirEdicao}
            />
          ))}
        </div>
        {showEditPopup && (
          <GastoEditPopUp
            gasto={gastoEditando}
            onClose={() => setShowEditPopup(false)}
            onSalvar={(id, gastoEditado) => {
              handleEditarGasto(id, gastoEditado).then(() =>
                setShowEditPopup(false)
              )
            }}
          />
        )}
      </div>
    </div>
  )
}
import Navbar from "../components/navbar"
import EntradaItem from "../components/entradaItem"
import FormEntrada from "../components/formEntrada"
import EntradaEditPopUp from "../components/entradaEditPopUp";
import { useEffect, useState } from "react"

export default function Home() {
  const [entradas, setEntradas] = useState([])
  const [showEditPopup, setShowEditPopup] = useState(false)
  const [entradaEditando, setEntradaEditando] = useState(null)

  const somaEntradas = entradas.reduce((total, entrada) => total + parseFloat(entrada.valor), 0).toFixed(2);

  const handleAbrirEdicao = (id) => {
    const entrada = entradas.find((g) => g.id === id)
    setEntradaEditando(entrada)
    setShowEditPopup(true)
  }

  // Carrega as Entradas do DB ao iniciar
  useEffect(() => {
    fetch("http://localhost:5000/entradas")
      .then((res) => res.json())
      .then(setEntradas)
      .catch((err) => console.error("Erro ao carregar entradas:", err))
  }, [])

  // Adiciona entradas (POST)
  const handleAdicionarEntrada = (novaEntrada) => {
    fetch("http://localhost:5000/entradas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaEntrada),
    })
      .then((res) => res.json())
      .then((data) => setEntradas((prev) => [...prev, data]))
      .catch((err) => console.error("Erro ao adicionar entradas:", err))
  }

  // Edita entrada (PUT)
  const handleEditarEntrada = async (id, entradaEditado) => {
    try {
        const res = await fetch(`http://localhost:5000/entradas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entradaEditado),
        });

        if (!res.ok) {
        throw new Error(`Erro HTTP: ${res.status}`);
        }

        const data = await res.json();

        setEntradas((prev) => prev.map((g) => (g.id === id ? data : g)));
        console.log("Entradas atualizado com sucesso:", data);
        return true;
    } catch (err) {
        console.error("Erro ao editar entradas:", err);
        return false;
    }
    };

  // Deleta entrada (DELETE)
  const handleRemoverEntrada = (id) => {
    fetch(`http://localhost:5000/entradas/${id}`, {
      method: "DELETE",
    })
      .then(() => setEntradas((prev) => prev.filter((g) => g.id !== id)))
      .catch((err) => console.error("Erro ao remover entrada:", err))
  }

  const handleSalvarEntradaEditado = async (id, entradaEditado) => {
  const sucesso = await handleEditarEntrada(id, entradaEditado);
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

        <h1 className="text-xl font-bold mb-4">Total Entradas: R$ {somaEntradas}</h1>

        <FormEntrada onAdicionar={handleAdicionarEntrada} />
        <h1>Entradas</h1>
        <div className="bg-white min-h-24 rounded-md">
          {entradas
            .map((entrada) => (
              <EntradaItem
                key={entrada.id}
                entrada={entrada}
                onRemover={() => handleRemoverEntrada(entrada.id)}
                onEditar={handleAbrirEdicao}
              />
            ))}
          </div>

        {showEditPopup && (
          <EntradaEditPopUp
            entrada={entradaEditando}
            onClose={() => setShowEditPopup(false)}
            onSalvar={(id, entradaEditado) => {
              handleEditarEntrada(id, entradaEditado).then(() =>
                setShowEditPopup(false)
              )
            }}
          />
        )}
      </div>
    </div>
  )
}
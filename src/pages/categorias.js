import Navbar from "../components/navbar"
import CategoriaItem from "../components/categoriaItem"
import FormCategoria from "../components/formCategoria"
import CategoriaEditPop from "../components/categoriaEditPopUp"
import { useEffect, useState } from "react"

export default function Categorias() {
  const [categorias, setCategorias] = useState([])
  const [showEditPopup, setShowEditPopup] = useState(false)
  const [categoriaEditando, setCategoriaEditando] = useState(null)

  const handleAbrirEdicao = (id) => {
  const categoriaSelecionada = categorias.find((g) => g.id === id);
  setCategoriaEditando(categoriaSelecionada);
  setShowEditPopup(true);
};

  // Carrega as Categorias do DB ao iniciar
  useEffect(() => {
    fetch("http://localhost:5000/categorias")
      .then((res) => res.json())
      .then(setCategorias)
      .catch((err) => console.error("Erro ao carregar categorias:", err))
  }, [])

  // Adiciona categorias (POST)
  const handleAdicionarCategoria = (novaCategoria) => {
    fetch("http://localhost:5000/categorias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaCategoria),
    })
      .then((res) => res.json())
      .then((data) => setCategorias((prev) => [...prev, data]))
      .catch((err) => console.error("Erro ao adicionar categorias:", err))
  }

  // Edita categoria (PUT)
  const handleEditarCategoria = async (id, categoriaEditado) => {
    try {
        const res = await fetch(`http://localhost:5000/categorias/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoriaEditado),
        });

        if (!res.ok) {
        throw new Error(`Erro HTTP: ${res.status}`);
        }

        const data = await res.json();

        setCategorias((prev) => prev.map((g) => (g.id === id ? data : g)));
        console.log("Categorias atualizado com sucesso:", data);
        return true;
    } catch (err) {
        console.error("Erro ao editar categorias:", err);
        return false;
    }
    };

  // Deleta categoria (DELETE)
  const handleRemoverCategoria = (id) => {
    fetch(`http://localhost:5000/categorias/${id}`, {
      method: "DELETE",
    })
      .then(() => setCategorias((prev) => prev.filter((g) => g.id !== id)))
      .catch((err) => console.error("Erro ao remover categoria:", err))
  }

  const handleSalvarCategoriaEditado = async (id, categoriaEditado) => {
  const sucesso = await handleEditarCategoria(id, categoriaEditado);
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

        <FormCategoria onAdicionar={handleAdicionarCategoria} />
        <h1>Categorias</h1>
        <div className="bg-white min-h-24 rounded-md">
          {categorias
            .map((categoria) => (
              <CategoriaItem
                key={categoria.id}
                categoria={categoria}
                onRemover={() => handleRemoverCategoria(categoria.id)}
                onEditar={handleAbrirEdicao}
              />
            ))}
          </div>

        {showEditPopup && (
          <CategoriaEditPop
            categoria={categoriaEditando}
            onClose={() => setShowEditPopup(false)}
            onSalvar={(id, categoriaEditado) => {
              handleEditarCategoria(id, categoriaEditado).then(() =>
                setShowEditPopup(false)
              )
            }}
          />
        )}
      </div>
    </div>
  )
}
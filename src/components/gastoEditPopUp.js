import { useState } from "react";

export default function GastoEditPopUp({ gasto, onSalvar, onClose }) {
  const [nome, setNome] = useState(gasto?.nome || "");
  const [tipo, setTipo] = useState(gasto?.tipo || "");
  const [categoria, setCategoria] = useState(gasto?.categoria || "");
  const [valor, setValor] = useState(gasto?.valor || "");
  const [parcelas, setParcelas] = useState(gasto?.parcelas || "");
  const [data, setData] = useState(gasto?.data || "");

  const handleSalvar = async () => {
    const gastoEditado = {
      tipo,
      nome,
      categoria,
      valor: parseFloat(valor),
      parcelas: tipo === "Parcelado" ? parseInt(parcelas) : null,
      data,
    };

    const sucesso = await onSalvar(gasto.id, gastoEditado);
    if (sucesso) {
      onClose();
    }
  };

  return (
    <div className="editForm gap-1 absolute p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 bg-white rounded-md shadow-xl/20 border-4 border-red-900 flex flex-col">
      <h1 className="text-[22px]">Editar</h1>

      <label>Tipo:</label>
      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option>Simples</option>
        <option>Parcelado</option>
        <option>Fixo</option>
        
      </select>

      <label>Nome:</label>
      <input value={nome} onChange={(e) => setNome(e.target.value)} />

      <label>Data:</label>
      <input type="date" value={data} onChange={(e) => setData(e.target.value)} />

      <label>Categoria:</label>
      <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
        <option>Selecione uma categoria</option>
        <option>Delivery</option>
        <option>Mercado</option>
        <option>Gasolina</option>
        <option>Conta Fixa</option>
        <option>Streaming</option>
        <option>Outros</option>
      </select>

      {tipo === "Parcelado" && (
        <>
          <label>Parcela:</label>
          <input value={parcelas} onChange={(e) => setParcelas(e.target.value)} />
        </>
      )}

      <label>Valor:</label>
      <input value={valor} onChange={(e) => setValor(e.target.value)} />

      <div className="pt-4 flex flex-row gap-4">
        <button className="buttonItem" onClick={handleSalvar}>Salvar</button>
        <button className="buttonItem" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}
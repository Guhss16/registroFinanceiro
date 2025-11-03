import { useState } from "react";

export default function EntradaEditPopUp({ entrada, onSalvar, onClose }) {
  const [nome, setNome] = useState(entrada?.nome || "");
  const [tipo, setTipo] = useState(entrada?.tipo || "");
  const [banco, setBanco] = useState(entrada?.banco || "");
  const [valor, setValor] = useState(entrada?.valor || "");
  
  const [data, setData] = useState(entrada?.data || "");

  const handleSalvar = async () => {
    const entradaEditado = {
      tipo,
      nome,
      banco,
      valor: parseFloat(valor),
      
      data,
    };

    const sucesso = await onSalvar(entrada.id, entradaEditado);
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
        <option>Salário</option>
        <option>Freelancer</option>
        <option>Venda</option>
        <option>Bet</option>
      </select>

      <label>Nome:</label>
      <input value={nome} onChange={(e) => setNome(e.target.value)} />

      <label>Data:</label>
      <input type="date" value={data} onChange={(e) => setData(e.target.value)} />

      <label>Banco:</label>
      <select value={banco} onChange={(e) => setBanco(e.target.value)}>
        <option>Selecione seu Banco</option>
        <option>Banco do Brasil</option>
        <option>Santander</option>
        <option>Nubank</option>
      </select>

      

      <label>Valor:</label>
      <input value={valor} onChange={(e) => setValor(e.target.value)} />

      <div className="pt-4 flex flex-row gap-4">
        <button className="buttonItem" onClick={handleSalvar}>Salvar</button>
        <button className="buttonItem" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}
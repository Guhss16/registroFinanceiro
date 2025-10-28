import { useState } from "react"

export default function FormGasto({onAdicionar}){

    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState("Simples");
    const [categoria, setCategoria] = useState("");
    const [valor, setValor] = useState("");
    const [parcelas, setParcelas] = useState("");
    const [data, setData] = useState("");


    const handleSubmit = () =>{
        if(!categoria || !valor) return;

        const novoGasto = {
            tipo,
            nome,
            data,
            categoria,
            valor,
            parcelas: tipo === "Parcelado" ? parcelas : null,
        };


        onAdicionar(novoGasto);
        setNome("");
        setCategoria("");
        setData("");
        setParcelas("");
        setTipo("Simples");
        setValor("");
    }

    return(
        <div className="bg-white rounded-md p-4">
            <a>Adicionar Gasto</a>
            <div className="flex justify-between">
                <div className="formInputs flex gap-6">
                    <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                        <option>Simples</option>
                        <option>Parcelado</option>
                        <option>Fixos</option>
                    </select>
                    <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}></input>
                    <input type="date" value={data} onChange={(e) => setData(e.target.value)}></input>
                    <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                        <option value="">Selecione uma categoria</option>
                        <option>Delivery</option>
                        <option>Mercado</option>
                        <option>Gasolina</option>
                        <option>Conta Fixa</option>
                        <option>Streaming</option>
                        <option>Outros</option>
                    </select>

                    <input type="number" placeholder="Qtd. de Parcelas" min={"0"} className={`${tipo === "Parcelado" ? "" : "hidden"}`} value={parcelas} onChange={(e) => setParcelas(e.target.value)}></input>

                    <input type="number" placeholder="R$ 0,00" min={"0"}value={valor} onChange={(e) => setValor(e.target.value)} ></input>
                </div>

                <button className="buttonItem" onClick={handleSubmit}>Adicionar</button>
            </div>
        </div>
    )
}
import { useState } from "react"

export default function FormEntrada({onAdicionar}){

    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState("Simples");
    const [banco, setBanco] = useState("");
    const [valor, setValor] = useState("");
    const [data, setData] = useState("");


    const handleSubmit = () =>{
        if(!banco || !valor) return;

        const novaEntrada = {
            tipo,
            nome,
            data,
            banco,
            valor,
        };


        onAdicionar(novaEntrada);
        setNome("");
        setBanco("");
        setData("");
        setTipo("Simples");
        setValor("");
    }

    return(
        <div className="bg-white rounded-md p-4">
            <a>Adicionar Entrada de Dinheiro</a>
            <div className="flex justify-between">
                <div className="formInputs flex gap-6">
                    <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                        <option>Simples</option>
                        <option>Salário</option>
                        <option>Freelancer</option>
                        <option>Venda</option>
                        <option>Bet</option>
                    </select>
                    <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}></input>
                    <input type="date" value={data} onChange={(e) => setData(e.target.value)}></input>
                    <select value={banco} onChange={(e) => setBanco(e.target.value)}>
                        <option value="">Selecione seu Banco</option>
                        <option>Banco do Brasil</option>
                        <option>Santander</option>
                        <option>Nubank</option>
                    </select>


                    <input type="number" placeholder="R$ 0,00" min={"0"}value={valor} onChange={(e) => setValor(e.target.value)} ></input>
                </div>

                <button className="buttonItem" onClick={handleSubmit}>Adicionar</button>
            </div>
        </div>
    )
}
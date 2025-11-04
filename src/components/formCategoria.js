import { useState } from "react"

export default function FormCategoria({onAdicionar}){

    const [nome, setNome] = useState("");
    const handleSubmit = () =>{

        const novaCategoria = { nome };
        onAdicionar(novaCategoria);
        setNome("");

    }

    return(
        <div className="bg-white rounded-md p-4">
            <a>Adicionar Categoria</a>
            <div className="flex justify-between">
                <div className="formInputs flex gap-6">
                    <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}></input>
                </div>
                <button className="buttonItem" onClick={handleSubmit}>Adicionar</button>
            </div>
        </div>
    )
}
export default function EntradaItem({entrada, onEditar, onRemover}){
    return(
        <div className="bg-white rounded-md p-4">
            <a className="itemLabel">Nome: {entrada.nome} | </a>
            <a className="itemLabel">Data: {entrada.data} | </a>
            <a className="itemLabel">Banco: {entrada.banco} | </a>
            <a className="itemLabel">Valor: R$ {Number(entrada.valor).toFixed(2)} | </a>      
            <div className="flex flex-row gap-4 pt-2">
                <button className="buttonItem" onClick={() => onEditar(entrada.id)}>Editar</button>
                <button className="buttonItem" onClick={() => onRemover(entrada.id)}>Remover</button>
            </div>
        </div>
    )
}
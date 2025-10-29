export default function gastoItem({gasto, onEditar, onRemover}){
    return(
        <div className="bg-white rounded-md p-4">
            <a className="itemLabel">Nome: {gasto.nome} | </a>
            <a className="itemLabel">Data: {gasto.data} | </a>
            <a className="itemLabel">Categoria: {gasto.categoria} | </a>
            <a className="itemLabel">Valor: R$ {Number(gasto.valor).toFixed(2)} | </a>
            {gasto.tipo === "Parcelado" && (
                <a className="itemLabel">Parcelas: {gasto.parcelas} | </a>
            )}        
            <div className="flex flex-row gap-4 pt-2">
                <button className="buttonItem" onClick={() => onEditar(gasto.id)}>Editar</button>
                <button className="buttonItem" onClick={() => onRemover(gasto.id)}>Remover</button>
            </div>
        </div>
    )
}
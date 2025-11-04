export default function CategoriaItem({categoria, onEditar, onRemover}){
    return(
        <div className="bg-white rounded-md p-4">
            <a className="itemLabel">Nome: {categoria.nome} | </a>
                <button className="buttonItem" onClick={() => onEditar(categoria.id)}>Editar</button>
                <button className="buttonItem" onClick={() => onRemover(categoria.id)}>Remover</button>
        </div>
    )
}
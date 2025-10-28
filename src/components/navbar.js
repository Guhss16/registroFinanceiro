export default function Navbar(){
    return(
        <div className="flex flex-col gap-4">
            <h1 className="text-[26px] font-semibold text-white">REGISTRO DE GASTOS</h1>

            <div className="pl-[10px]">
                <nav className="text-white">
                    <ul className="space-y-1">
                        <li className="cursor-pointer">→ GASTOS</li>
                        <li className="cursor-pointer">→ ENTRADAS</li>
                        <li className="cursor-pointer">→ CATEGORIAS</li>
                    </ul>
                </nav>
            </div>

        </div>
    )
}
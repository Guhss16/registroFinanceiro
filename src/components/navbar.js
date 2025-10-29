import { Link } from "react-router-dom"

export default function Navbar(){
    return(
        <div className="flex flex-col gap-4">
            <h1 className="text-[26px] font-semibold text-white">REGISTRO DE GASTOS</h1>

            <div className="pl-[10px]">
                <nav className="text-white">
                    <ul className="space-y-1">
                        <li><Link to="/">→ DASHBOARD</Link></li>
                        <li><Link to="/gastos">→ GASTOS</Link></li>
                        <li><Link to="/entradas">→ ENTRADAS</Link></li>
                        <li><Link to="/categorias">→ CATEGORIAS</Link></li>
                    </ul>
                </nav>
            </div>

        </div>
    )
}
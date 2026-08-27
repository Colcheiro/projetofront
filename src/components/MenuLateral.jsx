import { useState } from 'react'

function MenuLateral({ aberto, setTela }) {
    const [cadastroAberto, setCadastroAberto] = useState(false)

    function alterarCadastro() {
        setCadastroAberto(!cadastroAberto)
    }

    return (
        <aside
            className={`menu-lateral bg-dark text-white ${
                aberto ? 'aberto' : 'fechado'
            }`}
        >
            <h2 className="h6 text-uppercase mb-3">
                Menu
            </h2>

            <div className="d-grid gap-2">

                <button
                    className="btn btn-outline-light text-start"
                    onClick={() => setTela('inicio')}
                >
                    Início
                </button>

                <button
                    className="btn btn-outline-light text-start"
                    onClick={alterarCadastro}
                >
                    Cadastro {cadastroAberto ? '▲' : '▼'}
                </button>

                {cadastroAberto && (
                    <div className="ms-3 d-grid gap-2">

                        <button
                            className="btn btn-sm btn-dark text-start"
                            onClick={() => setTela('safra')}
                        >
                            Safras
                        </button>

                        <button
                            className="btn btn-sm btn-dark text-start"
                            onClick={() => setTela('unidade')}
                        >
                            Unidades
                        </button>

                        <button
                            className="btn btn-sm btn-dark text-start"
                            onClick={() => setTela('equipamento')}
                        >
                            Equipamentos
                        </button>

                        <button
                            className="btn btn-sm btn-dark text-start"
                            onClick={() => setTela('medicao')}
                        >
                            Medições
                        </button>

                        <button
                            className="btn btn-sm btn-dark text-start"
                            onClick={() => setTela('unidademedida')}
                        >
                            Unidades de Medida
                        </button>

                        <button
                            className="btn btn-sm btn-dark text-start"
                            onClick={() => setTela('tipoinformacao')}
                        >
                            Tipos de Informação
                        </button>

                        <button
                            className="btn btn-sm btn-dark text-start"
                            onClick={() => setTela('indicadores')}
                        >
                            Indicadores
                        </button>

                    </div>
                )}

            </div>
        </aside>
    )
}

export default MenuLateral
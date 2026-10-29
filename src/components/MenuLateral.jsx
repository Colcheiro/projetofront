
import { useState } from 'react'

function MenuLateral({
    aberto,
    setTela,
    indicadores = [],
    selecionarIndicador
}) {
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
                {/* INÍCIO */}
                <button
                    className="btn btn-outline-light text-start"
                    onClick={() => setTela('inicio')}
                >
                    Início
                </button>

                {/* LOGIN */}
                <button
                    className="btn btn-outline-info text-start"
                    onClick={() => setTela('login')}
                >
                    Login
                </button>

                {/* CADASTRO */}
                <button
                    className="btn btn-outline-light text-start"
                    onClick={alterarCadastro}
                >
                    Cadastro {cadastroAberto ? '▲' : '▼'}
                </button>

                {/* SUBMENU DE CADASTROS */}
                {cadastroAberto && (
                    <div className="ms-3 d-grid gap-2">
                        <button
                            className="btn btn-sm btn-dark text-start"
                            onClick={() => setTela('funcionarios')}
                        >
                            Funcionários
                        </button>

                        {/* NOVOS CADASTROS DA API */}
                        <hr className="border-light" />

                        <small className="text-info">
                            Cadastros da API
                        </small>

                        <button
                            className="btn btn-sm btn-outline-info text-start"
                            onClick={() => setTela('safras')}
                        >
                            Safras (API)
                        </button>

                        <button
                            className="btn btn-sm btn-outline-info text-start"
                            onClick={() => setTela('unidades')}
                        >
                            Unidades (API)
                        </button>

                        <button
                            className="btn btn-sm btn-outline-info text-start"
                            onClick={() => setTela('unidadesMedida')}
                        >
                            Unidades de Medida (API)
                        </button>

                        <button
                            className="btn btn-sm btn-outline-info text-start"
                            onClick={() => setTela('equipamentos')}
                        >
                            Equipamentos (API)
                        </button>

                        <button
                            className="btn btn-sm btn-outline-info text-start"
                            onClick={() => setTela('tiposInformacao')}
                        >
                            Tipos de Informação (API)
                        </button>

                        <button
                            className="btn btn-sm btn-outline-info text-start"
                            onClick={() => setTela('medicoes')}
                        >
                            Medições (API)
                        </button>

                        {/* CADASTROS ANTIGOS PRESERVADOS */}
                        <hr className="border-light" />

                        <small className="text-white-50">
                            Cadastros anteriores
                        </small>

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
                            Cadastro de Indicadores
                        </button>

                        <button
                            className="btn btn-sm btn-dark text-start"
                            onClick={() => setTela('usuarios')}
                        >
                            Usuários
                        </button>
                    </div>
                )}

                {/* INDICADORES DINÂMICOS */}
                <hr className="border-light" />

                <h3 className="h6 text-uppercase">
                    Indicadores
                </h3>

                {indicadores.map((item) => (
                    <button
                        key={item.Id}
                        className="btn btn-outline-light text-start"
                        onClick={() => selecionarIndicador(item)}
                    >
                        {item.Nome}
                    </button>
                ))}

                {indicadores.length === 0 && (
                    <small className="text-white-50">
                        Nenhum indicador cadastrado.
                    </small>
                )}
            </div>
        </aside>
    )
}

export default MenuLateral

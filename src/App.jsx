
import { useEffect, useState } from 'react'

import Header from './components/Header'
import MenuLateral from './components/MenuLateral'
import Conteudo from './components/Conteudo'

import Safra from './components/cadastros/Safra'
import Unidade from './components/cadastros/Unidade'
import Equipamento from './components/cadastros/Equipamento'
import Medicao from './components/cadastros/Medicao'
import UnidadeMedida from './components/cadastros/UnidadeMedida'
import TipoInformacao from './components/cadastros/TipoInformacao'
import Indicadores from './components/cadastros/Indicadores'
import Funcionarios from './components/cadastros/Funcionarios'
import Usuarios from './components/cadastros/Usuarios'

import Login from './components/Login'
import VisualizarIndicador from './components/VisualizarIndicador'

// Novo componente para os cadastros integrados à API
import CadastroApi from './components/CadastroApi'

import { indicadorService } from './services/indicadorService'

import './App.css'

function App() {
    // Controle do menu e da tela atual
    const [menuAberto, setMenuAberto] = useState(true)
    const [tela, setTela] = useState('inicio')

    // Dados dos indicadores vindos da API
    const [indicadores, setIndicadores] = useState([])
    const [erroIndicadores, setErroIndicadores] = useState('')
    const [indicadorSelecionado, setIndicadorSelecionado] = useState(null)

    // Abre ou fecha o menu lateral
    function alterarMenu() {
        setMenuAberto((aberto) => !aberto)
    }

    // Busca os indicadores na API e atualiza o menu lateral
    async function atualizarMenu() {
        try {
            const dados = await indicadorService.listar()

            if (!Array.isArray(dados)) {
                throw new Error('A API não retornou uma lista válida.')
            }

            setIndicadores(dados)
            setErroIndicadores('')

            // Informa que a atualização foi concluída
            return true
        } catch (erro) {
            console.error('Erro ao carregar indicadores:', erro)

            setIndicadores([])
            setErroIndicadores(
                'Não foi possível carregar os indicadores. Verifique se o Node-RED e a API estão funcionando.'
            )

            return false
        }
    }

    // Carrega os indicadores quando o aplicativo é aberto
    useEffect(() => {
        atualizarMenu()
    }, [])

    // Abre a visualização do indicador escolhido no menu
    function selecionarIndicador(item) {
        setIndicadorSelecionado(item)
        setTela('visualizarIndicador')
    }

    return (
        <>
            <Header />

            <div className="layout">
                <MenuLateral
                    aberto={menuAberto}
                    setTela={setTela}
                    indicadores={indicadores}
                    selecionarIndicador={selecionarIndicador}
                />

                <main className="area-conteudo">
                    {/* Botão para controlar o menu lateral */}
                    <div className="p-3 border-bottom bg-white">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={alterarMenu}
                        >
                            ☰ Menu
                        </button>
                    </div>

                    {/* Mensagem quando a API dos indicadores não está disponível */}
                    {erroIndicadores && (
                        <div
                            className="alert alert-danger m-3"
                            role="alert"
                        >
                            {erroIndicadores}

                            <div className="mt-2">
                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={atualizarMenu}
                                >
                                    Tentar novamente
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Tela inicial */}
                    {tela === 'inicio' && <Conteudo />}

                    {/* Cadastro de funcionários */}
                    {tela === 'funcionarios' && <Funcionarios />}

                    {/* Novos cadastros integrados à API do Node-RED */}
                    {tela === 'safras' && (
                        <CadastroApi recurso="safras" />
                    )}

                    {tela === 'unidades' && (
                        <CadastroApi recurso="unidades" />
                    )}

                    {tela === 'unidadesMedida' && (
                        <CadastroApi recurso="unidadesMedida" />
                    )}

                    {tela === 'equipamentos' && (
                        <CadastroApi recurso="equipamentos" />
                    )}

                    {tela === 'tiposInformacao' && (
                        <CadastroApi recurso="tiposInformacao" />
                    )}

                    {tela === 'medicoes' && (
                        <CadastroApi recurso="medicoes" />
                    )}

                    {/* Cadastros antigos preservados */}
                    {tela === 'safra' && <Safra />}

                    {tela === 'unidade' && <Unidade />}

                    {tela === 'equipamento' && <Equipamento />}

                    {tela === 'medicao' && <Medicao />}

                    {tela === 'unidademedida' && <UnidadeMedida />}

                    {tela === 'tipoinformacao' && <TipoInformacao />}

                    {/* Cadastro e gerenciamento dos indicadores */}
                    {tela === 'indicadores' && (
                        <Indicadores atualizarMenu={atualizarMenu} />
                    )}

                    {/* Visualização do indicador selecionado */}
                    {tela === 'visualizarIndicador' && (
                        <VisualizarIndicador
                            indicador={indicadorSelecionado}
                            setTela={setTela}
                        />
                    )}

                    {/* Cadastro de usuários */}
                    {tela === 'usuarios' && <Usuarios />}

                    {/* Tela de login */}
                    {tela === 'login' && <Login setTela={setTela} />}
                </main>
            </div>
        </>
    )
}

export default App

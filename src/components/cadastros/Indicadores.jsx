import { useEffect, useState } from 'react'

const API_URL = 'http://127.0.0.1:1880/api/indicadores'
const CHAVE_FAVORITOS = 'indicadoresFavoritos'

const vazio = {
    Nome: '',
    Descricao: '',
    Url: ''
}

function lerFavoritos() {
    try {
        const salvos = localStorage.getItem(CHAVE_FAVORITOS)
        const dados = salvos ? JSON.parse(salvos) : []

        return Array.isArray(dados) ? dados.map(String) : []
    } catch {
        return []
    }
}

function Indicadores({ atualizarMenu = async () => {} }) {
    const [itens, setItens] = useState([])
    const [form, setForm] = useState({ ...vazio })
    const [idEdicao, setIdEdicao] = useState(null)
    const [erro, setErro] = useState('')
    const [carregando, setCarregando] = useState(false)
    const [pesquisa, setPesquisa] = useState('')
    const [favoritos, setFavoritos] = useState(lerFavoritos)
    const [somenteFavoritos, setSomenteFavoritos] = useState(false)

    // Salva os favoritos no navegador sempre que houver alteração
    useEffect(() => {
        try {
            localStorage.setItem(
                CHAVE_FAVORITOS,
                JSON.stringify(favoritos)
            )
        } catch (e) {
            console.error('Não foi possível salvar os favoritos:', e)
        }
    }, [favoritos])

    async function carregar() {
        setCarregando(true)

        try {
            const resposta = await fetch(API_URL)

            if (!resposta.ok) {
                throw new Error('Erro ao consultar a API.')
            }

            const dados = await resposta.json()

            if (!Array.isArray(dados)) {
                throw new Error('A API não retornou uma lista.')
            }

            setItens(dados)
            setErro('')
        } catch (e) {
            setErro(
                e.message || 'Não foi possível carregar os indicadores.'
            )
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        carregar()
    }, [])

    function alterar(event) {
        const { name, value } = event.target

        setForm(anterior => ({
            ...anterior,
            [name]: value
        }))
    }

    function alternarFavorito(id) {
        const idTexto = String(id)

        setFavoritos(anterior =>
            anterior.includes(idTexto)
                ? anterior.filter(item => item !== idTexto)
                : [...anterior, idTexto]
        )
    }

    async function salvar(event) {
        event.preventDefault()
        setErro('')

        try {
            const urlValidada = new URL(form.Url)

            if (
                urlValidada.protocol !== 'http:' &&
                urlValidada.protocol !== 'https:'
            ) {
                throw new Error(
                    'A URL deve começar com http:// ou https://.'
                )
            }

            const editando = idEdicao !== null

            const resposta = await fetch(
                editando
                    ? `${API_URL}/${idEdicao}`
                    : API_URL,
                {
                    method: editando ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        editando
                            ? { Id: idEdicao, ...form }
                            : form
                    )
                }
            )

            if (!resposta.ok) {
                throw new Error('Erro ao salvar o indicador.')
            }

            setForm({ ...vazio })
            setIdEdicao(null)

            await carregar()
            await atualizarMenu()
        } catch (e) {
            setErro(e.message || 'Falha ao salvar o indicador.')
        }
    }

    function editar(item) {
        setIdEdicao(item.Id)

        setForm({
            Nome: item.Nome || '',
            Descricao: item.Descricao || '',
            Url: item.Url || ''
        })

        setErro('')
    }

    async function excluir(id) {
        if (!window.confirm('Excluir este indicador?')) {
            return
        }

        setErro('')

        try {
            const resposta = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            })

            if (!resposta.ok) {
                throw new Error('Erro ao excluir o indicador.')
            }

            // Remove também dos favoritos
            setFavoritos(anterior =>
                anterior.filter(item => item !== String(id))
            )

            await carregar()
            await atualizarMenu()
        } catch (e) {
            setErro(e.message || 'Falha ao excluir o indicador.')
        }
    }

    // Pesquisa pelo nome e, opcionalmente, mostra apenas favoritos
    const itensFiltrados = itens.filter(item => {
        const nome = (item.Nome || '').toLowerCase()
        const correspondePesquisa = nome.includes(
            pesquisa.trim().toLowerCase()
        )
        const correspondeFavorito =
            !somenteFavoritos ||
            favoritos.includes(String(item.Id))

        return correspondePesquisa && correspondeFavorito
    })

    return (
        <section className="p-4">
            <h2 className="mb-4">Cadastro de Indicadores</h2>

            {erro && (
                <div className="alert alert-danger" role="alert">
                    {erro}
                </div>
            )}

            {/* Formulário de cadastro e edição */}
            <form
                className="card card-body mb-4"
                onSubmit={salvar}
            >
                <label className="form-label">Nome</label>
                <input
                    name="Nome"
                    value={form.Nome}
                    onChange={alterar}
                    className="form-control mb-3"
                    required
                    maxLength={100}
                />

                <label className="form-label">Descrição</label>
                <textarea
                    name="Descricao"
                    value={form.Descricao}
                    onChange={alterar}
                    className="form-control mb-3"
                />

                <label className="form-label">
                    URL do indicador
                </label>
                <input
                    name="Url"
                    type="url"
                    value={form.Url}
                    onChange={alterar}
                    className="form-control mb-3"
                    placeholder="https://..."
                    required
                />

                <div>
                    <button
                        type="submit"
                        className="btn btn-primary me-2"
                    >
                        {idEdicao === null
                            ? 'Cadastrar'
                            : 'Salvar alterações'}
                    </button>

                    {idEdicao !== null && (
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                                setIdEdicao(null)
                                setForm({ ...vazio })
                                setErro('')
                            }}
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            {/* Pesquisa e filtro de favoritos */}
            <div className="mb-3">
                <label
                    htmlFor="pesquisaIndicadores"
                    className="form-label"
                >
                    Pesquisar indicador pelo nome
                </label>

                <div className="input-group">
                    <input
                        id="pesquisaIndicadores"
                        type="search"
                        className="form-control"
                        placeholder="Digite o nome do indicador..."
                        value={pesquisa}
                        onChange={event =>
                            setPesquisa(event.target.value)
                        }
                    />

                    {pesquisa && (
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setPesquisa('')}
                        >
                            Limpar
                        </button>
                    )}
                </div>

                <div className="form-check mt-3">
                    <input
                        id="somenteFavoritos"
                        type="checkbox"
                        className="form-check-input"
                        checked={somenteFavoritos}
                        onChange={event =>
                            setSomenteFavoritos(event.target.checked)
                        }
                    />

                    <label
                        htmlFor="somenteFavoritos"
                        className="form-check-label"
                    >
                        ⭐ Mostrar somente favoritos
                    </label>
                </div>
            </div>

            {carregando && <p>Carregando...</p>}

            {/* Tabela de indicadores */}
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>URL</th>
                            <th>Favorito</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {itensFiltrados.map(item => {
                            const favorito = favoritos.includes(
                                String(item.Id)
                            )

                            return (
                                <tr key={item.Id}>
                                    <td>{item.Nome}</td>

                                    <td>{item.Descricao}</td>

                                    <td className="text-break">
                                        {item.Url || 'Sem URL'}
                                    </td>

                                    <td>
                                        <button
                                            type="button"
                                            className={`btn btn-sm ${
                                                favorito
                                                    ? 'btn-warning'
                                                    : 'btn-outline-secondary'
                                            }`}
                                            onClick={() =>
                                                alternarFavorito(item.Id)
                                            }
                                            aria-label={
                                                favorito
                                                    ? `Remover ${item.Nome} dos favoritos`
                                                    : `Adicionar ${item.Nome} aos favoritos`
                                            }
                                            title={
                                                favorito
                                                    ? 'Remover dos favoritos'
                                                    : 'Adicionar aos favoritos'
                                            }
                                        >
                                            {favorito ? '⭐ ★' : '☆'}
                                        </button>
                                    </td>

                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-warning btn-sm me-2 mb-1"
                                            onClick={() => editar(item)}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm mb-1"
                                            onClick={() => excluir(item.Id)}
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}

                        {!carregando && itensFiltrados.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    {erro
                                        ? 'Não foi possível carregar os indicadores.'
                                        : somenteFavoritos
                                            ? 'Você ainda não tem favoritos que correspondam à pesquisa.'
                                            : pesquisa.trim()
                                                ? 'Nenhum indicador encontrado com esse nome.'
                                                : 'Nenhum indicador cadastrado.'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Indicadores
import { useState } from 'react'

function Indicadores() {
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [urt, setUrt] = useState('')
    const [mensagem, setMensagem] = useState('')

    function cadastrar(event) {
        event.preventDefault()

        if (!nome || !descricao || !urt) {
            setMensagem('Preencha todos os campos!')
            return
        }

        setMensagem('Indicador cadastrado com sucesso!')
    }

    return (
        <section className="p-4">
            <h2 className="mb-4">Cadastro de Indicadores</h2>

            {mensagem && (
                <div className="alert alert-success">
                    {mensagem}
                </div>
            )}

            <form onSubmit={cadastrar}>

                <div className="mb-3">
                    <label className="form-label">Nome</label>

                    <input
                        type="text"
                        className="form-control"
                        value={nome}
                        onChange={(event) =>
                            setNome(event.target.value)
                        }
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Descrição</label>

                    <textarea
                        className="form-control"
                        rows="3"
                        value={descricao}
                        onChange={(event) =>
                            setDescricao(event.target.value)
                        }
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Urt</label>

                    <input
                        type="text"
                        className="form-control"
                        value={urt}
                        onChange={(event) =>
                            setUrt(event.target.value)
                        }
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Cadastrar
                </button>

            </form>
        </section>
    )
}

export default Indicadores
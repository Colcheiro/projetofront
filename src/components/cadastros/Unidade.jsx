import { useState } from 'react'

function Unidade() {
    const [nome, setNome] = useState('')
    const [method, setMethod] = useState('')
    const [mensagem, setMensagem] = useState('')

    function cadastrar(event) {
        event.preventDefault()

        if (!nome || !method) {
            setMensagem('Preencha todos os campos!')
            return
        }

        setMensagem('Unidade cadastrada com sucesso!')
    }

    return (
        <section className="p-4">
            <h2 className="mb-4">Cadastro de Unidade</h2>

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
                    <label className="form-label">Método</label>

                    <input
                        type="text"
                        className="form-control"
                        value={method}
                        onChange={(event) =>
                            setMethod(event.target.value)
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

export default Unidade
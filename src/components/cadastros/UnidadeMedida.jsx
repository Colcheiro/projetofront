import { useState } from 'react'

function UnidadeMedida() {
    const [nome, setNome] = useState('')
    const [simbolo, setSimbolo] = useState('')
    const [mensagem, setMensagem] = useState('')

    function cadastrar(event) {
        event.preventDefault()

        setMensagem('Unidade de medida cadastrada com sucesso!')

        setNome('')
        setSimbolo('')
    }

    return (
        <section className="p-4">

            <h2 className="mb-3">
                Cadastro de Unidade de Medida
            </h2>

            {mensagem && (
                <div className="alert alert-success">
                    {mensagem}
                </div>
            )}

            <form onSubmit={cadastrar}>

                <div className="mb-3">
                    <label className="form-label">
                        Nome
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={nome}
                        onChange={(event) =>
                            setNome(event.target.value)
                        }
                        placeholder="Digite o nome da unidade"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Símbolo
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={simbolo}
                        onChange={(event) =>
                            setSimbolo(event.target.value)
                        }
                        placeholder="Ex: kg, L, °C"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Cadastrar
                </button>

            </form>

        </section>
    )
}

export default UnidadeMedida
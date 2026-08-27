import { useState } from 'react'

function TipoInformacao() {
    const [nome, setNome] = useState('')
    const [unidadeMedida, setUnidadeMedida] = useState('')
    const [mensagem, setMensagem] = useState('')

    function cadastrar(event) {
        event.preventDefault()

        setMensagem('Tipo de informação cadastrado com sucesso!')

        setNome('')
        setUnidadeMedida('')
    }

    return (
        <section className="p-4">

            <h2 className="mb-3">
                Cadastro de Tipo de Informação
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
                        placeholder="Digite o nome"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Unidade de Medida
                    </label>

                    <select
                        className="form-select"
                        value={unidadeMedida}
                        onChange={(event) =>
                            setUnidadeMedida(event.target.value)
                        }
                        required
                    >
                        <option value="">
                            Selecione
                        </option>

                        <option value="Litro">
                            Litro - L
                        </option>

                        <option value="Quilograma">
                            Quilograma - kg
                        </option>

                        <option value="Celsius">
                            Grau Celsius - °C
                        </option>

                        <option value="Metro">
                            Metro - m
                        </option>
                    </select>
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

export default TipoInformacao
import { useState } from 'react'

function Safra() {
    const [nomeSafra, setNomeSafra] = useState('')
    const [dataInicio, setDataInicio] = useState('')
    const [dataFim, setDataFim] = useState('')
    const [mensagem, setMensagem] = useState('')

    function cadastrar(event) {
        event.preventDefault()

        if (!nomeSafra || !dataInicio || !dataFim) {
            setMensagem('Preencha todos os campos!')
            return
        }

        setMensagem('Safra cadastrada com sucesso!')
    }

    return (
        <section className="p-4">
            <h2 className="mb-4">Cadastro de Safra</h2>

            {mensagem && (
                <div className="alert alert-success">
                    {mensagem}
                </div>
            )}

            <form onSubmit={cadastrar}>

                <div className="mb-3">
                    <label className="form-label">Nome da Safra</label>

                    <input
                        type="text"
                        className="form-control"
                        value={nomeSafra}
                        onChange={(event) =>
                            setNomeSafra(event.target.value)
                        }
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Data de Início</label>

                    <input
                        type="date"
                        className="form-control"
                        value={dataInicio}
                        onChange={(event) =>
                            setDataInicio(event.target.value)
                        }
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Data Fim</label>

                    <input
                        type="date"
                        className="form-control"
                        value={dataFim}
                        onChange={(event) =>
                            setDataFim(event.target.value)
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

export default Safra
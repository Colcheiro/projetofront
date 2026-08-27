import { useState } from 'react'

function Medicao() {
    const [safra, setSafra] = useState('')
    const [equipamento, setEquipamento] = useState('')
    const [tipoInformacao, setTipoInformacao] = useState('')
    const [valor, setValor] = useState('')
    const [data, setData] = useState('')
    const [mensagem, setMensagem] = useState('')

    function cadastrar(event) {
        event.preventDefault()

        if (
            !safra ||
            !equipamento ||
            !tipoInformacao ||
            !valor ||
            !data
        ) {
            setMensagem('Preencha todos os campos!')
            return
        }

        setMensagem('Medição cadastrada com sucesso!')
    }

    return (
        <section className="p-4">
            <h2 className="mb-4">Cadastro de Medição</h2>

            {mensagem && (
                <div className="alert alert-success">
                    {mensagem}
                </div>
            )}

            <form onSubmit={cadastrar}>

                <div className="mb-3">
                    <label className="form-label">Safra</label>

                    <select
                        className="form-select"
                        value={safra}
                        onChange={(event) =>
                            setSafra(event.target.value)
                        }
                    >
                        <option value="">Selecione</option>
                        <option value="1">Safra 2025</option>
                        <option value="2">Safra 2026</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Equipamento</label>

                    <select
                        className="form-select"
                        value={equipamento}
                        onChange={(event) =>
                            setEquipamento(event.target.value)
                        }
                    >
                        <option value="">Selecione</option>
                        <option value="1">Equipamento 1</option>
                        <option value="2">Equipamento 2</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Tipo de Informação
                    </label>

                    <select
                        className="form-select"
                        value={tipoInformacao}
                        onChange={(event) =>
                            setTipoInformacao(event.target.value)
                        }
                    >
                        <option value="">Selecione</option>
                        <option value="1">Temperatura</option>
                        <option value="2">Pressão</option>
                        <option value="3">Umidade</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Valor</label>

                    <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        value={valor}
                        onChange={(event) =>
                            setValor(event.target.value)
                        }
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Data</label>

                    <input
                        type="datetime-local"
                        className="form-control"
                        value={data}
                        onChange={(event) =>
                            setData(event.target.value)
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

export default Medicao
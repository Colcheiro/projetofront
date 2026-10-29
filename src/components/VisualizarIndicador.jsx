function VisualizarIndicador({ indicador, setTela }) {
    function voltar() {
        if (setTela) {
            setTela('indicadores')
        }
    }

    if (!indicador) {
        return (
            <section className="p-4">
                <h2>Indicador indisponível</h2>

                <p>
                    Não foi possível encontrar o indicador selecionado.
                    Volte à lista e escolha um indicador novamente.
                </p>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={voltar}
                >
                    Voltar aos indicadores
                </button>
            </section>
        )
    }

    const url = indicador.Url
    let segura = false

    try {
        segura =
            typeof url === 'string' &&
            ['http:', 'https:'].includes(new URL(url).protocol)
    } catch {
        // A URL é inválida.
    }

    if (!segura) {
        return (
            <section className="p-4">
                <h2>{indicador.Nome}</h2>

                <div className="alert alert-warning" role="alert">
                    <strong>Painel indisponível.</strong>
                    <p className="mb-0">
                        A URL deste indicador é inválida ou não foi
                        informada. Verifique o endereço cadastrado.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={voltar}
                >
                    Voltar aos indicadores
                </button>
            </section>
        )
    }

    return (
        <section className="p-4">
            <button
                type="button"
                className="btn btn-outline-secondary mb-3"
                onClick={voltar}
            >
                ← Voltar aos indicadores
            </button>

            <h2>{indicador.Nome}</h2>

            <p>{indicador.Descricao}</p>

            <iframe
                title={indicador.Nome}
                src={url}
                style={{
                    width: '100%',
                    height: '75vh',
                    border: '1px solid #ddd',
                    borderRadius: 8
                }}
                referrerPolicy="strict-origin-when-cross-origin"
            />

            <div className="alert alert-info mt-3" role="alert">
                <strong>O painel não apareceu?</strong>
                <p className="mb-2">
                    O site pode estar indisponível ou bloquear a
                    exibição dentro do aplicativo.
                </p>

                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-primary"
                >
                    Abrir indicador em outra aba
                </a>
            </div>
        </section>
    )
}

export default VisualizarIndicador
import { useRef, useState } from 'react'

function Funcionarios() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [setor, setSetor] = useState('')

    const [foto, setFoto] = useState(null)
    const [previewFoto, setPreviewFoto] = useState(null)
    const [erroCamera, setErroCamera] = useState('')

    const [erros, setErros] = useState({})
    const [mensagem, setMensagem] = useState('')

    const videoRef = useRef(null)
    const canvasRef = useRef(null)

    function selecionarFoto(event) {
        const arquivo = event.target.files[0]

        if (arquivo) {
            setFoto(arquivo)
            setPreviewFoto(URL.createObjectURL(arquivo))
            setErroCamera('')
        }
    }

    async function abrirCamera() {
        try {
            setErroCamera('')

            const stream = await navigator.mediaDevices.getUserMedia({
                video: true
            })

            videoRef.current.srcObject = stream
        } catch (erro) {
            setErroCamera(
                'Não foi possível acessar a câmera. Verifique a permissão ou selecione uma imagem do computador.'
            )
        }
    }

    function capturarFoto() {
        const video = videoRef.current
        const canvas = canvasRef.current

        if (!video.videoWidth) {
            setErroCamera('Abra a câmera antes de capturar a foto.')
            return
        }

        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        const contexto = canvas.getContext('2d')

        contexto.drawImage(
            video,
            0,
            0,
            canvas.width,
            canvas.height
        )

        const imagem = canvas.toDataURL('image/jpeg')

        setPreviewFoto(imagem)
    }

    function salvar(event) {
        event.preventDefault()

        const novosErros = {}

        if (nome.trim() === '') {
            novosErros.nome = 'Informe o nome'
        }

        if (email.trim() === '') {
            novosErros.email = 'Informe o e-mail'
        }

        if (telefone.trim() === '') {
            novosErros.telefone = 'Informe o telefone'
        }

        if (setor === '') {
            novosErros.setor = 'Selecione o setor'
        }

        if (!previewFoto) {
            novosErros.foto = 'Selecione ou capture uma foto'
        }

        setErros(novosErros)

        if (Object.keys(novosErros).length > 0) {
            setMensagem('')
            return
        }

        setMensagem('Funcionário cadastrado com sucesso!')
    }

    return (
        <section className="p-4">

            <h2 className="mb-4">
                Cadastro de Funcionário
            </h2>

            {mensagem && (
                <div className="alert alert-success">
                    {mensagem}
                </div>
            )}

            {erroCamera && (
                <div className="alert alert-warning">
                    {erroCamera}
                </div>
            )}

            <form onSubmit={salvar}>

                <div className="row">

                    <div className="col-md-7">

                        <div className="mb-3">
                            <label className="form-label">
                                Nome
                            </label>

                            <input
                                type="text"
                                className={`form-control ${
                                    erros.nome ? 'is-invalid' : ''
                                }`}
                                value={nome}
                                onChange={(e) =>
                                    setNome(e.target.value)
                                }
                            />

                            {erros.nome && (
                                <div className="invalid-feedback">
                                    {erros.nome}
                                </div>
                            )}
                        </div>


                        <div className="mb-3">
                            <label className="form-label">
                                E-mail
                            </label>

                            <input
                                type="email"
                                className={`form-control ${
                                    erros.email ? 'is-invalid' : ''
                                }`}
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                            />

                            {erros.email && (
                                <div className="invalid-feedback">
                                    {erros.email}
                                </div>
                            )}
                        </div>


                        <div className="mb-3">
                            <label className="form-label">
                                Telefone
                            </label>

                            <input
                                type="text"
                                className={`form-control ${
                                    erros.telefone ? 'is-invalid' : ''
                                }`}
                                value={telefone}
                                onChange={(e) =>
                                    setTelefone(e.target.value)
                                }
                            />

                            {erros.telefone && (
                                <div className="invalid-feedback">
                                    {erros.telefone}
                                </div>
                            )}
                        </div>


                        <div className="mb-3">
                            <label className="form-label">
                                Setor
                            </label>

                            <select
                                className={`form-select ${
                                    erros.setor ? 'is-invalid' : ''
                                }`}
                                value={setor}
                                onChange={(e) =>
                                    setSetor(e.target.value)
                                }
                            >
                                <option value="">
                                    Selecione
                                </option>

                                <option value="Administrativo">
                                    Administrativo
                                </option>

                                <option value="Produção">
                                    Produção
                                </option>

                                <option value="Manutenção">
                                    Manutenção
                                </option>

                                <option value="TI">
                                    TI
                                </option>
                            </select>

                            {erros.setor && (
                                <div className="invalid-feedback">
                                    {erros.setor}
                                </div>
                            )}
                        </div>

                    </div>


                    <div className="col-md-5">

                        <label className="form-label">
                            Foto do funcionário
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            className={`form-control mb-3 ${
                                erros.foto ? 'is-invalid' : ''
                            }`}
                            onChange={selecionarFoto}
                        />

                        {erros.foto && (
                            <div className="text-danger small mb-2">
                                {erros.foto}
                            </div>
                        )}


                        {previewFoto && (
                            <img
                                src={previewFoto}
                                alt="Pré-visualização"
                                className="img-thumbnail mb-3"
                                style={{
                                    width: '220px',
                                    height: '220px',
                                    objectFit: 'cover'
                                }}
                            />
                        )}


                        <div className="mb-3">

                            <button
                                type="button"
                                className="btn btn-success me-2"
                                onClick={abrirCamera}
                            >
                                Usar câmera
                            </button>

                            <button
                                type="button"
                                className="btn btn-outline-success"
                                onClick={capturarFoto}
                            >
                                Capturar foto
                            </button>

                        </div>


                        <video
                            ref={videoRef}
                            autoPlay
                            className="img-thumbnail mb-3"
                            style={{
                                width: '320px',
                                display: 'block'
                            }}
                        />

                        <canvas
                            ref={canvasRef}
                            style={{ display: 'none' }}
                        />

                    </div>

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

export default Funcionarios
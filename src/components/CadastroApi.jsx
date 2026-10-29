
import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { CADASTROS } from '../config/cadastros'

const nomeItem = (item) =>
  item.NomeSafra ?? item.Nome ?? `#${item.Id}`

const valorInput = (valor, tipo) => {
  if (valor == null) return ''
  if (tipo === 'datetime-local') return String(valor).slice(0, 16)
  if (tipo === 'date') return String(valor).slice(0, 10)
  return String(valor)
}

export default function CadastroApi({ recurso }) {
  const cfg = CADASTROS[recurso]
  const [lista, setLista] = useState([])
  const [opcoes, setOpcoes] = useState({})
  const [form, setForm] = useState({})
  const [idEdicao, setIdEdicao] = useState(null)
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function carregar() {
    setCarregando(true)

    try {
      const dados = await api(recurso)

      if (!Array.isArray(dados)) {
        throw new Error('A API deve retornar uma lista JSON')
      }

      setLista(dados)

      const origens = [
        ...new Set(
          cfg.campos
            .filter(c => c.origem)
            .map(c => c.origem)
        )
      ]

      const pares = await Promise.all(
        origens.map(async origem => [
          origem,
          await api(origem)
        ])
      )

      setOpcoes(Object.fromEntries(pares))
      setErro('')
    } catch (e) {
      setErro(e.message)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    setForm({})
    setIdEdicao(null)
    setLista([])
    setOpcoes({})
    carregar()
  }, [recurso])

  function editar(item) {
    setIdEdicao(item.Id)

    setForm(
      Object.fromEntries(
        cfg.campos.map(c => [
          c.nome,
          valorInput(item[c.nome], c.tipo)
        ])
      )
    )
  }

  async function salvar(event) {
    event.preventDefault()

    try {
      const dados = {}

      for (const campo of cfg.campos) {
        const v = form[campo.nome] ?? ''

        dados[campo.nome] =
          campo.tipo === 'select'
            ? Number(v)
            : campo.tipo === 'number'
              ? Number(v)
              : campo.tipo === 'datetime-local'
                ? `${v}:00`
                : v
      }

      if (
        recurso === 'safras' &&
        dados.DataFim < dados.DataInicio
      ) {
        throw new Error(
          'Data final não pode ser anterior à inicial'
        )
      }

      if (idEdicao === null) {
        await api(recurso, 'POST', dados)
      } else {
        await api(
          recurso,
          'PUT',
          { Id: idEdicao, ...dados },
          idEdicao
        )
      }

      setForm({})
      setIdEdicao(null)
      await carregar()
    } catch (e) {
      setErro(e.message)
    }
  }

  async function excluir(id) {
    if (!window.confirm('Confirma a exclusão?')) return

    try {
      await api(recurso, 'DELETE', null, id)
      await carregar()
    } catch (e) {
      setErro(e.message)
    }
  }

  if (!cfg) return <p>Cadastro desconhecido.</p>

  return (
    <section className="p-4">
      <h2>{cfg.titulo}</h2>

      {erro && (
        <div className="alert alert-danger">
          {erro}
        </div>
      )}

      <form
        className="card card-body mb-3"
        onSubmit={salvar}
      >
        {cfg.campos.map(c => (
          <div key={c.nome} className="mb-3">
            <label className="form-label">
              {c.rotulo}
            </label>

            {c.tipo === 'select' ? (
              <select
                className="form-select"
                required={c.obrigatorio}
                value={form[c.nome] ?? ''}
                onChange={e =>
                  setForm({
                    ...form,
                    [c.nome]: e.target.value
                  })
                }
              >
                <option value="">Selecione...</option>

                {(opcoes[c.origem] ?? []).map(o => (
                  <option key={o.Id} value={o.Id}>
                    {nomeItem(o)}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className="form-control"
                type={c.tipo}
                required={c.obrigatorio}
                step={
                  c.tipo === 'number'
                    ? 'any'
                    : undefined
                }
                value={form[c.nome] ?? ''}
                onChange={e =>
                  setForm({
                    ...form,
                    [c.nome]: e.target.value
                  })
                }
              />
            )}
          </div>
        ))}

        <div>
          <button
            className="btn btn-primary me-2"
            type="submit"
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
                setForm({})
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {carregando && <p>Carregando...</p>}

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              {cfg.campos.map(c => (
                <th key={c.nome}>{c.rotulo}</th>
              ))}
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {lista.map(item => (
              <tr key={item.Id}>
                {cfg.campos.map(c => (
                  <td key={c.nome}>
                    {c.origem
                      ? nomeItem(
                          (opcoes[c.origem] ?? []).find(
                            o => o.Id === item[c.nome]
                          ) ?? { Id: item[c.nome] }
                        )
                      : String(item[c.nome] ?? '')}
                  </td>
                ))}

                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => editar(item)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => excluir(item.Id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}


const BASE = 'http://127.0.0.1:1880'

export const ROTAS = {
  safras: '/api/safras',
  unidades: '/api/unidade',
  unidadesMedida: '/api/unidademedida',
  equipamentos: '/api/equipamentos',
  tiposInformacao: '/api/tipoinformacoes',
  medicoes: '/api/medicao'
}

export async function api(recurso, metodo = 'GET', dados = null, id = null) {
  const rota = ROTAS[recurso]

  if (!rota) {
    throw new Error(`Configure a rota de ${recurso}`)
  }

  const url = BASE + rota + (id == null ? '' : `/${id}`)

  const resposta = await fetch(url, {
    method: metodo,
    headers: dados == null
      ? undefined
      : { 'Content-Type': 'application/json' },
    body: dados == null ? undefined : JSON.stringify(dados)
  })

  if (resposta.status === 204) {
    return null
  }

  const texto = await resposta.text()

  let resultado = null

  try {
    resultado = texto ? JSON.parse(texto) : null
  } catch {
    resultado = texto
  }

  if (!resposta.ok) {
    const mensagem =
      resultado?.erro ||
      resultado?.detalhe ||
      `HTTP ${resposta.status}: ${metodo} ${url}`

    throw new Error(mensagem)
  }

  return resultado
}

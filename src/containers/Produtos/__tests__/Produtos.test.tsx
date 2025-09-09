import { rest } from 'msw'
import { setupServer } from 'msw/node'

import Produtos from '..'
import { renderizaComProvider } from '../../../utils/tests'
import { screen, waitFor } from '@testing-library/react'

const mocks = [
  {
    id: 1,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['Windows'],
    preco: 150.9,
    precoAntigo: 199.9,
    titulo: 'Elden Ring'
  },
  {
    id: 2,
    categoria: 'Corrida',
    imagem: '',
    plataformas: ['Windows', 'PS5', 'Xbox Series X/S'],
    preco: 100,
    precoAntigo: 79.9,
    titulo: 'Carx Drift Online'
  },
  {
    id: 3,
    categoria: 'Corrida',
    imagem: '',
    plataformas: ['Windows', 'PS5', 'Xbox Series X/S'],
    preco: 159.9,
    precoAntigo: 249.9,
    titulo: 'Forza'
  },
  {
    id: 4,
    categoria: 'survivor horror',
    imagem: '',
    plataformas: ['Windows', 'PS5', 'Xbox Series X/S'],
    preco: 99.9,
    precoAntigo: 159.9,
    titulo: 'Resident Evil 3 Remake'
  }
]

const server = setupServer(
  rest.get(
    'http://localhost:4000/produtos',
    (requisicao, resposta, contexto) => {
      return resposta(contexto.json(mocks))
    }
  )
)
describe('Testes para o container de produtos', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('Deve renderizar corretamente', () => {
    renderizaComProvider(<Produtos />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  test('Deve renderizar corretamente com a listagem de jogos', async () => {
    const { debug } = renderizaComProvider(<Produtos />)
    await waitFor(() => {
      debug()
      expect(screen.getByText('Forza')).toBeInTheDocument()
    })
  })
})

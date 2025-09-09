import { screen } from '@testing-library/react'

import Header from '..'
import { renderizaComProvider } from '../../../utils/tests'

describe('Testes para o componente header', () => {
  test('Deve renderizar corretamente', () => {
    renderizaComProvider(<Header />)
    expect(screen.getByText('EBAC Games')).toBeInTheDocument()
  })

  test('Deve renderizar com 2 itens no carrinho', () => {
    renderizaComProvider(<Header />, {
      preloadedState: {
        carrinho: {
          itens: [
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
            }
          ]
        }
      }
    })

    expect(screen.getByTestId('qtd-carrinho').innerHTML).toContain('2 itens')
  })
})

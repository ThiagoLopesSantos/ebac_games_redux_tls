module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
    // Adicione esta linha:
    ['@babel/preset-react', { runtime: 'automatic' }]
  ]
}

const path = require('path');

module.exports = {
  mode: 'development',
  entry: './app.js', // ← usando app.js como ponto de entrada
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/js'), // ← gera bundle aqui
    publicPath: '/js/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, ".", "index.html"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'], // para importar CSS (como Bootstrap)
      },
    ],
  },
};

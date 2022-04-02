module.exports = {
  entry: './src/app/index.js',
  output: {
    path: __dirname + '/src/public',
    filename: 'bundle.js'
  },
  
  module: {
      rules: [
        {
          use: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/
        }
      ]
    }
  
};


//npm install --save-dev @babel/core @babel/preset-env @babel/preset-react
//"presets": ["@babel/preset-env", "@babel/preset-react" ] en .babelrc
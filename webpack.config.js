//var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './app/react/main.jsx',
    output: {
        path: './app/public/js/build',
        filename: 'build.js',
    },
    resolve: {
        alias: {
            'react': 'react-lite',
            'react-dom': 'react-lite'//,
/*
            'css': join(src, 'styles'),
            'containers': join(src, 'containers'),
            'components': join(src, 'components'),
            'utils': join(src, 'utils')*/
        },
        extensions: ['', '.js', '.jsx']
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel', // 'babel-loader' is also a legal name to reference
          query: {
            presets: ['es2015', 'react']
          }
        }
      ]
    }//,
    //externals: [nodeExternals()]
}
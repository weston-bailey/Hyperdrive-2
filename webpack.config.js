// this is the file that defines how webpack behaves
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  // the main index.js file
  entry: "./src/js/main.js",
  // can be changed to production for deploy builds
  mode: "development",
  // where to put the webpacked javascript (inside the ./dist is assumed)
  output: {
    filename: "./public/app.bundle.js" 
  },
  plugins: [
    // html packing plugin
    new HtmlWebpackPlugin({
      hash: true,
      // any values can be injected into the html
      title: "H Y P E R  D R I V E",
      // define the main html file
      template: "./src/index.html",
      // where to put the webpacked html file (./dist is assumed)
      filename: "./index.html" 
    })
  ],
  module: {
    rules: [
      // defines how to use the css webpack modules
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      // defines how to use babel
      {
      // js or jsx 
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { presets: ['@babel/preset-react', '@babel/preset-env'] }
        },
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  }
}
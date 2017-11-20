var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: path.join(__dirname, "javascripts/app/index.js"),
  output: {
    path: path.join(__dirname, "../public/javascripts"),
    filename: "index.js"
  }
}
var sass                = require('node-sass');
var assetsFunctions     = require('node-sass-asset-functions')

assetsFunctions({
    http_fonts_path : "/",
    sourcemap       : true
})

module.exports = assetsFunctions
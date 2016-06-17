var fs = require('fs')
var path = require('path')

var Options = function(configPath) {

    var rawData       = fs.readFileSync(path.join(process.cwd(), configPath), 'utf8');
    var data          = JSON.parse(rawData)
    this.import_paths = data.import_paths
    this.css_dir      = data.css_dir
    this.sass_dir     = data.sass_dir
}

Options.prototype = {

}

module.exports = Options
var sass                = require('node-sass');

var compassFunctions = {}

compassFunctions['font-url($filename, $only-path: false)'] = function(filename, only_path, done) {
    var url = only_path.getValue() ?
        filename.getValue():
        'url(\'' + filename.getValue() + '\')'
    done(new sass.types.String(url))
}

module.exports = compassFunctions
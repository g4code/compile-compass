const Compiler      = require('./compiler')
const File          = require('./file')

var Forker = function(options, files) {

    this.options    = options
    this.files          = files
    this.filesCount = files.length
}

Forker.prototype = {

    fork: function()
    {
        for (var i = 0; i < this.filesCount; i++) {
            setTimeout(this.compile.bind(this, this.files[i]), Math.floor(Math.random() * 1000))
        }
    },

    compile: function(oneFile)
    {
        new Compiler(this.options, new File(oneFile, this.options)).compile()
    },

}

module.exports = Forker
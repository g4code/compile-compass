var Compiler    = require('./compiler')
var evento      = require('evento')
var Filer       = require('./filer')
var File        = require('./file')
var sass        = require('node-sass')
var eol         = require('os').EOL

var App = function(options) {

    //TODO: Drasko - extract to info object
    var sassInfo = sass.info.split(eol)
    evento.trigger('INFORMER|INFO', sassInfo[0]);
    evento.trigger('INFORMER|INFO', sassInfo[1]);

    evento.on('FILER|READ',         this.compile.bind(this))

    this.options    = options
    this.filer      = new Filer(options)
}

App.prototype = {

    compile: function()
    {
        var arrayLength = this.filer.files.length;
        for (var i = 0; i < arrayLength; i++) {
            //TODO: Drasko - change to fork with timeout
            setTimeout(this.compileOne.bind(this, this.filer.files[i]), Math.floor(Math.random() * 1000))
        }
    },

    compileOne: function(oneFile)
    {
        new Compiler(this.options, new File(oneFile, this.options)).compile()
    }
}

module.exports = App
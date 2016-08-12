const Compiler      = require('./compiler')
const File          = require('./file')
const fork          = require('child_process').fork
const evento        = require('evento')

var Forker = function(options, files) {

    this.options    = options
    this.files      = files
    this.filesCount = files.length
}

Forker.prototype = {

    fork: function()
    {
        for (var i = 0; i < this.filesCount; i++) {
            this.compile(this.files[i])
        }
    },

    //TODO change messages
    compile: function(oneFile)
    {
        var workerProcess = fork(__dirname + '/compiler')

        workerProcess.on('message', function(message) {
            evento.trigger(message.code, message.message)
        });

        workerProcess.on('close', function(code) {

        });

        workerProcess.send({
            options: this.options,
            oneFile: oneFile
        })
    },

}

module.exports = Forker
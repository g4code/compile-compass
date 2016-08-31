const Compiler      = require('./compiler')
const File          = require('./file')
const fork          = require('child_process').fork
const evento        = require('evento')
const os            = require('os')

var Forker = function(options, files) {

    var noCups = os.cpus().length

    this.options                = options
    this.files                  = files
    this.maxNumberOfProcesses   = noCups - Math.ceil(noCups * 0.1)
    this.firstRoundFiles        = []
    this.restOfFiles            = this.files.slice(0)

    evento.trigger('INFORMER|INFO', 'Number of files: ' + files.length)
}

Forker.prototype = {

    fork: function()
    {
        this.firstRoundFiles = this.restOfFiles.splice(0, this.maxNumberOfProcesses)

        for (var i = 0; i < this.maxNumberOfProcesses; i++) {
            this.compile(this.firstRoundFiles[i])
        }
    },

    //TODO change messages
    compile: function(oneFile)
    {
        var workerProcess = fork(__dirname + '/compiler')

        workerProcess.on('message', function(message) {
            evento.trigger(message.code, message.message)
        });

        var self = this //TODO: Drasko - change this!
        workerProcess.on('close', function(code) {
            self.restOfFiles.length > 0 && self.next()
        });

        workerProcess.send({
            options: this.options,
            oneFile: oneFile
        })
    },

    next: function()
    {
        var nextFile = this.restOfFiles.splice(0, 1)[0]
        this.compile(nextFile)
    }

}

module.exports = Forker
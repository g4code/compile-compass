var evento  = require('evento')
var gaze    = require('gaze')
var File    = require('./file')

var Watcher = function(options) {

    this.options = options
    this.watcher = null

    evento.trigger('INFORMER|LOADING', 'watching for changes')
    evento.trigger('INFORMER|INFO', 'press Ctrl-C to Stop.')

    gaze(options.sass_dir + '*.scss', this.onWatch.bind(this))
}

Watcher.prototype = {

    onWatch: function(error, watcher)
    {
        this.watcher = watcher
        error ?
            evento.trigger('INFORMER|ERROR', error) :
            this.watcher.on('all', this.onAll.bind(this))
    },

    onAll: function(event, filepath)
    {
        evento.trigger('INFORMER|INFO', event + ' ' + new File(filepath, this.options).getSourceFilename())
    }
}

module.exports = Watcher;
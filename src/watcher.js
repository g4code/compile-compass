const evento    = require('evento')
const gaze      = require('gaze')
const File      = require('./file')
const Filer     = require('./filer')

var Watcher = function(options) {

    this.options = options
    this.pattern = '*.scss'
    this.watcher = null

    evento.trigger('INFORMER|LOADING', 'watching for changes')
    evento.trigger('INFORMER|INFO', 'press Ctrl-C to Stop.')

    evento.on('FILER|READ', this.onFilerRead.bind(this))

    this.filer = new Filer(this.options)
}

Watcher.prototype = {

    onFilerRead: function()
    {
        var patterns = this.filer.dirs.map(function(dir) {
            return dir + '/*.scss'
        })
        gaze(patterns, this.onWatch.bind(this))
    },

    onWatch: function(error, watcher)
    {
        this.watcher = watcher
        if (error) {
            evento.trigger('INFORMER|ERROR', error)
        } else {
            this.watcher.on('all', this.onAll.bind(this))
        }

    },

    onAll: function(event, filepath)
    {
        evento.trigger('INFORMER|INFO', event + ' ' + new File(filepath, this.options).getSourceFilename())
        evento.trigger('WATCHER|CHANGE')
    }
}

module.exports = Watcher;
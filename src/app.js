const Watcher       = require('./watcher')
const evento        = require('evento')
const Filer         = require('./filer')
const sass          = require('node-sass')
const eol           = require('os').EOL
const Stats         = require('./stats')
const process       = require('process')
const Forker        = require('./forker')

var App = function(options) {

    process.on('SIGINT', this.onInterrupt.bind(this))

    //TODO: Drasko - extract to info object
    var sassInfo = sass.info.split(eol)
    evento.trigger('INFORMER|INFO', sassInfo[0]);
    evento.trigger('INFORMER|INFO', sassInfo[1]);

    evento.on('FILER|READ',     this.onFilerRead.bind(this))
    evento.on('WATCHER|CHANGE', this.onWatcherChange.bind(this))
    evento.on('COMPILER|STATS', this.onCompilerStats.bind(this))

    this.options    = options
    this.stats      = new Stats()
    this.filer      = new Filer(this.options, '_*.scss')
}

App.prototype = {

    compile: function(files)
    {
        new Forker(this.options, files).fork()
    },

    onCompilerStats: function(oneStat)
    {
        this.stats.add(oneStat)
    },

    onFilerRead: function()
    {
        evento.off('FILER|READ')
        this.compile(this.filer.files)
        this.options.watch && new Watcher(this.options)
    },

    onInterrupt: function()
    {
        evento.trigger("INFORMER|INFO", 'terminated');
        process.exit();
    },

    onWatcherChange: function(filePath)
    {
        this.compile(this.stats.getEntryFiles(filePath))
    }
}

module.exports = App
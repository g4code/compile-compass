var fs              = require('fs')
var path            = require('path')
var evento          = require('evento')
var process         = require('process')

var configPath      = null
var configDirName   = null

function buildPath(filePath) {

    return path.isAbsolute(filePath) ?
        path.normalize(filePath) :
        path.join(configDirName, filePath)
}

function normalizeConfigPath(filePath) {

    return path.isAbsolute(filePath) ?
        path.normalize(filePath) :
        path.join(process.cwd(), filePath)
}

var Options = function(pathToConfig, watch) {

    if (pathToConfig === undefined || pathToConfig.length === undefined || pathToConfig.length < 1) {
        evento.trigger('INFORMER|ERROR', 'Config must be specified')
        evento.trigger('COMMANDER|HELP')
        process.exit()
    }

    configPath    = normalizeConfigPath(pathToConfig)
    configDirName = path.dirname(configPath)

    var rawData = fs.readFileSync(configPath, 'utf8');
    var data    = JSON.parse(rawData)

    this.watch                  = watch !== undefined && watch
    this.import_paths           = data.import_paths.map(buildPath)
    this.css_dir                = buildPath(data.css_dir)
    this.sass_dir               = buildPath(data.sass_dir)
    this.sprite_load_path       = buildPath(data.sprite_load_path)
    this.generated_images_dir   = buildPath(data.generated_images_dir)
}

Options.prototype = {}

module.exports = Options
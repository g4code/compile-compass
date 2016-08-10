var fs              = require('fs')
var path            = require('path')
var evento          = require('evento')
var process         = require('process')

var configPath      = null
var configDirName   = null

/**
 * @param {string} filePath
 * @returns {string}
 */
function buildPath(filePath) {

    return path.isAbsolute(filePath) ?
        path.normalize(filePath) :
        path.join(configDirName, filePath)
}

/**
 * @param {string} filePath
 * @returns {string}
 */
function normalizeConfigPath(filePath) {

    return path.isAbsolute(filePath) ?
        path.normalize(filePath) :
        path.join(process.cwd(), filePath)
}

/**
 * @param {string} path
 * @returns {boolean}
 */
function isPathValid(path) {

    return path === undefined ||
        path.length === undefined ||
        path.length < 1 ||
        !fs.statSync(path).isFile()
}

/**
 * @param {string} pathToConfig
 * @param {boolean} watch
 * @constructor
 */
var Options = function(pathToConfig, watch) {

    if (isPathValid(pathToConfig)) {
        evento.trigger('INFORMER|ERROR', 'Path to config file is not valid!')
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
    this.sprite_load_path       = data.sprite_load_path === undefined ? null : buildPath(data.sprite_load_path)
    this.generated_images_dir   = data.generated_images_dir === undefined ? null : buildPath(data.generated_images_dir)
}

Options.prototype = {}

module.exports = Options
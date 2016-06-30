var glob            = require('glob')
var twig            = require('twig').twig
var path            = require('path')
var fs              = require('fs')
var Spritesmith     = require('spritesmith')
var templateData    = fs.readFileSync(path.join(__dirname, '..', 'templates/sprites.twig'), 'utf8');

// options is optional
module.exports = function(options) {

    var sprite_load_path        = options.sprite_load_path
    var generatedImagesDir      = options.generated_images_dir
    var generatedSpriteFilename = null
    var doneCallback            = null
    var filePattern             = null
    var generatedSpriteName     = null

    function onReadFiles (error, files) {
        if (error) {
            console.log(error)
        }
        Spritesmith.run({
                src: files,
                algorithm: 'top-down'
            }, onSpritesmith);
    }

    function onSpritesmith (error, result) {
        if (error) {
            console.log(error)
        }
        fs.writeFileSync(path.join(generatedImagesDir, generatedSpriteFilename), result.image)

        var template = twig({
            data: templateData
        })

        var contents = template.render({
            sprite_file_pattern: filePattern,
            sprite_filename: generatedSpriteName,
            sprite_url: generatedSpriteFilename,
        })

        doneCallback({contents: contents})

        //console.log(result.coordinates)
        //console.log(result.properties)
    }

    return function (url, prev, done) {
        if (! /.*\.png$/.test(url)) {
            return done()
        }
        filePattern     = url
        doneCallback        = done
        generatedSpriteName = url.match(/(.*)\/.*\.png$/)[1]
        generatedSpriteFilename = generatedSpriteName + '.png'

        glob(path.join(sprite_load_path, url), onReadFiles)
    }
}
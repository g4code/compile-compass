var glob            = require('glob')
var twig            = require('twig').twig
var path            = require('path')
var fs              = require('fs')
var Spritesmith     = require('spritesmith')
var templateData    = fs.readFileSync(path.join(__dirname, '..', 'templates', 'sprites.twig'), 'utf8')

module.exports = function(options) {

    var sprite_load_path        = options.sprite_load_path
    var generatedImagesDir      = options.generated_images_dir
    var generatedSpriteFilename = null
    var doneCallback            = null
    var filePattern             = null
    var generatedSpriteName     = null
    var imageCoordinates        = null

    function onReadFiles (error, files) {
        if (error) {
            console.log(error)
        }
        Spritesmith.run({
            src: files,
            algorithm: 'top-down',
            algorithmOpts: {
                sort: false
            },
        }, onSpritesmith);
    }

    function onSpritesmith (error, result) {

        if (error) {
            console.log(error)
        }
        imageCoordinates = result.coordinates
        fs.writeFile(path.join(generatedImagesDir, generatedSpriteFilename), result.image, onWriteFile)
    }

    function onWriteFile (error) {

        if (error) {
            console.log(error)
        }

        // prepare images data
        var spriteImages = []
        for (var key in imageCoordinates) {
            var oneSpriteImageData  = imageCoordinates[key]
            oneSpriteImageData.name = path.basename(key, '.png')
            spriteImages.push(oneSpriteImageData)
        }

        // prepare contents
        var contents = twig({data: templateData}).render({
            sprite_file_pattern : filePattern,
            sprite_filename     : generatedSpriteName,
            sprite_url          : generatedSpriteFilename,
            sprite_images       : spriteImages
        })

        // exit and return data
        doneCallback({contents: contents})
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
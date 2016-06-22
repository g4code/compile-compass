

var Stats = function()
{
    this.all = {}
}

Stats.prototype = {

    add: function(oneStat)
    {
        this.all[oneStat.entry] = oneStat
    },

    getEntryFiles: function(filePath)
    {
        var entryFiles  = []
        for (var oneStat in this.all) {
            (this.all[oneStat].includedFiles.indexOf(filePath) > -1) && entryFiles.push(this.all[oneStat].entry)
        }
        return entryFiles
    }
}

module.exports = Stats
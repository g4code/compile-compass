#!/usr/bin/env node

const App           = require("../src/app")
const Options       = require("../src/options");
const commander     = require('commander');
const packageData   = require(__dirname + "/../package.json");
const informer      = require('informer')
const evento        = require('evento')

informer.title(packageData.name)
        .titleColor("grey");

evento.on("INFORMER|ERROR",     informer.error.bind(informer));
evento.on("INFORMER|INFO",      informer.info.bind(informer));
evento.on("INFORMER|LOADING",   informer.loading.bind(informer));
evento.on("INFORMER|SUCCESS",   informer.success.bind(informer));
evento.on("INFORMER|WARNING",   informer.warning.bind(informer));

evento.on("COMMANDER|HELP",     function() {
    commander.outputHelp()
})

commander
    .version(packageData.version)
    .option('-c, --config [path]', 'specify the location of the configuration file explicitly')
    .option('-w, --watch', 'compile sass stylesheets to css when they change')
    .parse(process.argv);

new App(new Options(commander.config, commander.watch))
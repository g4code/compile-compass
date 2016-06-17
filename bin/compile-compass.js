#!/usr/bin/env node

var App         = require("../src/app")
var Options     = require("../src/options");
var commander   = require('commander');
var packageData = require(__dirname + "/../package.json");
var informer    = require('informer')
var evento      = require('evento')

informer.title(packageData.name)
        .titleColor("grey");

evento.on("INFORMER|ERROR",     informer.error.bind(informer));
evento.on("INFORMER|INFO",      informer.info.bind(informer));
evento.on("INFORMER|LOADING",   informer.loading.bind(informer));
evento.on("INFORMER|SUCCESS",   informer.success.bind(informer));
evento.on("INFORMER|WARNING",   informer.warning.bind(informer));

commander
    .version(packageData.version)
    .option('-c, --config [type]', 'specify the location of the configuration file explicitly')
    .parse(process.argv);

new App(new Options(commander.config))
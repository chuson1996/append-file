#!/usr/bin/env node
/**
 * Created by chuso_000 on 1/11/2015.
 */



var fs = require('fs');
var async = require('async');
var path = require('path');


var root = process.cwd();
var destFile = path.resolve(root, process.argv[2]);
fs.readFile(destFile, 'utf8', function (err, data) {
    if (err) return console.error(err);
    replaceContent(data);
});


function replaceContent(dest){
    dest.match(/\/\*<([a-zA-Z0-9\._//]+)>\*\/(.|[\r\n\t\s])+?\/\*<\/\1>\*\//g).forEach(function (pair) {
        var start = pair.match(/\/\*<([a-zA-Z0-9\._//]+)>\*\//)[0];
        console.log(start);

        var end = pair.match(/\/\*<\/([a-zA-Z0-9\._//]+)>\*\//)[0];
        console.log(end);
        var file = path.resolve(path.dirname(destFile), end.replace('/*</','').replace('>*/',''));
        //console.log(dest.indexOf(start));
        //console.log(dest.indexOf(end));
        //console.log(file);

        var indent = dest.match(/(\s+)(?=\/\*<([a-zA-Z0-9\._//]+)>\*\/)/gm)[0].replace(/[\n\r]/g,'');
        async.waterfall([
            function findAndReadSourceFile(cb) {
                fs.readFile(file, 'utf8', function (err, sou) {
                    if (err) return cb(err);
                    sou = sou.split('\n').map(function (line) {
                        return indent+line;
                    }).join('\n');

                    cb(null, sou);
                })
            },
            function writeContentToFile(sou, cb) {
                //start+"\r\n"+sou
                var newContent = (dest.replace(dest.substring(dest.indexOf(start), dest.indexOf(end)), start+"\r\n"+sou+"\r\n"+indent));
                fs.writeFile(destFile, newContent, "utf8", function (err) {
                    if (err) return cb(err);
                });
                cb(null);
            }
        ], function (err, result) {
            if (err) return console.error(err);
        })
    });
}
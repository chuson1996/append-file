/**
 * Created by chuso_000 on 1/11/2015.
 */
var fs = require('fs');
var async = require('async');

/* Read sou and dest file */

//var souFile = process.argv[2];
var destFile = process.argv[2];
//async.series({
//    sou: function (cb) {
//        fs.readFile(souFile, 'utf8', function (err, data) {
//            if (err) return cb(err);
//            cb(null, data);
//        })
//    },
//    dest: function (cb) {
//        fs.readFile(destFile, 'utf8', function (err, data) {
//            if (err) return cb(err);
//            cb(null, data);
//        })
//    }
//
//}, function (err, results) {
//    if (err) return console.error(err);
//    replaceContent(results.sou, results.dest);
//});
fs.readFile(destFile, 'utf8', function (err, data) {
    if (err) return console.error(err);
    replaceContent(data);
});


function replaceContent(dest){
    /* Find markers */
    //console.log(dest.toString("utf8"));
    //console.log(dest.match(/\/\*Append: Start\*\/[.\n\r]+\/\*Append: End\*\//g));
    //console.log(dest.match(/\/\*Append: Start\*\/[.\n\r\t]+/g)[0].length);
    //console.log(dest.search(/\/\*Append: Start\*\//g));
    //console.log(dest.search(/[\t\r\s]+?\/\*Append: End\*\//g));
    //var indent = dest.match(/(\s+)(?=\/\*Append: Start\*\/)/gm)[0];
    //indent = indent.replace(/[\n\r]/g,'');
    ////console.log(indent.search(/[\n\r]/));
    ////console.log('indent:' + indent + '.');
    //sou = sou.split('\n').map(function (line) {
    //    return indent+line;
    //}).join('\n');
    ////console.log(sou);
    //var newContent = (dest.replace(dest.substring(dest.search(/\/\*Append: Start\*\//g), dest.search(/[\t\r\s]+?\/\*Append: End\*\//g)), "/*Append: Start*/\r\n"+sou+""));
    //fs.writeFile(destFile, newContent, "utf8", function (err) {
    //    if (err) console.error(err);
    //});

    dest.match(/\/\*<([a-zA-Z0-9\._]+)>\*\/(.|[\r\n\t\s])+?\/\*<\/\1>\*\//g).forEach(function (pair) {
        var start = pair.match(/\/\*<([a-zA-Z0-9\._]+)>\*\//)[0];
        var end = pair.match(/\/\*<\/([a-zA-Z0-9\._]+)>\*\//)[0];
        var file = pair.match(/[^\/\*<>]+/)[0];
        console.log(dest.indexOf(start));
        console.log(dest.indexOf(end));
        console.log(file);

        var indent = dest.match(/(\s+)(?=\/\*<([a-zA-Z0-9\._]+)>\*\/)/gm)[0].replace(/[\n\r]/g,'');
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
    //console.log(>-1);
    //console.log(dest.search(/\/\*<\/([a-zA-Z0-9\._]+)>\*\//)>-1);
}
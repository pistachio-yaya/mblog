var express = require('express');
var router = express.Router();

var fs = require('fs');
var marked = require('marked');

var artPath = 'article';

router.get('/*', function(req, res, next) {
    var artNameEncode = req._parsedUrl.pathname;
    var articleName = decodeURI(artNameEncode);
    fs.readFile(artPath+articleName, function(err, data) {
        var dataStr;
        var content;
        var attr;
        if(err) {
            console.log(err);
        }else {
            dataStr = data.toString();
            attr = getVarFromMd(dataStr);
            dataNohead = mdDelHead(dataStr);
            content = marked(dataNohead);
            content = compilePre(content);
            res.render('article', {
                title: attr.title,
                content: content,
                art_attr: attr
            })
        }
    })
});

function mdDelHead(string) {
    var regHead = /---[\s\S]+?---/;
    return string.replace(regHead, '');
}
function compilePre(strHTML) {
    var codeReg = /<blockquote>([\s\S]*?)<\/blockquote>/g;
    var res = strHTML.replace(codeReg, '<pre><blockquote>$1</blockquote></pre>');
    return res;
}
function getVarFromMd(string) {
    var obj = {};
    var regHead = /---([\s\S]+?)---/;
    var regSplitLine = /[^\r\n]+/g;
    var head = string.match(regHead)[1];
    var lines = head.match(regSplitLine);
    console.log(lines);
    lines.forEach(function(line){
        var param = line.split(':');
        var key = param[0].replace(/(^\s*)|(\s*$)/g,'');
        var value = param[1].replace(/(^\s*)|(\s*$)/g,'');
        obj[key] = value;
    })
    return obj
// return this.replace(/(^\s*)|(\s*$)/g,'');
}

module.exports = router;
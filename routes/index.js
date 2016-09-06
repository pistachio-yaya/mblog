var express = require('express');
var router = express.Router();

var markdown = require('markdown').markdown;
var fs = require('fs');

var artPath = 'article/';

router.get('/',atcList);

function atcList(req, res, next){
    fs.readdir(artPath, function(err,files){
        var list = [];
        var categorys = {};
        console.log('------test-------');
        if(err){
            console.log(err);  
        }else{
            files.forEach(function(fileName){
                var article = {};
                var content = fs.readFileSync(artPath+fileName).toString();
                var con = mdDelHead(content);
                var attr = getVarFromMd(content);
                attr.href = '/'+artPath+fileName;
                var category = attr.category;
                if(categorys[category]) {
                    categorys[category].push(attr);
                }else {
                    categorys[category] = [];
                    categorys[category].push(attr);
                }
                article.content = markdown.toHTML(con);
                article.attr = attr;
                list.push(article);
            });
        }
        res.render('index', {
            title: 'welcomto miao blog',
            list: list,
            categorys: categorys
        });
    });
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
}

function mdDelHead(string) {
    var regHead = /---[\s\S]+?---/;
    return string.replace(regHead, '');
}

module.exports = router;

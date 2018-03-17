#!/usr/bin/env node

'use strict';

const [, , args] = process.argv;

var request = require('request');
var xpath = require('xpath');
var DOMParser = require('xmldom').DOMParser;

const handleHttpResponse = function(error, response, body) {
   //Prepare a parser that will not complain about problems in the html
   let parser = new DOMParser({
       errorHandler:function(level,msg){}
   });

   //create a DOM tree for the html body
   let dom = parser.parseFromString(body);

   //select all title nodes
   let nodes = xpath.select("//title/text()", dom);

   //log the content (text) of the first title - will break if the document does not have a title tag
   console.log(nodes[0].nodeValue);
}

console.log('Scrapping ', args);
request(args, handleHttpResponse);





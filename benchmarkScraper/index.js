/**
 * Created by jakub on 17/02/16.
 */
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

//app.get('/scrape', function(req, res) {


(function() {
    var url = 'http://www.cpubenchmark.net/CPU_mega_page.html';

    request(url, function(error, response, html) {
        // console.log(html);
        console.log("Response:")
        console.log(response.statusCode);

        if (error) {
            console.log("Error: ");
            console.log(error);
        }
        else {
            var $ = cheerio.load(html);
            var cpuTable = $('#cputable').find('> tbody').children("[id^='cpu']");
            console.log("CPU table length: " + cpuTable.length );
            var cpusRaw = [];
            cpuTable.each(function(index, cpuEntry) {
                var cpu = {};
                var entries = $(cpuEntry).children();
                cpu.name = entries.eq(0).text();
                cpu.price = entries.eq(1).text();
                cpu.score = entries.eq(2).text();
                cpu.powerPerf = entries.eq(6).text();
                console.log(cpu.name+ "\t\t" + cpu.price + "\t" + cpu.score);
                cpusRaw.push(cpu);
            });
            fs.writeFile("CPUs.json", JSON.stringify({cpus:cpusRaw}, null, 4), function(err) {
                if (err) {
                    return console.log(err);
                }
            });
        }
    })
})();

app.listen('5000');
console.log('Starting scraper');
exports = module.exports = app;
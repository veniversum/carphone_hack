/**
 * Created by jakub on 17/02/16.
 */
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var _ = require('underscore');
var app = express();

//app.get('/scrape', function(req, res) {

var ignores = [
    "APU",
    "Dual Core",
    "Dual-Core",
    "DualCore",
    "Quad Core",
    "Quad-Core",
    "Triple-Core",
    "Eight-Core",
    "APU with Radeon R3",
    "with AMD Radeon R2 Graphics",
    "with Radeon R5E Graphics",
    "with AMD Radeon R7 Graphics",
    " + AMD Radeon R2 Graphics",
    "Six-Core",
    "Mobile"
];

var manufacturers = ["AMD",
"Intel", "VIA"];

var brandNames = [

    "C7-D",
    "C7-M",
    "C7",
    "Nano X2",
    "Nano",
    "Nehemiah",
    "Eden X2",
    "Eden X4",
    "Esther",
    "QuadCore",
    "Samuel 2",

"Celeron",
    "A10 PRO",
    "A8 PRO",
    "A6 PRO",
    "Sempron",
    "Athlon MP",
    "Athlon Neo X2",
    "Athlon Neo",
    "Athlon 64 X2",
    "Athlon 64",
    "Athlon II X2",
    "Athlon II X3",
    "Athlon II X4",
    "Athlon X2",
    "Athlon X3",
    "Athlon X4",
    "Athlon XP",
    "Athlon",
    "Opteron",
    "Phenom 2 X4",
    "Phenom II X4",
    "Phenom II X620",
    "Phenom II X640",
    "Phenom II X6",
    "Phenom II",
    "Phenom Ultra X4",
    "Phenom X2",
    "Phenom X3",
    "Phenom X4",
    "Phenom",
    "Sempron X2",
    "Sempron",
    "Turion 64 Mobile",
    "Turion II Neo X2",
    "Turion II Neo",
    "Turion II Ultra",
    "Turion II",
    "Turion X2 Dual",
    "Turion X2 Ultra",
    "Turion X2",
    "Turion",
    "Atom",
    "Celeron",
    "Core2 Extreme",
    "Core2 Quad",
    "Core2 Duo",
    "Core2 Solo",
    "Core Solo",
    "Core Duo",
    "Core",
    "Pentium 4 Mobile",
    "Pentium 4 Family",
    "Pentium 4",
    "Pentium 4",
    "Pentium M",
    "Pentium III family",
    "Pentium III",
    "Pentium 5",
    "Pentium Extreme Edition",
    "Pentium",
    "XEON",
    "Xeon"
];


function scrapeData(html, successCallback, errorCallback) {
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
        //console.log(cpu.name+ "\t\t" + cpu.price + "\t" + cpu.score);
        cpusRaw.push(cpu);
    });
    fs.writeFile("CPUs.json", JSON.stringify({cpus:cpusRaw}, null, 4), function(err) {
        if (err && errorCallback) {
            errorCallback(error);
        }
        else if (successCallback) {
            successCallback(cpusRaw);
        }
    });
    return cpusRaw;
};


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
            var cpus = scrapeData(html);
            cpus.forEach(function(cpu) {
                var sliced;
                sliced = discardClockSpeed(cpu.name);
                sliced = removeBuzzwords(sliced);
                cpu.manufacturer = extract(sliced, manufacturers);
                sliced = discard(sliced, manufacturers);
                cpu.series = extract(sliced, brandNames);
                sliced = discard(sliced, brandNames);
                sliced = sliced.replace(/^(-[ ]?M )+/i, 'M ');
                sliced = sliced.replace(/^(-[ ]?S )+/i, 'S ');
                console.log(sliced);
                cpu.model = sliced;
            });

            fs.writeFile("CPUs.json", JSON.stringify({cpus:cpus}, null, 4), function(err) {
                if (err) {
                    conole.log(err);
                }
            });
        }
    })
})();


function discardClockSpeed(cpuName) {
    var pos = cpuName.indexOf("@");
    if (pos >= 0) {
        return cpuName.substring(0, pos).trim();
    }
    else
        return cpuName;
}

function removeBuzzwords(cpuName) {
    var newName = cpuName;
    ignores.forEach(function(buzzword) {
        var pos = cpuName.indexOf(buzzword);
        if (pos >= 0) {
            newName = newName.slice(0, pos).trim() + newName.slice(pos+buzzword.length);
        }
    });
    return newName;
}

function extract(cpuName, fromList) {
    var str = "NA";
    for(var i = 0; i < fromList.length; ++i) {
        if (cpuName.indexOf(fromList[i]) >= 0) {
            str = fromList[i];
            return str;
        }
    }
    return str;
}

function discard(cpuName, fromList) {
    var newName = cpuName;
    for(var i = 0; i < fromList.length; ++i) {
        var m = fromList[i];
        var pos = cpuName.indexOf(m);
        if (pos >= 0) {
            var left = cpuName.slice(0, pos).trim();
            var right = cpuName.slice(pos+m.length).trim();
            newName  = (left + " " + right).trim();
            return newName;
        }
    }
    return newName;
}
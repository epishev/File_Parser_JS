'use strict';

const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
// console.log(process.argv[2]);
var instream = fs.createReadStream(process.argv[2]);
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);

var arr = [],
    parsedDateArr = [],
    placeholder = 'xxxxxxxx',
    counters = [],
    count = 0,
    sum = 0,
    max_tpm = 0,
    percentage = 0,
    resArray = [];

function compareHits(obj1, obj2) {
    return obj2.total_hits - obj1.total_hits;
}

rl.on('line', function(line) {
    arr.push(line);
});

rl.on('close', function() {
    for (var i = 0; i < arr.length; i++) {
        var date  = arr[i].match(/\[(.*)]/),
            resDate = date[1].substring(0,date[1].length - 9),
            path = arr[i].match(/("\D{1,}\s[^\d]*)/),
            obj = {
              date: resDate,
              pathString: path[0]
            };
        parsedDateArr.push(obj);
    }

    var resObj = parsedDateArr.reduce(function(res, obj){
        if (!res[obj.date]) {
        res[obj.date] = {};
    }
    if (res[obj.date][obj.pathString]) {
        res[obj.date][obj.pathString]++;
    } else {
        res[obj.date][obj.pathString] = 1;
    }
    return res;
}, {});

    var resObj2 = parsedDateArr.reduce(function(res, obj){
        if (!res[obj.pathString]) {
            res[obj.pathString] = {};
        }
        if (res[obj.pathString][obj.date]) {
            res[obj.pathString][obj.date]++;
        } else {
            res[obj.pathString][obj.date] = 1;
        }
        return res;
    }, {});

    for (var key in resObj) {
        for (var item in resObj[key]) {
            count += resObj[key][item];
        }
        counters.push(count);
        count = 0;
    };

    var max = counters.reduce(function (p, v) {
        return ( p > v ? p : v );
    });

    console.log("max_tpm_all_transactions = " + max);

    for (var key in resObj2) {
        for(var item in resObj2[key]) {
            if(resObj2[key][item] > max_tpm) {
                max_tpm = resObj2[key][item];
            }
            sum += resObj2[key][item];
        }
        percentage = Math.floor(max_tpm/max*100);
        obj = {
            path: key,
            max_tpm: max_tpm,
            percentage: percentage,
            total_hits: sum
        };
        resArray.push(obj);
        sum = 0;
        max_tpm = 0;
    }
    resArray.sort(compareHits);

    for (var i = 0; i <= 30; i++) {
        console.log("total_hits = " + resArray[i].total_hits + ", " + "percentage = "
                     + resArray[i].percentage + "%, " + "max_tpm = " + resArray[i].max_tpm + ", " + resArray[i].path + placeholder);
    }


});

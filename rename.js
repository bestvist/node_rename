/**
 * Created by Administrator on 2016/12/2.
 */
var fs = require('fs'),
    src = 'src',
    dist = 'dist',
    stat = fs.stat;

var args = process.argv.slice(2),name,index=0;

//show help
if (args.length === 0 || args[0].match('help')) {
    console.log('--help\n\t-n  file name 文件名\n\t-i  file name index 文件索引\n');
}

args.forEach(function (item, _index) {
    if (item.match('-n')) {
        name = args[_index + 1];
    } else if (item.match('-i')) {
        index = args[_index + 1];
    }
});

//read file directors
fs.readdir(src, function (err, files) {
    if (err) {
        console.log(err);
    } else {
        fs.exists(dist, function (exist) {
            if (exist) {
                copy(files);
            } else {
                fs.mkdir(dist, function () {
                    copy(files);
                })
            }
        });
    }

    function copy(_files) {
        //foreach files
        _files.forEach(function (filename) {
            var readStream, writeStream;
            var arr = filename.split('.');
            var oldPath = src + '/' + filename,
                newPath = dist + '/' + name + index + '.' + arr[arr.length - 1];
            stat(oldPath, function (err, file) {
                if (err) {
                    console.log(err);
                } else if (file.isFile()) {
                    //create read stream
                    readStream = fs.createReadStream(oldPath);
                    //create write stream
                    writeStream = fs.createWriteStream(newPath);
                    //pipe copy
                    readStream.pipe(writeStream);
                }
            });
            index++;
        })
    }
});
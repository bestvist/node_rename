/**
 * Created by Administrator on 2016/12/2.
 */
var fs = require("fs"),
    src = 'src',
    dist = 'dist',
    stat = fs.stat;

var arguments = process.argv.slice(2);

//show help
if (arguments.length === 0 || arguments[0].match('help')) {
    console.log('--help\n\t-n  file name 文件名\n\t-i  file name index 文件\n');
}

var name = arguments[0];
var index = arguments[1] || 0;

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
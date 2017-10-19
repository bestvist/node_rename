let fs = require('fs'),
    src = 'src',
    dist = 'dist',
    args = process.argv.slice(2),
    filename = 'image',
    index = 0;

//show help
if (args.length === 0 || args[0].match('--help')) {
    console.log('--help\n \t-src 文件源\n \t-dist 文件目标\n \t-n 文件名\n \t-i 文件名索引\n');
    return false;
}

args.forEach((item, i) => {
    if (item.match('-src')) {
        src = args[i + 1];
    } else if (item.match('-dist')) {
        dist = args[i + 1];
    } else if (item.match('-n')) {
        filename = args[i + 1];
    } else if (item.match('-i')) {
        index = args[i + 1];
    }
});

fs.readdir(src, (err, files) => {
    if (err) {
        console.log(err);
    } else {
        fs.exists(dist, exist => {
            if (exist) {
                copyFile(files, src, dist, filename, index);
            } else {
                fs.mkdir(dist, () => {
                    copyFile(files, src, dist, filename, index);
                })
            }
        });
    }
});

function copyFile(files, src, dist, filename, index) {
    files.forEach(n => {
        let readStream,
            writeStream,
            arr = n.split('.'),
            oldPath = src + '/' + n,
            newPath = dist + '/' + filename + index + '.' + arr[arr.length - 1];
        fs.stat(oldPath, (err, stats) => {
            if (err) {
                console.log(err);
            } else if (stats.isFile()) {
                readStream = fs.createReadStream(oldPath);
                writeStream = fs.createWriteStream(newPath);
                readStream.pipe(writeStream);
            }
        });
        index++;
    })
}


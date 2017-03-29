var fs = require('fs');
var path = require('path');
var glob = require('glob');
var through2 = require('through2');
var vfs = require('vinyl-fs');
// var map = require('map-stream');
// fs.createReadStream('README.md')
//     .pipe(source('README.md'))
//     .pipe(marked())
//     .pipe(gulp.dest('./dist'));
// 

// fs.stat('/Users/caidewu/blog/post/question.md', function(err, stat) {
//     console.log("fs.stat对象方法：\n");
//     console.log("isBlockDevice: " + stat.isBlockDevice());
//     console.log("isCharacterDevice: " + stat.isCharacterDevice());
//     console.log("isFIFO: " + stat.isFIFO());
//     console.log("isSocket: " + stat.isSocket());
// });

/*fs.readdir('./post', function(err, files) {
	files.forEach(function(fileName) {
		var filePath = path.join(__dirname, 'post', fileName);
		// console.log(filePath)
		fs.stat(filePath, function(err, stat) {
			// console.log(Object.prototype.toString.call(stat.birthtime));
			// if (stat.isFile()) {

   //  console.log('=============================================')
			// }
			var ext = path.extname(fileName);

			// if (stat.isDirectory()) {
			// 	console.log('dir:')
			// }
		});
	});
});*/

// options is optional
// glob("./post/**/*.md", function (err, files) {
// 	files.forEach(function(fileName) {
// 		var filePath = path.join(__dirname, fileName);
// 		// console.log(filePath)
// 		fs.stat(filePath, function(err, stat) {
// 			fs.createReadStream(filePath)
// 			.pipe(through2.obj(function(file, enc, cb) {
// 				var prefix = new Buffer(genarateText({
// 					title: path.basename(fileName,'.md'),
// 					date: formatDatetime(stat.birthtime)
// 				}),'utf-8');
// 				file = Buffer.concat([prefix,file]);
// 				console.log(file.toString());
// 				cb(null, file);
// 			}))
// 			.pipe(fs.createWriteStream(path.join('dist', path.relative('post',fileName))));
// 		});
// 	});

// })

// var log = function(file, cb) {
//   console.log(file.path);
//   cb(null, file);
// };

vfs.src('./hexo/source/_posts/*.md')
// .pipe(map(log))
.pipe(through2.obj(function(file, enc, cb) {
	// console.log(file.path);
	fs.stat(file.path, function(err, stat) {
		var prefix = new Buffer(genarateText({
					title: path.basename(file.basename,'.md'),
					date: formatDatetime(stat.birthtime),
					tags: '',
					description: ''
				}),'utf-8');
		file.contents = Buffer.concat([prefix,file.contents]);
		cb(null, file);
	})
}))
.pipe(vfs.dest('./_posts'));


function genarateText(options) {
	if (!options) {
		return '';
	}
	// 2016-12-10 23:57:35
	return `---\ntitle: ${options.title}\ndate: ${options.date}\ntags: ${options.tags}\ndescription: ${options.description}\n\n---\n\n`;
}

function formatDatetime(date, p, isFill) {
        var Y = date.getFullYear(),
            M = date.getMonth() + 1,
            d = date.getDate(),
            h = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds();

        if (isFill) {
            M = (M < 10) ? ('0' + M) : M;
            d = (d < 10) ? ('0' + d) : d;
            h = (h < 10) ? ('0' + h) : h;
            m = (m < 10) ? ('0' + m) : m;
            s = (s < 10) ? ('0' + s) : s;
        }
        p = p || '%Y-%M-%d %h:%m:%s';
        p = p.replace(/%Y/g, Y).replace(/%M/g, M).replace(/%d/g, d).replace(/%h/g, h).replace(/%m/g, m).replace(/%s/g, s);
        return p;

}



const through2 = require('through2');
const vfs = require('vinyl-fs');


// const reg = /(?:"|`)(.*)(团队)(.*)(?:"|`)/;
const patternQuote = /(?:\:\s*)(?:")(.*)(\$\{.*\})(.*)(?:")/g;

// function replace(text, string) {
//   return text.replace(pattern);
// }

vfs.src('/Users/caidewu/project/ones/ones-ai-web/src/js/locale/zh-cn.js')
// .pipe(map(log))
  .pipe(through2.obj(function(file, enc, cb) {
    // console.log(file.path);

      // file.contents = Buffer.concat([prefix,file.contents]);
    let str = file.contents.toString();
    str = str.replace(/团队/g, '${options.TEAM}')
      .replace(/里程碑/g, '${options.MILESTONE}')
      .replace(/任务/g, '${options.TASK}')
      .replace(/项目/g, '${options.PROJECT}')
      .replace(/报表/g, '${options.REPORT}')
      .replace(/智能列表/g, '${options.FILTER}')
      .replace(/优先级/g, '${options.PRIORITY}')
      .replace(patternQuote, ': `$1$2$3`');
    // console.log(str.match(patternQuote))
    file.contents = Buffer(str);
    cb(null, file);

  }))
  .pipe(vfs.dest('./'));


/**


 let defaultOptions = {
  MILESTONE : "里程碑",
  TASK : "任务",
  PROJECT : "项目",
  FILTER : "智能列表",
  TEAM : "团队",
  REPORT : "报表",
  PRIORITY : "优先级",
};
 */
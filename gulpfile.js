/***********************
 * @name JS
 * @author Jo.gel
 * @desc style 格式必须为：<link rel="stylesheet" href="css/style.css?M4bCM"> ，href的路径必须在后面 <link href="css/style.css?M4bCM" rel="stylesheet"> 识别失败，浏览器无法渲染
 * @desc javascript 格式必须为
 * @date 2017/11/1
 ***********************/
var gulp = require('gulp');
var replace = require('gulp-replace');
/*
* @desc 产生随机字符串
* @param {int}
* */
function randomString(len) {
  len = len || 32;
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length;
  var pwd = '';
  for (i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

/**
 * @desc gulp JS任务
 * */
gulp.task('js', function () {
  return gulp.src(['*.html','./**/*.html','./**/**/*.html','./**/**/**/*.html','./**/**/**/**/*.html'])
    .pipe(replace(/\.(js)(.*)\"/g, function (jsFile) {
      console.info('--------普通JS----------')
      console.info(jsFile);
      //如果找到的是jquery的库，则保留
      if (jsFile.indexOf('jquery')>-1|| jsFile.indexOf('plugins')> -1) {
        return jsFile
      } else{
        return  '.js?'+randomString(10)+'"'
      }
    }))

    // css css文件加上10位路径哈希无法识别
    .pipe(replace(/\.css*.+(\")+/g, '.css?' + randomString(10) + '"'))

    //jquery，由于上一个任务带有问号，此处必带问号
    .pipe(replace(/(\")*.jquery.*(\")|(\")*.jquery.*.+(\")/g, function (jquery) {
      console.info('--------Jquery JS----------')
      console.info(jquery)
      // return jquery
      var data = /(\")*.jquery(\S*)(\?)/g.exec(jquery)
      //移除最后一个问号
      if (data) {
        var str = data[0].replace('?', '')
        return str + '"'
      }
      return jquery
    }))


    //plugins ，由于上一个任务带有问号，此处必带问号
    .pipe(replace(/(\")*.plugins.*(\")|(\")*.plugins.*.+(\")/g, function (plugins) {
      console.info('--------Jquery JS----------')
      console.info(plugins)
      // return jquery
      var data = /(\")*.plugins(\S*)(\?)/g.exec(plugins)
      //移除最后一个问号
      if (data) {
        var str = data[0].replace('?', '')
        return str + '"'
      }
      return plugins
    }))

    .pipe(gulp.dest('./'))
});

/**
 * @desc gulp 主任务
 *
 */
gulp.task('default', function () {
  gulp.start(['js']);
});

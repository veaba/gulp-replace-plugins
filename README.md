# gulp-replace-plugins
基于gulp 开发html文件路径哈希值，对于php等模板引擎，非常好用

## usage
①  npm install 安装依赖
```npm
	npm install 
```

②  gulp 任务文件
```npm
	gulp 
```
##　style 文件路径必须为

```html
<link rel="stylesheet" href="css/style.css">
```

如果 为此格式，则会让浏览器无法识别，似乎是gulp 给干掉了：rel="stylesheet
```html
<link href="css/style.css" rel="stylesheet">
```

## html深度设置
```js
gulp.src(['*.html','./**/*.html','./**/**/*.html','./**/**/**/*.html','./**/**/**/**/*.html'])
```

## 支持自定义目录保留不转换功能
比如保留 plugins 、jquery，不加哈希，以下代码是代码保留plugins不加哈希
```js

    //plugins ，由于上一个任务带有问号，此处必带问号
    pipe(replace(/(\")*.plugins.*(\")|(\")*.plugins.*.+(\")/g, function (plugins) {
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

```


## 暂时支持替换在源文件,为此请提前备份项目，防止转换失败
```js
pipe(gulp.dest('./'))
```


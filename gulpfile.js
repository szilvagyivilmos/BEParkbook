var gulp=require('gulp'), nodemon=require('gulp-nodemon')


gulp.task('default', function(){
    nodemon({
        script:'app.js',
        ect:'js',
        env:{
            PORT:8000
        },
        ignore: ['./nodemodules/**']
    }).on('restart', function(){console.log('Resrating')})
})

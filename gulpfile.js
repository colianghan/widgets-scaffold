/**
 * Created by hanguoliang on 2016/12/21.
 *
 */
var gulp = require('gulp');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var del = require('del');
var less = require('gulp-less');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

var SOURCE = 'src',
    DEST = 'build';

var widegts = ['select'];

gulp.task('tpl',() =>{
    return gulp.src(`${SOURCE}/widget/**/*.hbs`)
        .pipe(handlebars())
        .pipe(wrap('Handlebars.widget(<%= contents %>)'))
        .pipe(declare({
            namespace: 'TPL.view',
            noRedeclare: false // Avoid duplicate declarations
        }))
        .pipe(gulp.dest(`${DEST}/widget`));
});

gulp.task('tpl-copy',function(){
    return gulp.src(`${SOURCE}/widget/**/*.js`)
        .pipe(gulp.dest(`${DEST}/widget`));
});

gulp.task('tpl-concat',()=>{
    var result;
    widegts.forEach(function(w){
        result = gulp.src(`${DEST}/widget/${w}/**.js`)
            .pipe(concat('view.js'))
            .pipe(gulp.dest(`${DEST}/widget/${w}/`))
    });
    return result;
});

gulp.task('copy',function(){
    gulp.src(`${SOURCE}/controller/**/**`)
        .pipe(gulp.dest(`${DEST}/controller/`));

    gulp.src(`${SOURCE}/assest/**/**`)
        .pipe(gulp.dest(`${DEST}/assest/`))
});

gulp.task('del',() =>{
    return del(`${DEST}/`);
});

gulp.task('less',()=>{
    return gulp.src([`${SOURCE}/less/mixin/**/**.less`,`${SOURCE}/widget/**/**.less`])
        .pipe(concat('widget.less'))
        .pipe(less())
        .pipe(concat('widget.css'))
        .pipe(gulp.dest(`${DEST}/assest/css`))
});

gulp.task('makeView',(e)=>{

});

gulp.task('serve',()=>{
    return browserSync.init({
        files:[`${DEST}/**/**`],
        server:{
            baseDir:`${DEST}`,
            index:'./controller/index.html',
            routes:{

            }
        }
    },(err,bs)=>{
        if(!err){
            runSequence('watch');
        }
    })
});

gulp.task('watch',()=>{
    gulp.watch(`${SOURCE}/widget/**/*.hbs`,()=>{runSequence('tpl','tpl-copy','tpl-concat')});
    gulp.watch(`${SOURCE}/widget/**/**.js`,()=>{runSequence('tpl-copy','tpl-concat')});
    gulp.watch(`${SOURCE}/widget/**/**.less`,['less']);
});

gulp.task('default',function(cb){
    runSequence('del','copy','less','tpl','tpl-copy','tpl-concat','serve');
});
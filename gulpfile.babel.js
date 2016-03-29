//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import sourcemaps from 'gulp-sourcemaps';
import util from 'gulp-util';


//-------------------------------------------------------------------------------
// Gulp Properties
//-------------------------------------------------------------------------------

const sources = {
    babel: [
        'src/**',
        '!**/tests/**'
    ],
    eslint: [
        '**/*.js',
        '!dist/**',
        '!node_modules/**'
    ]
};


//-------------------------------------------------------------------------------
// Gulp Tasks
//-------------------------------------------------------------------------------

gulp.task('default', ['prod']);

gulp.task('prod', ['babel']);

gulp.task('dev', ['babel', 'lint', 'babel-watch', 'lint-watch']);

gulp.task('babel', () => {
    return gulp.src(sources.babel)
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(babel({
            presets: ['es2015', 'stage-1', 'stage-2']
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'))
        .on('error', function(error) {
            util.log(error);
        });
});

gulp.task('lint', () => {
    return gulp.src(sources.eslint)
        .pipe(eslint())
        .pipe(eslint.formatEach())
        .pipe(eslint.failOnError())
        .on('error', (error) => {
            util.log('Stream Exiting With Error', error);
        });
});

gulp.task('test', ['lint']);


//-------------------------------------------------------------------------------
// Gulp Watchers
//-------------------------------------------------------------------------------

gulp.task('babel-watch', function() {
    gulp.watch(sources.babel, ['babel']);
});

gulp.task('lint-watch', function() {
    const lintAndPrint = eslint();
    lintAndPrint.pipe(eslint.formatEach());

    return gulp.watch(sources.eslint, function(event) {
        if (event.type !== 'deleted') {
            gulp.src(event.path)
                .pipe(lintAndPrint, {end: false})
                .on('error', function(error) {
                    util.log(error);
                });
        }
    });
});

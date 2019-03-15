const gulp = require('gulp')
const ts = require('gulp-typescript')
const clean = require('gulp-clean')

const tsProject = ts.createProject('tsconfig.json')
const distFolder = 'dist'

gulp.task('scripts', () => {
    const tsResult = tsProject.src()
        .pipe(tsProject())

    return tsResult.js
        .pipe(gulp.dest(distFolder))
})

gulp.task('static', () => {
    return gulp
        .src(["src/**/*.json"])
        .pipe(gulp.dest(distFolder))
})

gulp.task('clean', () => {
    return gulp
        .src(distFolder)
        .pipe(clean())
})

gulp.task('build', gulp.series('clean', 'static', 'scripts'))


gulp.task('watch', gulp.series('build', () => {
    return gulp.watch(["src/**/*.ts", "src/**/*.json"], gulp.series('build'))
}))

gulp.task('default', gulp.series('watch'))
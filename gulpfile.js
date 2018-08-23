const   gulp        = require("gulp"),
        sass        = require("gulp-sass"),
        concat      = require("gulp-concat"),
        sourcemaps  = require("gulp-sourcemaps"),
        inject      = require("gulp-inject-string"),
        PluginError = require("plugin-error"),
        remove      = require("gulp-remove-content"),
        merge       = require("merge-stream"),
        sequence    = require("gulp-sequence");


gulp.task("css", function() {
    return gulp.src("src/scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(concat("styles.css"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("build"));
});


gulp.task("generate-level", function() {

    var size, cohesion, steps;
    
    var sizeIndex = process.argv.indexOf("-size");
    var cohesionIndex = process.argv.indexOf("-cohesion");
    var stepsIndex = process.argv.indexOf("-steps");

    if (sizeIndex>-1) {
        size = process.argv[sizeIndex+1];
    }
    else {
        size = 7;
    }

    if (cohesionIndex>-1) {
        cohesion = process.argv[cohesionIndex+1];
    }
    else {
        cohesion = 6;
    }

    if (stepsIndex>-1) {
        steps = process.argv[stepsIndex+1];
    }
    else {
        steps = 42;
    }

    if (!Number.isInteger(+size) 
        || (size<2) 
        || (!Number.isInteger(+cohesion))
        || (cohesion>=size*size)
        || (!Number.isInteger(+steps))
        || (steps < 0)) {
        var err = new PluginError("generate-level", 
                "Use '-size x -cohesion y -steps z' argument, where\n" +
                 "x is number of cells on side of square field, x>=2\n" +
                 "y is maximum cohesion for cell\n" +
                 "z is number of steps to win", { showStack: false});
        throw err;
    }

    var map = generateLevelMap(size, cohesion, steps);

    var html = gulp.src("src/index.html")
        .pipe(inject.after("<!--GENERATE-INPUTS:-->", map.inputs))
        .pipe(inject.after("<!--GENERATE-LABELS:-->", map.labels))
        .pipe(gulp.dest("build"));

    var sizeVariable = gulp.src("src/scss/base/_field-size.scss")
        .pipe(remove( {match: /[\s\S]+/} ))
        .pipe(inject.append( "$field-size: " + size + ";\n" ))
        .pipe(gulp.dest("src/scss/base/"));

    var levelMap = gulp.src("src/scss/base/_level-map.scss")
        .pipe(remove( { match: /[\s\S]+/ }))
        .pipe(inject.append( map.variables ))
        .pipe(gulp.dest("src/scss/base/"));

    return merge(html, sizeVariable, levelMap);
});

function generateLevelMap(size, cohesion, steps) {
    
    function getLinkedCells(id, numberOfCells, cohesion) {
        // this is links of ONE CELL WITH ID
        var links = [];
        var numberOfLinks = Math.floor( Math.random() * (cohesion - 1) + 1 );

        for (let i=0; i<numberOfLinks; i++) {
             do {
                var link = Math.floor( Math.random() * (numberOfCells - 1) + 1 );
            } while ((link == id) || (links.includes(link)));
            links.push(link);
        }

        return links;
    }

    function getEmptyAffectedFromArray(numberOfCells) {
        var affected = [];
        for (let i=0; i<numberOfCells; i++) {
            affected.push(false);
        }
        return affected;
    }

    var cells = [];

    var numberOfCells = size*size;

    for (let i=0; i<numberOfCells; i++) {
        cells.push( {
            checked: true,
            linkedWith: getLinkedCells(i, numberOfCells, cohesion),
            affectedFrom: getEmptyAffectedFromArray(numberOfCells)
        })
    }

    // make some steps and generate the map state!

    var previousStepCell = 0;

    for (let s=1; s<=steps; s++) {

        do {
            var stepCell = Math.floor(Math.random() * (numberOfCells - 1));
        } while (stepCell == previousStepCell);

        cells[stepCell].checked = !cells[stepCell].checked;
        
        // I fought for this code. For the one hour.
        var linkedCells = cells[stepCell].linkedWith;
        for (let i=0; i<linkedCells.length; i++) {
            cells[linkedCells[i]].affectedFrom[stepCell] = !cells[linkedCells[i]].affectedFrom[stepCell];
        }
    }

    // we have array with state now, let's get all........

    var _inputs, _labels, _variables;

    // INPUTS

    var sb = [];
    sb.push("\n");
    for (let i=0; i<numberOfCells; i++) {
        var checkedAttr;
        if (cells[i].checked) {
            checkedAttr = " checked";
        }
        else {
            checkedAttr = "";
        }
        sb.push(
            "<input class=\"hidden\" type=\"checkbox\" id=\"cb",
            i+1,
            "\"",
            checkedAttr,
            ">\n"
        );
    }
    _inputs = sb.join("");

    // LABELS

    sb = [];
    sb.push("\n");
    for (let i=0; i<numberOfCells; i++) {
        sb.push(
            "<label class=\"cell\" for=\"cb",
            i+1,
            "\" id=\"l",
            i+1,
            "\"><span class=\"cell__bg\" id=\"s",
            i+1,
            "\"></span></label>\n"
        )
    }
    _labels = sb.join("");

    sb = [];
    sb.push("$field-size: " + size + ";\n");
    sb.push("$cells-links: ");
    for (let i=0; i<numberOfCells; i++) {
        sb.push("( ")
        for (let u=0; u<cells[i].linkedWith.length; u++) {
            sb.push((cells[i].linkedWith[u]+1).toString());
            sb.push(" ");
        }
        sb.push(")")
    }
    _variables = sb.join("");


    return {
        inputs: _inputs,
        labels: _labels,
        variables: _variables
    }
}

gulp.task("watch", function() {
    gulp.watch("src/scss/**/*.scss", ["css"]);
});

gulp.task("new", sequence("generate-level", "css"));




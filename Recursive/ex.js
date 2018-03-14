function demo(i) {
    if (i == 0) {
        return;
    } else {
        console.log(i--);
        demo(i);
    }

}


//demo(10)

function is_even_recursion(number) {
    if (number < 0) {
        number = Math.abs(number);
    }
    if (number === 0) {
        return true;
    }
    if (number === 1) {
        return false;
    } else {
        number = number - 2;
        return is_even_recursion(number);
    }
}

//console.log(is_even_recursion(400));

//prime number
function isPrime(n, hn) {
    if (hn === 0 || n === 1) {
        return true;
    }
    hn = hn || parseInt(n / 2);
    if (n % hn === 0 && hn !== 1) {
        return false;
    } else {
        return isPrime(n, hn - 1);
    }
};
console.log(isPrime(9));


var walkSync = function(dir, filelist) {
    var path = path || require('path');
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    console.log(files);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {

            filelist = walkSync(path.join(dir, file), filelist);
        } else {
            filelist.push(file);
        }
    });
    return filelist;
};

var path = path || require('path');
var fs = fs || require('fs');


function filewalker(dir, done) {
    let results = [];

    fs.readdir(dir, function(err, list) {
        if (err) return done(err);

        var pending = list.length;

        if (!pending) return done(null, results);

        list.forEach(function(file) {
            file = path.resolve(dir, file);

            fs.stat(file, function(err, stat) {
                // If directory, execute a recursive call
                if (stat && stat.isDirectory()) {
                    // Add directory to array [comment if you need to remove the directories from the array]
                    results.push(file);

                    filewalker(file, function(err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);

                    if (!--pending) done(null, results);
                }
            });
        });
    });
};

// console.log(filewalker("../../AppData", function(err, data) {
//     if (err) throw err;
// }));



function FileSystemObject(_name, _childs) {
    this.name = _name;
    this.childs = _childs || [];
}

function filewalker1(fso) {

    fs.readdirSync(fso.name, function(err, list) {
        if (err) return err;

        var pending = list.length;

        if (!pending) return fso;

        list.forEach(function(file) {
            file = path.resolve(fso.name, file);

            fs.stat(file, function(err, stat) {
                // If directory, execute a recursive call
                if (stat && stat.isDirectory()) {
                    // Add directory to array [comment if you need to remove the directories from the array]
                    let newfso = new FileSystemObject(stat)
                    fso.childs.push(newfso);

                    filewalker1(newfso);
                } else {
                    fso.childs.push(file);
                }
            });
        });
    });
};

// let fso = new FileSystemObject("../../AppData")
// let res1 = filewalker1(fso);
// console.log(res1);


var walkSync2 = function(fso) {
    var fs = fs || require('fs'),
        files = fs.readdirSync(fso.name);

    files.forEach(function(file) {

        if (fs.statSync(fso.name + file).isDirectory()) {
            let newfso = new FileSystemObject(fso.name + file + "/");
            console.log(newfso.name);
            fso.childs.push(newfso);
            walkSync2(newfso);
            //filelist = walkSync(fso.name + file + '/', filelist);
        } else {
            let newfso = new FileSystemObject(file)
            fso.childs.push(newfso);
        }
    });
    return fso;
};

let tesponse = walkSync2(new FileSystemObject("~/../../../Desktop/php/"));
console.log(tesponse);
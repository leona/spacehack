const glob  = require('glob')
const fs    = require('fs');
const path  = require('path')
const beautify = require('js-beautify').js_beautify
var config  = require('../../config.js')
var client  = require('scp2')
var client2 = client.Client
var changes = []
var iteration = 0

client2 = new client2({
    port: 22,
    host: config.deployment.host,
    username: config.deployment.user,
    password: config.deployment.pass
});

glob(config.deployment.project_dir + '**/**/**/**/**/**/***/**/**/**/**', { ignore: config.deployment.ignore }, function(err, files) {
    if (err) return console.log(err)

    if (files == null || files.length < 1) {
        return console.log('No files found. Are you sure you picked the correct directory?')
    }

    files.map(function(file, key) {
        fs.stat(file, function(err, stat) {
            if (err) return console.log(err)

            var timestamp = new Date(stat.mtime).getTime()
            
            if (stat.isFile() && timestamp > config.deployment.last_change) {
                changes.push({
                    path: file,
                    type: 'file'
                })
            }
            iteration++;
            
            if (iteration == files.length) {
                //console.log(changes);
                if (changes.length == 0) {
                    console.log('No changes found')
                } else {
                    push()
                }
            }   
        })
    })
})

function push() {
    config.deployment.last_change = Date.now()

    fs.writeFile('../config.json', beautify(JSON.stringify(config), {
        indent_size: 4
    }), function(err) {
        if (err) return console.log(err)
    })

    forCallback(changes, function(item, next) {
        if (item.type == 'file') {
            //console.log(item.path)
            var remote_push_path = path.dirname(item.path.replace(config.deployment.project_dir, '/'))
            
            if (remote_push_path == '/') remote_push_path = ''

            client2.mkdir(config.deployment.remote_dir + remote_push_path, function(err) {
                if (err) return console.log(err);
                console.log('Created directory: ' + config.deployment.remote_dir + remote_push_path)
                
                client.scp(item.path, {
                    host: config.deployment.host,
                    username: config.deployment.user,
                    password: config.deployment.pass,
                    path: config.deployment.remote_dir + remote_push_path
                }, function(err) {
                    next();
                    
                    if (err) return console.log(err)
                    console.log('Created file: ' + config.deployment.remote_dir + remote_push_path + '/' + path.basename(item.path))
                })
            })
        } else {
            next();
        }
    })
}

function forCallback(arr, next) {
    var iter = 0
    
    next(arr[iter], iteration)
    
    function iteration() {
        iter++
        
        if (typeof arr[iter] !== 'undefined') {
            next(arr[iter], iteration)
        } else {
            client2.close()
        }
    }
}
var fs = require('fs')
if(!fs.existsSync('config')){fs.mkdirSync('config')}
if(!fs.existsSync('appdata')){fs.mkdirSync('appdata')}
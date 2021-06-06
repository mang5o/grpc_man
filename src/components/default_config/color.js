var fs = require('fs')

if(!fs.existsSync('config/colorJson.json')){
    let colorJson = {
        "palette":
            [
                {
                    "name"  :"Original",
                    "left"  :"#56203D",
                    "top"   :"#483A58",
                    "center":"#56638A",
                    "text"  :"#000000",
                    "warn"  :"#444444",
                    "high"  :"#888888",
                    "back"  :"#FFFFFF",
                    "lalpha":0.5,
                    "talpha":0.5
                },
                {
                    "name"  :"Blue",
                    "left"  :"#004E98",
                    "top"   :"#3A6EA5",
                    "center":"#C0C0C0",
                    "text"  :"#000000",
                    "warn"  :"#444444",
                    "high"  :"#888888",
                    "back"  :"#FFFFFF",
                    "lalpha":0.5,
                    "talpha":0.5
                },
                {
                    "name"  :"Light Brown",
                    "left"  :"#E7CFBC",
                    "top"   :"#FFF4EC",
                    "center":"#F2B880",
                    "text"  :"#000000",
                    "warn"  :"#444444",
                    "high"  :"#888888",
                    "back"  :"#FFFFFF",
                    "lalpha":0.5,
                    "talpha":0.5
                }
            ]
    }
    let colorStringify = JSON.stringify(colorJson)
    fs.writeFileSync('config/colorJson.json',colorStringify)
    console.log("File not exists : config/colorJson.json")
    exports.json = colorJson
}else{
    let colorStringify = fs.readFileSync('config/colorJson.json')
    let colorJson = JSON.parse(colorStringify.toString())
    console.log("File exists : config/colorJson.json")
    exports.json = colorJson
}


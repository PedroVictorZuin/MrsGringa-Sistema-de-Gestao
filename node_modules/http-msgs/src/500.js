var contentTypeJSON ={"Content-Type" : "application/json"}
var contentTypeHTML = {"Content-Type" : "text/html"};
/*
    ==================
        500 status
    ==================
*/ 

exports.send500 = function(req, res, err, html="",  resEnd=true){
    // on error
    if(html== ""){
        res.writeHead(500, "Internal error occured", contentTypeJSON);
        res.write(JSON.stringify({"data" : "Internal error occured: " + err}));

    }else{
        res.writeHead(500, "Internal error occured", contentTypeHTML);
        res.write(html);
    }
    if(resEnd){         
        res.end();     
    }
}
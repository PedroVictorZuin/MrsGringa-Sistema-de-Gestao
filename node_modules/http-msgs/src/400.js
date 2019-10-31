
var contentTypeJSON ={"Content-Type" : "application/json"};
var contentTypeHTML = {"Content-Type" : "text/html"};


/*
    ======================
        400  plus status
    ======================
*/
exports.send403 = function(req, res, html = "",  resEnd=true){
    // Requested page not availeble
    if (html == ""){
        res.write(JSON.stringify({"data" : "forbidden"}));
        res.writeHead(403,"Forbidden", contentTypeJSON);
    }else{
        res.write(html);
        res.writeHead(403,"Forbidden", contentTypeHTML);
    }
   
    if(resEnd){         
        res.end();     
    }
}


exports.send404 = function(req, res, html = "",  resEnd=true){
    // Requested page not availeble
    if (html == ""){
        res.writeHead(404,"Resource not found", contentTypeJSON);
        res.write(JSON.stringify({"data" : "Resource not found"}));
    }else{
        res.writeHead(404,"Resource not found", contentTypeHTML);
        res.write(html);
    }

        if(resEnd){         
            res.end();     
        }
}

exports.send405 = function(req, res, html = "",  resEnd=true){
    // Method not supporetd ie. GET, POST others not supported

    if (html == ""){
        res.writeHead(405,"Method not supported", contentTypeJSON);
        res.write(JSON.stringify({"data" : "Method not supported"}));

    }else{
        res.writeHead(405,"Method not supported", contentTypeHTML);
        res.write(html);
    }
    if(resEnd){         
        res.end();     
    }
}

exports.send413 = function(req, res, html = "",  resEnd=true){
    // Requesting for large data, not supported
    if(html == ""){
        res.writeHead(413, "Request too large", contentTypeJSON);
        res.write(JSON.stringify({"data" : "Request too large"}));
    }else{
        res.writeHead(413, "Request too large", contentTypeHTML);
        res.write(html);
    }
    if(resEnd){         
        res.end();
    }
}
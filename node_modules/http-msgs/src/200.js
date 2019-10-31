let contentTypeJSON ={"Content-Type" : "application/json"}
var contentTypeHTML = {"Content-Type" : "text/html"};

/*
    ==================
        200  plus status
    ==================
*/

exports.sendJSON = function(req, res, data, resEnd=true){
    // on succes 
    res.writeHead(200, contentTypeJSON);
    if(data){
        res.write(JSON.stringify(data));
    }
  
    if(resEnd){         
        res.end();     
    }
     

}

exports.sendHTML = function(req, res, html, resEnd=true){
    // on succes 
    res.writeHead(200, contentTypeHTML);
    if(html){
        res.write(html);
    }
  
    if(resEnd){         
        res.end();     
    }
     

}

exports.send200 = function(req, res,  resEnd=true){
    // 200
    res.writeHead(200, contentTypeJSON);
    if(resEnd){         
        res.end();     
    }
}
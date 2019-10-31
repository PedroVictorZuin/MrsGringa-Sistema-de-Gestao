var util = require("util");
var queryString = require("querystring");


var setCookieString = function(req, res, name, value, expires ,maxAge, httponly=true,https=false, SameSite="Strict"){
    if(httponly==true){
        var onlyHTTP = "httponly";
    }else{
        var onlyHTTP = "";
    }
    
    if (https == true){
        return `${name} = ${value};expires=${expires};max-age=${maxAge};${onlyHTTP};SameSite=${SameSite};Secure;`;
    }else{
        return `${name} = ${value};expires=${expires};max-age=${maxAge};${onlyHTTP};SameSite=${SameSite};`;
    }
   
}
exports.setCookieString = setCookieString;

var setCookie = function(req, res, cookieString, data="",  resEnd=true){
    // this sets new cookie 
    res.writeHead(200, {
        'Set-Cookie': cookieString,
        'Content-Type': 'text/plain'
      });
      res.write(data);
      if (resEnd){
        res.end();
      }
}
exports.setCookie = setCookie;


var getCookie = function(req, res, curCookie){
    var cookies = req.headers.cookie;
    if(util.isUndefined(cookies)){
        return  "";
    }else{
        var cookieArray = cookies.split(";");
        for (let index = 0; index < cookieArray.length; index++) {
           
            var curJson = queryString.parse(cookieArray[index]);
            var key = Object.keys(curJson);
            if (key[0].trim() == curCookie){
            return curJson[key[0]];           
                
            }
        }
        
    }

}
exports.getCookie = getCookie;


# http-msgs
Node module to handle to  HTTP status codes

![verson](https://img.shields.io/badge/version-1.0.9-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellowgreen.svg)

This module sets the the http messages for node's http server
it usess `request` and `responce` arguments of`http` 
`resEnd` argument is boolen, by defulat it  is set to true
if set set to true it trigeers `res.end()`. if sets to false, call function has explicitly call `res.end()` to end responce to client application. 

## 200 and plus
```
    httpMsgs.sendJSON(req, res, data, resEnd)
    This  send json object back  after with success 
    data = retun data is in JSON format
    httpMsgs.sendHTML(req, res, html, resEnd)
    this sends the responce in html format
```
```
    httpMsg.send200(req, res, resEnd)
    This send only 200 status but not data returned 
```
## 300  plus
```
    httpMsgs.movedPermently(req, res, url, resEnd)
    moved permentantly
```
```
    httpMsgs.redirectTemporary(req, res, url,  resEnd)
    Temporary redirect
```

```
    httpMsgs.redirectPerment(req, res, url,  resEnd)
    perment redirect
```

## 400 plus
```
    httpMsgs.send405(req, res, html, resEnd)
    
    Method not supporetd i.e request.methods supported
    if html argument is "", then sends the responce in JSON
```
    
```
    httpMsags.send404(req, res, html, resEnd)
    Requested page not availeble
    if html argument is "", then sends the responce in JSON
```
```
    httpMsgs.send413 (req, res, html, resEnd)
    Requesting for large data, not supported.
    if html argument is "", then sends the responce in JSON
```

## 500 plus

```
    httpMsgs.send500(req, res, err, html, resEnd)
    This sends error status with error messages
    err = this contains error message
    if html argument is "", then sends the responce in JSON
```

## cookie
```
    var cookieString =  httpMsgs.setCookieString(req, res, name, value, expires,maxAge, httponly, https=true/false);
    httpMsgs.setCookie(req, res, cookieString, data,  resEnd=true)
    httpMsgs.getCookie(req, res, curCookie);
```
For more extensive study on  read in this link [HTTP status](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

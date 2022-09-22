const http = require('http');
const url = require('url');
const fs = require('fs')

module.exports = {
    Server: class Server {
        constructor(){
            this.middlewares = []
            this.routes = []
        }

        static(dir){
            this.middleware({
                method: 'GET',
                controller: async (req, res, next) => {
                    if(req.url === '/') req.url = '/index'
                    let path = `${__dirname}/${dir}${req.url}`
                    if(!path.includes('.html')) path += '.html'
                    if(fs.existsSync(path)) {
                        const data = fs.readFileSync(path)
                        return res.html(data);
                    }
                }
            })
        }

        middleware(middleware){
            Array.isArray(middleware)
                ? middleware.forEach(item => {
                    this.middlewares.push(item)
                })
                : this.middlewares.push(middleware)
        }

        route(route){
            if(Array.isArray(route)){
                route.forEach(item => {
                    if(item.middleware){
                        if(Array.isArray(item.middleware)){
                            item.middleware.forEach(middleware => {
                                this.middleware({
                                    url: item.url,
                                    method: item.method,
                                    controller: middleware
                                })
                            })
                        }else{
                            this.middleware({
                                url: item.url,
                                method: item.method,
                                controller: item.middleware
                            })
                        }
                    }
                    delete item.middleware
                    this.routes.push(item)
                })
            }else{
                if(route.middleware){
                    if(Array.isArray(route.middleware)){
                        route.middleware.forEach(middleware => {
                            this.middleware({
                                url: route.url,
                                method: route.method,
                                controller: middleware
                            })
                        })
                    }else{
                        this.middleware({
                            url: route.url,
                            method: route.method,
                            controller: route.middleware
                        })
                    }
                }
                delete route.middleware
                this.routes.push(route)
            }
        }

        async listen(port, callback = ()=>{}) {
            this.port = port

            this.server = await http.createServer(async (req, res) => {
                let write = `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <title>Error</title>
                    </head>
                    <body>
                        <pre>Cannot ${req.method} ${req.url}</pre>
                    </body>
                    </html>
                `
                let contentType = 'text/html'
                res.statusCode = 404
                let next = true

                const q = await url.parse(req.url, true)
                req.query = q.query
                req.params = {}

                let data = ''
                for await (const chunk of req) {
                    data += chunk
                }
                data !== '' ? req.body = JSON.parse(data) : req.body = {}

                req.header = header => {
                    return req.headers[header.toLowerCase()]
                }

                res.contentType = newContentType => {
                    contentType = newContentType
                }

                res.json = json => {
                    contentType = 'application/json'
                    write = JSON.stringify(json)
                }

                res.html = html => {
                    contentType = 'text/html'
                    write = html
                }

                res.send = data => {
                    write = data
                }

                this.routes.forEach(({url}) => {
                    if(url.includes(':')){
                        const routeURLParams = url.split('/')
                        const reqURLParams = q.pathname.split('/');

                        if(reqURLParams[1] == routeURLParams[1]){
                            q.pathname = reqURLParams[1]
                            routeURLParams.forEach((param, index) => {
                                if(param.includes(':')){
                                    req.params[param.replace(':', '')] = reqURLParams[index]
                                }else{
                                    if(reqURLParams[index] !== '' && reqURLParams[index] !== q.pathname){
                                        q.pathname += `/${reqURLParams[index]}`
                                    }
                                }
                            })
                        }
                    }
                })

                this.middlewares.forEach(({url, method, controller}) => {
                    if(url){
                        if(url.includes(':')){
                            const routeURLParams = url.split('/')
                            url = routeURLParams[1]
                            routeURLParams.forEach((param, index) => {
                                if(!param.includes(':')){
                                    if(routeURLParams[index] !== '' && routeURLParams[index] !== url){
                                        url += `/${routeURLParams[index]}`
                                    }
                                }
                            })
                        }
                        if(q.pathname === url){
                            if(!method){
                                next = false
                                return controller(req, res, () => {next = true})
                            }else if(req.method === method){
                                next = false
                                return controller(req, res, () => {next = true})
                            }
                        }
                    }
                    if(method && !url){
                        if(req.method === method){
                            next = false
                            return controller(req, res, () => {next = true})
                        }
                    }
                    if(!method && !url) {
                        next = false
                        controller(req, res, () => {next = true})
                    }
                })

                if(next){
                    this.routes.forEach(({url, method, controller}) => {
                        if(url.includes(':')){
                            const routeURLParams = url.split('/')
                            url = routeURLParams[1]
                            routeURLParams.forEach((param, index) => {
                                if(!param.includes(':')){
                                    if(routeURLParams[index] !== '' && routeURLParams[index] !== url){
                                        url += `/${routeURLParams[index]}`
                                    }
                                }
                            })
                        }

                        if(q.pathname === url && req.method === method){
                            controller(req, res)
                        }
                    })
                }

                res.setHeader('Content-Type', contentType);
                res.end(write);
            })

            this.server.listen(port)
            callback()
        }
    }
}
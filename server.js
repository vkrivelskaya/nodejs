const http = require('http');
const { routes } = require('./router');
const url = require("url");

const PORT = 8000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;
    const path = parsedUrl.pathname;
    const method = req.method.toUpperCase();

    let handler = routes[path] && routes[path][method];

    if (!handler) {
        const routeKeys = Object.keys(routes).filter((key) => key.includes(":"));

        const matchedKey = routeKeys.find((key) => {
          const regex = new RegExp(`^${key.replace(/:[^/]+/g, "([^/]+)")}$`);
          return regex.test(path);
        });

        if (matchedKey) {
          const regex = new RegExp(`^${matchedKey.replace(/:[^/]+/g, "([^/]+)")}$`);
          const dynamicParams = regex.exec(path).slice(1);
          const dynamicHandler = routes[matchedKey][method];

          const paramKeys = matchedKey
            .match(/:[^/]+/g)
            .map((key) => key.substring(1));

          const params = dynamicParams.reduce(
            (acc, val, i) => ({ ...acc, [paramKeys[i]]: val }),
            {}
          );

          req.params = params;

          handler = dynamicHandler;
        }
      }

    if (!handler) {
        handler = routes.notFound;
    }

    handler(req, res);
})

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
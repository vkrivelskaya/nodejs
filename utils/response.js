const response = (
    res,
    { data, status, contentType, cacheControl }
  ) => {
    headers = Object.fromEntries(
        Object.entries({
            'Cache-Control': cacheControl,
            'Content-Type': contentType || "application/json",
        }).filter((key, value) => Boolean(value)
    ))

    res.writeHead(status, headers)
    res.write(JSON.stringify(data));
    res.end();
  };

  module.exports = {response};
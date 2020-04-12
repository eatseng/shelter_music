const preflightCors = module.exports = (options) =>
  (req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', options.origin);
      res.setHeader(
        'Access-Control-Allow-Headers',
        'content-type, authorization, content-length, x-requested-with, accept, origin'
      );
      res.setHeader('Access-Control-Allow-Credentials', true);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.send();
    } else {
      next();  
    }
  }
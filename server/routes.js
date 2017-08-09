const isProd = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';
const path = require('path');
const fs = require('fs');
const serverRenderer = require('vue-server-renderer');

const options = isProd? {
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15
    })
  }: undefined;

module.exports = function() {

  const app = this;

  const rendererPath = path.join( app.get('src'), 'compiled-ssr.js' );
  const indexPath = path.join(app.get('public'), 'index.html');
  const indexHTML = fs.readFileSync(indexPath, 'utf8');

  app.get('/*', (req, res) => {

    const code = fs.readFileSync(rendererPath, 'utf8');
    const renderer = serverRenderer.createBundleRenderer(code, options);

    var context = { url: req.url };

    renderer.renderToString(context, (err, html) => {
      if (err) {
        return res.status(200).send('Server Error: server-side rendering is not working');
      }

      const { title, htmlAttrs, bodyAttrs, link, style, script, noscript, meta } = context.meta.inject();

      html = indexHTML
        .replace('<div id="app"></div>', html)
        .replace('"init_state"', JSON.stringify(context.initialState))
        .replace('<title></title>', meta.text() + title.text() + link.text() + style.text() + script.text() + noscript.text());

      return res.status(200).send(html);
    })

  })
};

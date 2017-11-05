const isProd = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';
const path = require('path');
const fs = require('fs');
const { createBundleRenderer } = require('vue-server-renderer')

const cache = isProd ? {
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15
    })
  }: {};

module.exports = function() {

  const app = this;

  const templatePath = path.join(app.get('public'), 'index.html');

  const template = fs.readFileSync(templatePath, 'utf-8')
    .replace(
      '<div id="app"></div>', 
      '<!--vue-ssr-outlet-->'
    );

  const serverBundlePath = path.join( 
    app.get('public'),
    'vue-ssr-server-bundle.json' 
  );

  // const clientManifest = require(path.join( 
  //   app.get('public'),
  //   'vue-ssr-client-manifest.json' 
  // ));

  let renderer = createBundleRenderer(serverBundlePath, Object.assign({}, cache, {
    // recommended for performance
    runInNewContext: false,
    // clientManifest,
    template
  }));

  app.get('/*', (req, res) => {

    if(!isProd) {
      renderer = createBundleRenderer(serverBundlePath, {
        runInNewContext: false,
        // clientManifest,
        template
      });
    }

    var context = { url: req.url };

    renderer.renderToString(context, (err, html) => {
      if (err) {
        console.warn(`Error with SSR`, err)
        return res.status(500).send('Sorry, but there was a problem on the server and this page could not be rendered.');
      }

      const { title, htmlAttrs, bodyAttrs, link, style, script, noscript, meta } = context.meta.inject();

      html = html
        .replace('<title></title>', meta.text() + title.text() + link.text() + style.text() + script.text() + noscript.text());

      return res.status(200).send(html);
    })

  })
};

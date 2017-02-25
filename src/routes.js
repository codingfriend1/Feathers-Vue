const isProd = process.env.NODE_ENV === 'production'
const path = require('path');
const fs = require('fs');
const express = require('express');
const serverRenderer = require('vue-server-renderer')

const options = isProd? {
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15
    })
  }: undefined

module.exports = function() {
  const app = this;

  const indexHTML = fs.readFileSync(path.join(app.get('public'), 'index.html'), 'utf8')
  const adminHTML = fs.readFileSync(path.join(app.get('public'), 'admin.html'), 'utf8')

  app.use('/public', express.static( app.get('public') ) );

  app.get(/^\/admin/, (req, res) => {
    const filePath = path.join( app.get('lib'), 'renderer.js' );
    const code = fs.readFileSync(filePath, 'utf8');
    const renderer = serverRenderer.createBundleRenderer(code, options);

    var context = { url: req.url, admin: true }

    renderer.renderToString(context, (err, html) => {
      if (err) {
        console.log('Error rendering to string: ');
        console.log(err);
        console.log(err.message);
        return res.status(200).send('Server Error');
      }

      html = adminHTML.replace('<div id="app"></div>', html);
      html = html.replace('"init_state"', JSON.stringify(context.initialState));

      const { title, htmlAttrs, bodyAttrs, link, style, script, noscript, meta } = context.meta.inject();

      html = html.replace('<title></title>', meta.text() + title.text() + link.text() + style.text() + script.text() + noscript.text());
      return res.status(200).send(html);
    })
  })

  app.get('/*', (req, res) => {
    const filePath = path.join( app.get('lib'), 'renderer.js' );
    const code = fs.readFileSync(filePath, 'utf8');
    const renderer = serverRenderer.createBundleRenderer(code, options);

    var context = { url: req.url }

    renderer.renderToString(context, (err, html) => {
      if (err) {
        console.log('Error rendering to string: ');
        console.log(err);
        console.log(err.message);
        return res.status(200).send('Server Error');
      }

      html = indexHTML.replace('<div id="app"></div>', html);
      html = html.replace('"init_state"', JSON.stringify(context.initialState));

      const { title, htmlAttrs, bodyAttrs, link, style, script, noscript, meta } = context.meta.inject();

      html = html.replace('<title></title>', meta.text() + title.text() + link.text() + style.text() + script.text() + noscript.text());
      return res.status(200).send(html);
    })
  })
};

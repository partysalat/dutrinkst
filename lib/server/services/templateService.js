'use strict';
import manifest from './../../../target/rev-manifest.json'

import config from "../config"

module.exports.renderHtml = function renderFullPage(stage) {
  let assetsBaseUrl = config.get("assets.baseUrl",stage);
  console.log(assetsBaseUrl)
  return `
    <!doctype html>
    <html lang="de" xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>KlaVeGa</title>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="msapplication-tap-highlight",content="no"/>
      </head>
      <body>
        <div id="root"></div>
        <link rel="stylesheet" href="${assetsBaseUrl}/${manifest.app[1]}"></link>
        <div>FOOOTER</div>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400" rel="stylesheet">
        <script src="${assetsBaseUrl}/${manifest.app[0]}" async defer></script>
        
      </body>
    </html>
    `
}

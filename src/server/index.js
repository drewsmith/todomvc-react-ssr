import express from "express";
import cors from "cors";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";

import serialize from "serialize-javascript";
import routes from "../shared/routes";

import App from "../shared/App";


const app = express();

app.use(cors());
app.use(express.static("public"));

app.get("*", (req, res, next) => {
  const activeRoute = routes.find(route => matchPath(req.url, route));

  const requestInitialData =
    activeRoute.component.requestInitialData &&
    activeRoute.component.requestInitialData();

  Promise.resolve(requestInitialData)
    .then(initialData => {
      const context = { initialData };
      const markup = renderToString(
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      );

      res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>TodoMVC</title>
          <link rel="stylesheet" href="/css/app.css">
          <script src="/bundle.js" defer></script>
          <script>window.__initialData__ = ${serialize(initialData)}</script>
        </head>
        <body>
          ${markup}
        </body>
      </html>
      `);
    })
    .catch(next);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening");
});

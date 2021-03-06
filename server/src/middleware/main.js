import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookiesMiddleware from 'universal-cookie-express';
import path from 'path';
import compression from 'compression';
import helmet from 'helmet';
import robots from 'robots.txt';
import i18nMiddleware from 'i18next-express-middleware';
import i18n from '../i18n/i18n-server';

export default function (app)
{
    app.use((req, res, next) => {
        if (req.protocol === 'http' && req.headers.host.indexOf(':3000') === -1)
        {
            res.redirect(307, `https://${req.headers.host}${req.url}`);
        }
        else
        {
            next();
        }
    });

    const rootPath = path.resolve('public');
    app.use(robots(`${rootPath}/asset/robotstxt/robots.txt`));
    app.use(compression());
    app.use(helmet());
    app.use(i18nMiddleware.handle(i18n));
    app.use(express.static(rootPath));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookiesMiddleware());
    app.use(session({
        secret: 'sessionSecret',
        resave: false,
        saveUninitialized: true,
        httpOnly: true,
        secure: false
    }));

    app.use((req, res, next) =>
    {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        res.header('Cache-Control', 'no-cache');

        if (req.url.indexOf('.js') !== -1)
        {
            res.setHeader('Content-Type', 'application/javascript');
        }

        next();
    });

    app.use((req, res, next) =>
    {
        if (undefined === req.universalCookies.get('iSuntvLive'))
        {
            req.universalCookies.set('iSuntvLive', req.i18n.language);
        }
        else if (req.universalCookies.get('iSuntvLive'))
        {
            req.i18n.language = req.universalCookies.get('iSuntvLive');
        }
        req.i18n.translator.language = req.i18n.language;
        next();
    });

    app.use((req, res, next) =>
    {
        res.result = {
            result: 0,
            errorCode: 0,
            message: '',
            data: {}
        };
        next();
    });

    // webpack HMR
    if (process.env.NODE_ENV === 'development')
    {
        const webpack = require('webpack');
        const config = require('../../../webpack.client.dev.config');
        const compiler = webpack(config);

        /* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
        const webpackDevMiddleware = require('webpack-dev-middleware');
        const webpackHotMiddleware = require('webpack-hot-middleware');
        app.use(webpackDevMiddleware(compiler, {
            noInfo: true, publicPath: config.output.publicPath,
        }));
        app.use(webpackHotMiddleware(compiler));
    }
}

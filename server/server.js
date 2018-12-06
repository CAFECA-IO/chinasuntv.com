import express from 'express';
import fs from 'fs';
import http from 'http';
import https from 'spdy';
import middlewareMain from './src/middleware/main';
import apiRoutes from './src/middleware/routes';
import reactRender from './src/middleware/render';

const app = express();

middlewareMain(app);
reactRender(app);
apiRoutes(app);

// port
const httpPort = process.env.PORT || 80;
const httpsPort = process.env.HTTPS_PORT || 443;

// http
const server = http.createServer(app).listen(httpPort, () => {
    if (process.env.NODE_ENV === 'development')
    {
        server.keepAliveTimeout = 0;
    }
});

if (process.platform === 'linux')
{
    const options = {
        // Private key
        key: fs.readFileSync('/etc/letsencrypt/live/chinasuntv.com/privkey.pem'),

        // Fullchain file or cert file (prefer the former)
        cert: fs.readFileSync('/etc/letsencrypt/live/chinasuntv.com/fullchain.pem'),
    };

    https.createServer(options, app).listen(httpsPort);

    /* eslint no-console: ["error", { allow: ["log"] }] */
    console.log(`https happens on port ${httpsPort}`);
}

// mkfir logs
if (!fs.existsSync('./logs'))
{
    fs.mkdir('./logs', () => {});
}

// mkfir uploads
if (!fs.existsSync('./public/asset/uploads'))
{
    fs.mkdir('./public/asset/uploads', () => {});
}

process.on('uncaughtException', (evt) =>
{
    console.log('uncaughtException: ', evt);
});

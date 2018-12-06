module.exports = {
    /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
    apps: [
        {
            name: 'iSuntvLive',
            script: 'build/server.js',
            log_date_format: 'YYYY-MM-DD',
            watch: [
                'build', 'public', 'locales'
            ],
            env: {
                NODE_ENV: 'production'
            }
        }
    ],

    /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
    deploy: {
        production: {
            user: 'ubuntu',
            key: `${process.env.HOME}/Documents/ssh/chinaiSun.pem`,
            host: '54.65.45.58',
            ref: 'origin/master',
            repo: 'https://white87332@bitbucket.org/tidenet/isuntvlive.git',
            path: '/home/ubuntu/workspace/isuntvlive',
            'post-deploy': '. ~/.profile && yarn && yarn build && sudo pm2 reload /home/ubuntu/workspace/isuntvlive/source/ecosystem.config.js',
        }
    }
};

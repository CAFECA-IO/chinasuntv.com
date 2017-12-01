import fs from 'fs';

export default
{
    init()
    {
        return {
            initExec: false,
            routes: [
                { method: 'get', url: '/sitemap.xml' },
            ]
        };
    },

    exec(req, res)
    {
        let content = fs.readFileSync('./public/asset/sitemap/sitemap.xml', 'utf8');
        res.header('Content-Type', 'application/xml');
        res.send(content);
    }
};

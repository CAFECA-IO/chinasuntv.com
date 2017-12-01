import { Index } from '../routes/containerServer';

if (undefined === global.System.import)
{
    global.System.import = (path) =>
    {
        return Promise.resolve(require(path));
    };
}

export const routes = [
    {
        component: Index,
        path: '/',
        exact: true,
        locales: [
            'common',
            'index',
            'slider'
        ]
    }
];

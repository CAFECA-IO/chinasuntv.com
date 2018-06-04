import { Index } from '../routes/containerServer';
// import * as chinaSuntvAction from '../actions/chinaSuntv';

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
        // loadData: (dispatch, params) => Promise.all([
        //     dispatch(chinaSuntvAction.getChinaSuntv(params))
        // ])
    }
];

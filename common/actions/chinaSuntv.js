import * as types from '../constants/actionTypesChinaSuntv';
import * as ChinaSuntvApi from '../apis/chinaSuntv';


export function getChinaSuntv()
{
    return {
        types: [types.GET_CHINASUNTV_REQ, types.GET_CHINASUNTV_SUC, types.GET_CHINASUNTV_ERR],
        promise: ChinaSuntvApi.getChinaSuntv()
    };
}

export function sendMail(data, callback)
{
    ChinaSuntvApi.sendMail(data, (err, callBackData) =>
    {
        callback(err, callBackData);
    });
}

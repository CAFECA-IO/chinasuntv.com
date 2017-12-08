import update from 'immutability-helper';
import * as types from '../constants/actionTypesChinaSuntv';

const initialItems = {};

export default function getChinaSuntv(state = initialItems, action = {})
{
    switch (action.type)
    {
        case types.GET_CHINASUNTV_SUC:
            return update(state, {
                info: { $set: action.data }
            });
        default:
            return state;
    }
}

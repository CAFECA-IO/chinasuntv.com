import nodexj from 'xls-to-json';

export default
{
    init()
    {
        return {
            initExec: false,
            routes: [
                { method: 'get', url: '/api/chinaSuntv' },
            ]
        };
    },

    exec(req, res)
    {
        nodexj({
            input: './public/asset/chinaSuntv/chinasuntv.xls',  // input xls
            output: null, // output json
        }, (err, result) => {
            let arr = [];
            let message;
            let resultCode;

            if (err)
            {
                message = 'fail parser';
                resultCode = 0;
            }
            else
            {
                message = 'parser xls to json';
                resultCode = 1;

                for (let item in result)
                {
                    let obj = {};
                    Object.keys(result[item]).forEach((key) => {
                        if (key !== '')
                        {
                            obj[key] = result[item][key];
                        }
                    });
                    arr.push(obj);
                }
            }

            res.json({
                result: resultCode,
                message,
                data: arr
            });
        });
    }
};

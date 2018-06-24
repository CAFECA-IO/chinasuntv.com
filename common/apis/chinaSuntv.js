import { get, post } from 'superagent';

export function getChinaSuntv()
{
    return new Promise((resolve, reject) =>
    {
        get(`/api/chinaSuntv?date=${new Date() / 1}`)
            .set('Accept', 'application/json')
            .end((err, res) =>
            {
                if (err || res.status !== 200 || res.body.result !== 1)
                {
                    if (err || res.status !== 200)
                    {
                        reject(new Error(err));
                    }
                    else
                    {
                        reject(res.body);
                    }
                }
                else
                {
                    resolve(res.body);
                }
            });
    });
}

export function sendMail(data, callback)
{
    post('/api/sendMail')
        .set('Accept', 'application/json')
        .send(data)
        .end((err, res) =>
        {
            if (err || res.status !== 200 || res.body.result !== 1)
            {
                if (err || res.status !== 200)
                {
                    callback(true, new Error(err));
                }
                else
                {
                    callback(true, res.body);
                }
            }
            else
            {
                callback(null, res.body);
            }
        });
}

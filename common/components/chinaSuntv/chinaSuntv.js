import React from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import isNode from 'detect-node';

if (!isNode)
{
    require('./chinaSuntv.scss');
}

@translate(['common'], { wait: false })
class ChinaSuntv extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {};
    }

    render()
    {
        return (
            <div className="c_chinaSuntv">
                <video src="https://www.w3schools.com/html/mov_bbb.mp4" />
                <div className="nowPlaying">
                    <div><i className="fa fa-circle" aria-hidden="true" />Now Playing</div>
                    <div>世紀天才</div>
                </div>
                <div className="preNext">
                    <div>
                        <span>00:00</span>
                        <span>01:00</span>
                        <span>02:00</span>
                    </div>
                    <div>
                        <span><i className="fa fa-circle" aria-hidden="true" /></span>
                        <span><i className="fa fa-circle center" aria-hidden="true" /></span>
                        <span><i className="fa fa-circle" aria-hidden="true" /></span>
                    </div>
                    <div className="programTag">
                        <div><span>紀錄片</span></div>
                        <div className="center"><span>人物傳記</span></div>
                        <div><span>歷史人文</span></div>
                    </div>
                    <div className="programName">
                        <span>輝煌中原</span>
                        <span className="center">世紀天才</span>
                        <span>文明的傳承</span>
                    </div>
                </div>
            </div>
        );
    }
}

ChinaSuntv.propTypes = {
    data: PropTypes.object.isRequired
};

export default ChinaSuntv;

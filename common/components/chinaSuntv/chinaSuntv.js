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
        // console.log(document.getElementsByClassName('scroll'));
        return (
            <div className="c_chinaSuntv">
                <video autoPlay src="https://stream.isuntv.com/680k/mid_video_index.m3u8" />
                <div className="nowPlaying">
                    <div>Now Playing</div>
                    <div>世紀天才</div>
                </div>
                <div className="preNext">
                    <div>
                        <span>00:00</span>
                        <span>01:00</span>
                        <span>02:00</span>
                    </div>
                    <div>
                        <div><div /></div>
                        <div><div className="center" /></div>
                        <div><div /></div>
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

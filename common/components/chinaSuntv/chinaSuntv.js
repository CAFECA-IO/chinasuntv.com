import React from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
// import videojs from 'video.js';
import moment from 'moment';
import isNode from 'detect-node';
// import 'videojs-contrib-hls';

if (!isNode)
{
    require('./chinaSuntv.scss');
    // require('video.js/dist/video-js.css');
}

@translate([], { wait: isNode ? false : true })
class ChinaSuntv extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            fade: 'in'
        };
    }

    componentDidMount()
    {
        this.videoPlayer = videojs(this.player);
        this.videoPlayer.src({ src: `https://stream.isuntv.com/680k/mid_video_index.m3u8?date=${new Date() / 1}` });
        setTimeout(() => {
            this.videoPlayer.play();
        }, 50);
    }

    componentWillReceiveProps()
    {
        const { next } = this.props.data.preNowNext;
        const hour = next[0].split(':')[0];

        // 早上九點前，時是一位數，最前面補 0
        if (moment().format('HH:mm:ss') === (hour.length === 1 ? `0${next[0]}:01` : `${next[0]}:01`))
        {
            this.setState(update(this.state, {
                fade: { $set: 'out' }
            }), () => {
                setTimeout(() => {
                    this.setState(update(this.state, {
                        fade: { $set: 'in' }
                    }));
                }, 800);
            });
        }
    }

    render()
    {
        const { pre, now, next } = this.props.data.preNowNext;
        const { fade } = this.state;

        return (
            <div className="c_chinaSuntv">
                <div className="video">
                    <video
                        preload="true"
                        ref={(video) => { this.player = video; }}
                        className="video-js vjs-big-play-centered"
                        controls
                        onContextMenu={(e) => { e.preventDefault(); }}
                    />
                    <div className="paddingBottom" />
                </div>

                <div className="nowPlaying">
                    <div>Now Playing</div>
                    <div className={fade}>{now[2]}</div>
                </div>

                <div className="preNext">
                    <div>
                        <span className={fade}>{pre[0]}</span>
                        <span className={fade}>{now[0]}</span>
                        <span className={fade}>{next[0]}</span>
                    </div>
                    <div>
                        <div><div /></div>
                        <div><div className="center" /></div>
                        <div><div /></div>
                    </div>
                    <div className="programTag">
                        <div><span className={fade}>{pre[1]}</span></div>
                        <div className="center"><span className={fade}>{now[1]}</span></div>
                        <div><span className={fade}>{next[1]}</span></div>
                    </div>
                    <div className="programName">
                        <span className={fade}>{pre[2]}</span>
                        <span className={`center ${fade}`}>{now[2]}</span>
                        <span className={fade}>{next[2]}</span>
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

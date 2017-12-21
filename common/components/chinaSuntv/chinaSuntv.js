import React from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
// import update from 'immutability-helper';
// import equal from 'deep-equal';
import isNode from 'detect-node';

if (!isNode)
{
    require('./chinaSuntv.scss');
}

@translate([], { wait: isNode ? false : true })
class ChinaSuntv extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {};
    }

    componentDidMount()
    {
        this.videoPlayer = videojs(this.player);
        this.videoPlayer.src({ type: 'application/x-mpegURL', src: 'https://stream.isuntv.com/680k/mid_video_index.m3u8' });
        this.videoPlayer.play();
    }

    render()
    {
        const { pre, now, next } = this.props.methods.getPreNowNext();

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
                    <div>{now[2]}</div>
                </div>

                <div className="preNext">
                    <div>
                        <span>{pre[0]}</span>
                        <span>{now[0]}</span>
                        <span>{next[0]}</span>
                    </div>
                    <div>
                        <div><div /></div>
                        <div><div className="center" /></div>
                        <div><div /></div>
                    </div>
                    <div className="programTag">
                        <div><span>{pre[1]}</span></div>
                        <div className="center"><span>{now[1]}</span></div>
                        <div><span>{next[1]}</span></div>
                    </div>
                    <div className="programName">
                        <span>{pre[2]}</span>
                        <span className="center">{now[2]}</span>
                        <span>{next[2]}</span>
                    </div>
                </div>
            </div>
        );
    }
}

ChinaSuntv.propTypes = {
    methods: PropTypes.object.isRequired
};

export default ChinaSuntv;

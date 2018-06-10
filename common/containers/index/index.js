import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import isNode from 'detect-node';
import DocumentMeta from 'react-document-meta';
import update from 'immutability-helper';
// import moment from 'moment';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import ChinaSuntv from '../../components/chinaSuntv/chinaSuntv';
import ProgramList from '../../components/programList/programList';
import Contact from '../../components/contact/contact';
import About from '../../components/about/about';
import { meta as metaObj } from '../../constants/meta';
import * as chinaSuntvAction from '../../actions/chinaSuntv';

if (!isNode)
{
    require('./index.scss');
}

function mapStateToProps(state)
{
    return {
        chinaSuntv: state.chinaSuntv
    };
}

function mapDispatchToProps(dispatch)
{
    return {
        actions: {
            chinaSuntvAction: bindActionCreators(chinaSuntvAction, dispatch)
        }
    };
}


@translate([], { wait: isNode ? false : true })
class Index extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            nowTime: new Date() / 1,
            info: {}
        };
        this.meta = metaObj;
    }

    componentDidMount()
    {
        this.props.actions.chinaSuntvAction.getChinaSuntv();

        setInterval(() => {
            this.setState(update(this.state, {
                nowTime: { $set: new Date() / 1 }
            }));
        }, 1000);

        setInterval(() => {
            this.props.actions.chinaSuntvAction.getChinaSuntv();
        }, 10000);
    }

    // shouldComponentUpdate(nextProps)
    // {
    //     const arr = this.props.chinaSuntv.info.week.length === 0 ? [] : this.getPreNowNext().now;
    //     const hour = moment(new Date(this.state.nowTime)).format('HH');
    //
    //     if (moment(new Date(this.state.nowTime)).format('HH:mm:ss') === (hour.length === 1 ? `0${arr[0]}:00` : `${arr[0]}:00`))
    //     {
    //         return true;
    //     }
    //     else
    //     {
    //         return false;
    //     }
    // }

    getPreNowNext()
    {
        // 找出當天是禮拜幾
        const whichDay = new Date().getDay();
        const { nowTime } = this.state;

        // 減 1 找出在陣列中的 index
        let today = (whichDay === 0) ? 6 : whichDay - 1;
        const { info } = this.props.chinaSuntv;

        // console.log(info, new Date());

        // week:當天日期；weekInfo:當天節目表
        let week = info.week[today];
        let weekInfo = info.weekInfo[week];
        let programPlayed = [];
        let preNowNext = {
            pre: [],
            now: [],
            next: []
        };

        for (let item of weekInfo)
        {
            const content = (
                <div key={item.PlayTime}>
                    <div>{item.PlayTime.split(' ')[1]}</div>
                    <div><div>{item.prgColumn}</div></div>
                    <div>{item.prgName}</div>
                </div>
            );

            // 把已播出的節目存在陣列，即可知前一節目
            if (nowTime > new Date(item.PlayTime) / 1)
            {
                programPlayed.push(content);
            }
        }

        // 前一節目的 index
        const prePlayed = programPlayed.length - 2;

        Object.keys(preNowNext).map((item, index) => {
            let play = prePlayed + index;
            // console.log(play, item);

            // 若是當天最晚節目，要取到隔天的第一筆節目
            if (play === weekInfo.length)
            {
                week = info.week[whichDay];
                weekInfo = info.weekInfo[week];
                play = 0;
            }
            // 若現在時間是當天最早節目，要取到昨天的最後一筆節目
            else if (play === -1)
            {
                week = info.week[whichDay - 1];
                weekInfo = info.weekInfo[week];
                play = weekInfo.length - 1;
            }
            // 若現在時間是還在播前一天最後一個節目
            else if (play === -2)
            {
                week = info.week[whichDay - 2];
                weekInfo = info.weekInfo[week];
                play = weekInfo.length - 2;
            }
            else
            {
                week = info.week[today];
                weekInfo = info.weekInfo[week];
            }

            return preNowNext[item].push(weekInfo[play].PlayTime.split(' ')[1], weekInfo[play].prgColumn, weekInfo[play].prgName);
        });

        return preNowNext;
    }

    render()
    {
        const preNowNext = this.props.chinaSuntv.info.week.length === 0 ? {} : this.getPreNowNext();

        return (
            <div className="co_index">

                {/* meta */}
                <DocumentMeta {...this.meta} />

                <Header />

                <div className="content">
                    <ChinaSuntv data={{ preNowNext }} />

                    <ProgramList data={{ programInfo: this.props.chinaSuntv.info, preNowNext }} />

                    <About />

                    <Contact />
                </div>

                <Footer />

            </div>
        );
    }
}

Index.propTypes = {
    // t: PropTypes.func.isRequired,
    chinaSuntv: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

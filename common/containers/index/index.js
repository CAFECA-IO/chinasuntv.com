import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import isNode from 'detect-node';
import DocumentMeta from 'react-document-meta';
import update from 'immutability-helper';
import moment from 'moment';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import ChinaSuntv from '../../components/chinaSuntv/chinaSuntv';
import ProgramList from '../../components/programList/programList';
import Contact from '../../components/contact/contact';
import About from '../../components/about/about';
import { meta as metaObj } from '../../constants/meta';

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

function mapDispatchToProps()
{
    return {};
}


@translate([], { wait: isNode ? false : true })
class Index extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            nowTime: new Date() / 1
        };
        this.meta = metaObj;
    }

    componentDidMount()
    {
        setInterval(() => {
            this.setState(update(this.state, {
                nowTime: { $set: new Date() / 1 }
            }));
        }, 1000);
    }

    shouldComponentUpdate()
    {
        const arr = this.getPreNowNext().now;
        const hour = arr[0].split(':')[0];

        if (moment(new Date(this.state.nowTime)).format('HH:mm:ss') === (hour.length === 1 ? `0${arr[0]}:00` : `${arr[0]}:00`))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    getPreNowNext()
    {
        let today = (new Date().getDay() === 0) ? 6 : new Date().getDay() - 1;
        const { nowTime } = this.state;

        let week = this.props.chinaSuntv.info.week[today];
        let weekInfo = this.props.chinaSuntv.info.weekInfo[week];
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

            if (nowTime > new Date(item.PlayTime) / 1)
            {
                programPlayed.push(content);
            }
        }

        const prePlayed = programPlayed.length - 2;

        Object.keys(preNowNext).map((item, index) => {
            let play = prePlayed + index;

            // 現在時間若是當天最早節目，要取到昨天的最後一筆節目；若是當天最晚節目，要取到隔天的第一筆節目
            if (play === weekInfo.length)
            {
                play = 0;
                week = this.props.chinaSuntv.info.week[new Date().getDay()];
                weekInfo = this.props.chinaSuntv.info.weekInfo[week];
            }
            else if (play === -1)
            {
                play = weekInfo.length - 1;
                week = this.props.chinaSuntv.info.week[new Date().getDay() - 2];
                weekInfo = this.props.chinaSuntv.info.weekInfo[week];
            }
            return preNowNext[item].push(weekInfo[play].PlayTime.split(' ')[1], weekInfo[play].prgColumn, weekInfo[play].prgName);
        });

        return preNowNext;
    }

    render()
    {
        const preNowNext = this.getPreNowNext();

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
    chinaSuntv: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

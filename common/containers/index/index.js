import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import isNode from 'detect-node';
import DocumentMeta from 'react-document-meta';
import update from 'immutability-helper';
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

    getPreNowNext()
    {
        const { nowTime } = this.state;
        const week = this.props.chinaSuntv.info.week[new Date().getDay() - 1];
        const weeInfo = this.props.chinaSuntv.info.weekInfo[week];
        let programPlayed = [];
        let preNowNext = {
            pre: [],
            now: [],
            next: []
        };

        for (let item of weeInfo)
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
            const play = prePlayed + index;
            return preNowNext[item].push(weeInfo[play].PlayTime.split(' ')[1], weeInfo[play].prgColumn, weeInfo[play].prgName);
        });

        return preNowNext;
    }

    render()
    {
        return (
            <div className="co_index">

                {/* meta */}
                <DocumentMeta {...this.meta} />

                <Header />

                <div className="content">
                    <ChinaSuntv data={this.props.chinaSuntv.info} methods={{ getPreNowNext: ::this.getPreNowNext }} />

                    <ProgramList data={this.props.chinaSuntv.info} />

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

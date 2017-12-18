import React from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import isNode from 'detect-node';
import update from 'immutability-helper';
import moment from 'moment';

if (!isNode)
{
    require('./programList.scss');
}

@translate(['common'], { wait: false })
class ProgramList extends React.Component
{
    constructor(props)
    {
        const day = new Date().getDay();
        super(props);
        this.state = {
            tabs: {
                Mon: day === 1 ? 'active' : '',
                Tue: day === 2 ? 'active' : '',
                Wed: day === 3 ? 'active' : '',
                Thu: day === 4 ? 'active' : '',
                Fri: day === 5 ? 'active' : '',
                Sat: day === 6 ? 'active' : '',
                Sun: day === 0 ? 'active' : ''
            }
        };

        this.day = new Date().toString().slice(0, 3);
        this.selectProgrmaList = this.selectProgrmaList.bind(this);
    }

    componentDidMount()
    {
        const element = document.querySelector('.programContainer');
        element.childNodes[this.nowPlaying].classList.add('scroll');

        const scroll = document.querySelector('.scroll');
        scroll.parentNode.scrollTop = scroll.offsetTop - scroll.parentNode.offsetTop;
    }

    selectProgrmaList(week)
    {
        this.day = week;

        let obj = {
            Mon: '',
            Tue: '',
            Wed: '',
            Thu: '',
            Fri: '',
            Sat: '',
            Sun: ''
        };

        obj[week] += 'active';

        this.setState(update(this.state, {
            tabs: { $set: obj }
        }));
    }

    renderTabs()
    {
        const { tabs } = this.state;
        const { week } = this.props.data;
        let weekTabs = [];

        for (let key in week)
        {
            // 用 api 傳回的年份月份日期陣列，取得日期
            // 用 moment 以日期取得星期幾
            const date = week[key].split('/')[1];
            const weekDate = moment(new Date(week[key])).format('dddd').slice(0, 3);
            let day;

            switch (weekDate)
            {
                case 'Mon':
                    day = '一';
                    break;
                case 'Tue':
                    day = '二';
                    break;
                case 'Wed':
                    day = '三';
                    break;
                case 'Thu':
                    day = '四';
                    break;
                case 'Fri':
                    day = '五';
                    break;
                case 'Sat':
                    day = '六';
                    break;
                case 'Sun':
                    day = '日';
                    break;
                default:
            }
            const content = (
                <div key={key} className={tabs[weekDate]} onClick={() => this.selectProgrmaList(weekDate)}>
                    <div>{date}<span>{day}</span></div>
                </div>
            );

            weekTabs.push(content);
        }

        return (
            <div>
                {weekTabs}
            </div>
        );
    }

    renderProgramLsit()
    {
        const { week, weekInfo } = this.props.data;
        let day;
        let arr;
        switch (this.day)
        {
            case 'Mon':
                day = week[0];
                arr = weekInfo[day];
                break;
            case 'Tue':
                day = week[1];
                arr = weekInfo[day];
                break;
            case 'Wed':
                day = week[2];
                arr = weekInfo[day];
                break;
            case 'Thu':
                day = week[3];
                arr = weekInfo[day];
                break;
            case 'Fri':
                day = week[4];
                arr = weekInfo[day];
                break;
            case 'Sat':
                day = week[5];
                arr = weekInfo[day];
                break;
            case 'Sun':
                day = week[6];
                arr = weekInfo[day];
                break;
            default:
        }

        let programList = [];
        let programPlayed = [];
        for (let item of arr)
        {
            const content = (
                <div key={item.PlayTime}>
                    <div>{item.PlayTime.split(' ')[1]}</div>
                    <div><div>{item.prgColumn}</div></div>
                    <div>{item.prgName}</div>
                </div>
            );

            if (new Date() / 1 > new Date(item.PlayTime) / 1)
            {
                programPlayed.push(content);
            }

            programList.push(content);
        }

        this.nowPlaying = programPlayed.length - 1;

        return (
            <div className="programList">
                <div className="programContainer">
                    {programList}
                </div>
            </div>
        );
    }

    render()
    {
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;

        return (
            <div className="c_programList">
                <div className="date">
                    <div>{`${year}年${month}月`}</div>
                </div>
                <div className="tabs">
                    {this.renderTabs()}
                </div>
                {this.renderProgramLsit()}
            </div>
        );
    }
}

ProgramList.propTypes = {
    data: PropTypes.object.isRequired
};

export default ProgramList;

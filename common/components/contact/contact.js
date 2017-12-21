import React from 'react';
import { translate } from 'react-i18next';
import isNode from 'detect-node';
import update from 'immutability-helper';

if (!isNode)
{
    require('./contact.scss');
}

@translate(['common'], { wait: false })
class Contact extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            name: '',
            phone: '',
            email: '',
            comment: ''
        };
    }

    nameChange(e)
    {
        this.setState(update(this.state, {
            name: { $set: e.target.value }
        }));
    }

    phoneChange(e)
    {
        this.setState(update(this.state, {
            phone: { $set: e.target.value }
        }));
    }

    emailChange(e)
    {
        this.setState(update(this.state, {
            email: { $set: e.target.value }
        }));
    }

    commentChange(e)
    {
        this.setState(update(this.state, {
            comment: { $set: e.target.value }
        }));
    }

    submit()
    {
        if (this.name.value !== '' && this.phone.value !== '' && this.email.value !== '' && this.comment.value !== '')
        {
            // const data = {
            //     name: this.name.value,
            //     phone: this.phone.value,
            //     email: this.email.value,
            //     comment: this.comment.value
            // };

            // console.log(data);

            // 送出之後清空各欄位
            this.setState(update(this.state, {
                name: { $set: '' },
                phone: { $set: '' },
                email: { $set: '' },
                comment: { $set: '' }
            }));
        }
    }

    render()
    {
        const {
            name, phone, email, comment
        } = this.state;

        return (
            <div className="c_contact">
                <div className="title">
                    <div>聯繫我們</div>
                </div>
                <div className="contact">
                    <div className="message">
                        <div className="userInfo">
                            <div>
                                <div>姓名</div>
                                <input value={name} onChange={::this.nameChange} ref={(input) => { this.name = input; }} />
                                <div>電話</div>
                                <input value={phone} onChange={::this.phoneChange} ref={(input) => { this.phone = input; }} />
                                <div>電子郵件</div>
                                <input value={email} onChange={::this.emailChange} ref={(input) => { this.email = input; }} />
                            </div>
                        </div>
                        <div className="userInfoRight">
                            <div className="comment">
                                <div>意見</div>
                                <textarea value={comment} onChange={::this.commentChange} ref={(input) => { this.comment = input; }} />
                            </div>
                            <div className="submit">
                                <button onClick={::this.submit}>送出</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="location">
                    <div>
                        <div>Hong Kong</div>
                        <div>香港</div>
                        <div>
                            <div>T. +852 2526-7818</div>
                            <div>E. info@isuncloud.com</div>
                            <div>A. 柴灣安業街1號 新華豐中心7樓</div>
                        </div>
                    </div>
                    <div>
                        <div>Taipei</div>
                        <div>台北</div>
                        <div>
                            <div>T. +886 2-2700-1979</div>
                            <div>E. info@isuncloud.com</div>
                            <div>A. 台北市大安區敦化南路2段77號21</div>
                        </div>
                    </div>
                    <div>
                        <div>New York</div>
                        <div>紐約</div>
                        <div>
                            <div>T. +1 (855) 593-9675</div>
                            <div>E. info@isuncloud.com</div>
                            <div>A. 222 Broadway New York NY10038</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;

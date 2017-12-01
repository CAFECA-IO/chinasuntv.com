import React from 'react';
import isNode from 'detect-node';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

if (!isNode)
{
    require('./main.scss');
}

class Main extends React.Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {
            fade: 'fade'
        };
    }

    componentDidMount()
    {
        setTimeout(() => {
            const a = document.createElement('link');
            a.rel = 'stylesheet';
            a.href = '/asset/css/font-awesome/fontawesome.min.css';

            const b = document.createElement('link');
            b.rel = 'stylesheet';
            b.href = 'https://fonts.googleapis.com/css?family=Noto+Sans';

            const c = document.createElement('link');
            c.rel = 'stylesheet';
            c.href = 'https://fonts.googleapis.com/css?family=Lato';

            const head = document.getElementsByTagName('head')[0];
            head.appendChild(a, head);
            head.appendChild(b, head);
            head.appendChild(c, head);

            this.setState(update(this.state, {
                fade: { $set: 'fade hide' }
            }));
        }, 10);
    }

    render()
    {
        return (
            <div>
                <div className={this.state.fade} />
                {this.props.children}
            </div>
        );
    }
}

Main.propTypes = {
    children: PropTypes.object.isRequired
};

export default Main;

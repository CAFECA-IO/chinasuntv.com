import React from 'react';
import isNode from 'detect-node';
import PropTypes from 'prop-types';

if (!isNode)
{
    require('./main.scss');
}

class Main extends React.Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {};
    }

    render()
    {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

Main.propTypes = {
    children: PropTypes.object.isRequired
};

export default Main;

import React from 'react';
// import PropTypes from 'prop-types';

import { Icon } from 'semantic-ui-react';

//////////////////////////////////
const PlayerBoxIcon = (props) => {
    return(
      <div>
        <Icon style={{ margin: '0 -.6rem -2.5rem 0'}} name={props.icon[1]} size="large" color={props.icon[3][1]} />
        <Icon name={props.icon[0]} size="huge" color={props.icon[3][0]} />
        <Icon style={{ margin: '0 0 -2.5rem -1rem'}} name={props.icon[2]} size="large" color={props.icon[3][2]} />
      </div>
    );
};/////////////////////////////////

// PlayerBoxIcon.propTypes ={
//   icon: PropTypes.array.isRequired
// };

export default PlayerBoxIcon;
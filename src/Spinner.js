import React from 'react';

const Spinner = props => {
  return (
    <div class="ui active dimmer">
      <div class="ui text loader">{props.message}</div>
    </div>
  )
}

// If we dont provide message prop we have defoault value for it
Spinner.defaultProps = {
  message: 'Loading...'
};

export default Spinner;
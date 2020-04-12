import React from 'react';

import './Avatar.css';

function Avatar(props) {
  return (
    <div className="userAvatar">
      <img
        alt={`${props.title}'s photo`}
        className="userAvatarImage"
        src={props.url}
        width={150} />
    </div>
  );
}

export default Avatar;

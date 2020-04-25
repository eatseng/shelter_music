import React from 'react';

import './Avatar.css';

function Avatar(props) {
  return (
    <div className="userAvatar">
      <div className={props.tooltip != null ? "userName" : "userNameHide"}>
        {props.title}
      </div>
      <img
        alt={`${props.title}`}
        className="userAvatarImage"
        src={props.url}
        width={150} />
    </div>
  );
}

export default Avatar;

import React from 'react';


function VideosListItem (props) {
    return (
    <li className="video-list__item">
        {props.name}
    </li>
    );
}

export default VideosListItem;
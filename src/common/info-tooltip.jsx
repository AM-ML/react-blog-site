import React from 'react';
import {Tooltip} from 'react-tooltip';
import { FaInfoCircle } from 'react-icons/fa';

const Info = ({ desc, id, place="top" }) => {
    return (
        <div style={{ display: 'inline-block' }}>
            <FaInfoCircle data-tooltip-id={id} data-tooltip-content={desc} data-tooltip-place={place} style={{ cursor: 'pointer', color: '#3F507B', fontSize: '24px'}} />
            <Tooltip id={id} />
        </div>
    );
};

export default Info;

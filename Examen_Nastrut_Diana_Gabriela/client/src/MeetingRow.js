import React from 'react';

function MeetingRow(props) {
	return (
		<div className={`card background${props.index % 4 + 1}`}>
			<p>
				<a href={`#/meetings/${props.meeting.id}`}>{props.meeting.description}</a>
			</p>
		</div>		
	);
}

export default MeetingRow;
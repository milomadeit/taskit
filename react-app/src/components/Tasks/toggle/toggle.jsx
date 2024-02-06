import React from 'react';
import './toggle.css'

function Toggle({isChecked, handleToggleCheck}) {



	return (
		<label className='switch'>
			<input type='checkbox' checked={isChecked} onChange={handleToggleCheck} />
			<span className='slider' />
		</label>
	)
}

export default Toggle;
import React, { useState } from 'react';
import TaskCard from '.';
import './TaskCarousel.css'; 

function TaskCarousel({ task_array }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goPrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : task_array.length - 1
        );
    };

    const goNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex < task_array.length - 1 ? prevIndex + 1 : 0
        );
    };

	const curr_task = task_array[currentIndex]
	console.log(curr_task)


    return (
		<div>
			{ task_array.length > 0 ? (
				<div className="carousel-container">
					<button onClick={goPrev}>&lt;</button>
					<div className="carousel-slide">
						<TaskCard curr_task={curr_task} />
					</div>
					<p>{currentIndex + 1} of {task_array.length}</p>
					<button onClick={goNext}>&gt;</button>
				</div>
	
				) : (<div></div>)
			}

		</div>
    );
}

export default TaskCarousel;
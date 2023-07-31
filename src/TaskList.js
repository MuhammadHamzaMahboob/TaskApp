import React from 'react';
import Task from './Task';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './TaskList.css'; // Create a new CSS file for the animations

const TaskList = ({ tasks, onDeleteTask, onToggleTask }) => {
  return (
    <ul>
      <TransitionGroup>
        {tasks.map((task) => (
          <CSSTransition key={task.id} timeout={300} classNames="task-item">
            <Task task={task} onDeleteTask={onDeleteTask} onToggleTask={onToggleTask} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default TaskList;

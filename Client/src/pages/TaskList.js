import React from 'react';
import Task from './Task';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './TaskList.css';

const TaskList = ({ tasks, userGroup, onDeleteTask, onToggleTask }) => {
     const filteredTasks = tasks.filter((task) => task.group === userGroup);

  return (
    <ul>
      <TransitionGroup>
        {filteredTasks.map((task) => (
          <CSSTransition key={task.id} timeout={300} classNames="task-item">
            <Task task={task} onDeleteTask={onDeleteTask} onToggleTask={onToggleTask} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default TaskList;

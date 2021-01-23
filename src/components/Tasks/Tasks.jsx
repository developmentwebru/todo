import React from 'react';
import editSvg from '../../assets/img/edit.svg'
import  {Link} from 'react-router-dom'
import './Tasks.scss'
import axios from "axios";
import AddTasksForm from './AddTasksForm'
import Task from "./Task";

const Tasks = ({
                   list,
                   onEditTitle,
                   onAddTask,
                   onEditTask,
                   onRemoveTask,
                   withoutEmpty,
                   onCompleteTask
}) => {
    const editTitle = () => {
        const newTitle = window.prompt('Название списка', list.name);
        if (newTitle) {
            onEditTitle(list.id, newTitle);
            axios.patch('http://localhost:3001/lists/' + list.id, {
                name: newTitle
            }).catch(() => {
                alert('Не удалось обновить название списка')
            });
        }
    }


    return (

        <div className="tasks">
            <Link to={`/lists/${list.id}`}>
                <h2 style={{color: list.color.hex}} className="tasks__title">
                    {list.name}
                    <img onClick={editTitle} src={editSvg} alt="Edit Icon"/>
                </h2>
            </Link>


            <div className="tasks__items">
                {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
                {list.tasks && list.tasks.map(task => (
                    <Task
                        onEdit={onEditTask}
                        list={list}
                        key={task.id}
                        onRemove={onRemoveTask}
                        onComplete={onCompleteTask}
                        {...task}/>))
                }


                <AddTasksForm key={list.id} list={list} onAddTask={onAddTask}/>
            </div>
        </div>

    )
}

export default Tasks;
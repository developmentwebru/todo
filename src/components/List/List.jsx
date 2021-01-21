import React from "react";
import classNames from 'classnames'
import Badge from "../Badge/Badge";
import './List.scss'
import axios from "axios";
import  removeSvg from '../../assets/img/remove.svg'

const List = ({items, isRemovable, onClick, onRemove, onClickItem, activeItem}) => {
    const removeList =(item) => {
        if (window.confirm('Вы действительно хотите удалить список')) {
         axios.delete('http://localhost:3001/lists/'+item.id).then(() => {
             onRemove(item.id);
         });

        }
    };
    return <ul
        onClick={onClick}
        className="list">
        {items.map((item, index) =>(
            <li
                key={index}
                onClick={onClickItem ? () => onClickItem(item): null}
                className={classNames(item.className, {active: item.active
                        ? item.active
                        : activeItem && activeItem.id === item.id
                })}>

                <i>
                    {item.icon ? item.icon: <Badge color={item.color.name}/>}
                </i>
                <span>{item.name}{item.tasks && item.tasks.length > 0 &&` (${item.tasks.length})`}</span>
                {isRemovable &&
                <img
                    className='list__remove-icon'
                    src={removeSvg}
                    onClick={() => removeList(item)}
                    alt="Remove icon"/>}
            </li> ))
        }
    </ul>
}
export default List;
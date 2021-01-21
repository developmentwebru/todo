import React, {useState, useEffect} from 'react'
import listSvg from "./assets/img/list.svg";
import {List, AddListButton, Tasks} from './components/index'
import axios from "axios";

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);


  useEffect(()=> {
      axios
          .get('http://localhost:3001/lists?_expand=color&_embed=tasks')
          .then(({data}) => {
          setLists(data);
      });
          axios
              .get('http://localhost:3001/colors')
              .then(({data}) => {
                  setColors(data)
      });
  }, []);
const onAddList = (obj) => {
  const newList = [...lists, obj];
  setLists(newList);
};

const onAddTask = (listId, taskObj) => {

    const newList = lists.map(item => {
        if (item.id === listId) {
            item.tasks = [...item.tasks, taskObj]
        }
        return item;
    })
    setLists(newList);
};

    const onEditListTitle =(id, title) => {
        const newList = lists.map(item => {
            if (item.id === id) {
                item.name = title;
            }
            return item;
        });
        setLists(newList);
    }

    return <div className="todo">
    <div className="todo__sidebar">
      <List
          items={[
        {active:true,
            icon: (<img src={listSvg} alt="List icon"/>),
          name: 'Все задачи',

        }]}

      />
        {lists ? (
            <List
                items={lists}
                onRemove={id => {
                    const newLists = lists.filter(item => item.id !== id);
                    setLists(newLists);
                }}
                onClickItem={item => {
                  setActiveItem(item);
                }

                }
                activeItem = {activeItem}
                isRemovable
            />
        ) : (
            'Загрузка...'
        )}
        <AddListButton onAdd={onAddList} colors={colors} />
    </div>
        <div className="todo__tasks">
            {lists && activeItem && <Tasks
                                        onAddTask={onAddTask}
                                        list={activeItem}
                                        onEditTitle={onEditListTitle}
            />}
        </div>
    </div>

}


export default App;

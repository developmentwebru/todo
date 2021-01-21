import React, {useState, useEffect} from 'react';
import List from "../List/List";
import Badge from "../Badge/Badge";
import './addButtonList.scss'
import closeSvg from '../../assets/img/close.svg'
import axios from "axios";

const AddListButton = ({colors, onAdd}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, selectColor] = useState(1);
    const [isLoading, setIdLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (Array.isArray(colors)) {
            selectColor(colors[0].id);
        }
    },[colors]);

    const onClose =() => {
        setVisiblePopup(false);
        setInputValue('');
        selectColor(colors[0].id);
    }

   const addList = () => {
        if (!inputValue) {
            alert('Введить название списка')
            return;
        }
       setIdLoading(true);
        axios
            .post('http://localhost:3001/lists', {
            name: inputValue, colorId: selectedColor})
            .then(({data}) =>{
                const color = colors.filter(c => c.id === selectedColor)[0].name;
                const listObj = {...data, color: {name: color}};
                onAdd(listObj);
                onClose();

        })
            .catch(() => {
                alert('Ошибка при добавлении списка')
            })
            .finally(() => {
            setIdLoading(false);
        })


   }

    return (
        <div className='add-list'>
            <List
                onClick ={ ()=> setVisiblePopup(true)}
                items={[
                {
                    className: "list__add-button",
                    icon: <svg width="12" height="12" viewBox="0 0 16 16" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>,
                    name: 'Добавить список'
                },
            ]}
            />
            {visiblePopup && (
            <div className='add-list__popup'>
                <img
                    onClick={onClose}
                    src={closeSvg} alt="Close button" className="add-list__popup-close-btn"/>
                <input
                    onChange={e => setInputValue(e.target.value)}
                    value={inputValue} className='field' type="text" placeholder="Название списка"/>
                <div className="add-list__popup-colors">


                    {
                        colors.map(color =>(
                            <Badge
                                onClick={() => selectColor(color.id)}
                                key={color.id}
                                color={color.name}
                                className={selectedColor === color.id && 'active' }
                            />
                        ))
                    }
                </div>
                <button onClick={addList}
                        className='button'>
                    {isLoading ? 'Добавление' : 'Добавить' }
                </button>
            </div>)}
        </div>

    );
};

export default AddListButton;
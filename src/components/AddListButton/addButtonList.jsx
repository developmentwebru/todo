import React from 'react';
import List from "./List/List";

const AddListButton = () => {
    return (
        <React.Fragment>
            <List items={[
                {
                    className: "list__add-button",
                    icon: <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>,
                    name: 'Добавить список'},
            ]}
            />
            <div className='add-list-popup'>
                <h1>123</h1>

            </div>
        </React.Fragment>

);
};

export default AddListButton;
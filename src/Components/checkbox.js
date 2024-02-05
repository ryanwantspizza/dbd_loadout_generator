import React from 'react';
import { useRecoilState } from 'recoil';
import { insertData, deleteData } from '../Utilities/indexDb';

function Checkbox({ item, listState, db, id }) {
    const [list, setList] = useRecoilState(listState);
    let targetItem = list.find(i => i.id === item.id);
    let allowed = targetItem.allowed
    const newState = !allowed
    const indexDb = db;

    function handleClickEvent() {
        const updatedItem = {
        ...targetItem,
        allowed: newState
        };
        setList(currentState => {
            const updatedItems = currentState.map(i => (i.id === item.id ? updatedItem : i));
            return updatedItems;
        });

        if (!indexDb) {
            console.log("Db not initialized")
        }
        if (!updatedItem.allowed) {
            insertData(indexDb, `${id}NotAllowed`, updatedItem).then(() => {
                console.log("Data added")
            })
        } else {
            deleteData(indexDb, `${id}NotAllowed`, updatedItem.id).then(() => {
                console.log("Data deleted")
            })
        }
        // Add logic to update parent and children items
    }

    return (
        <div>
            <label>
                <input type="checkbox" id={item.id} checked={allowed} onChange={handleClickEvent} style={{ marginRight: '8px' }}/>
                {item.name}
            </label>
        </div>
    )
}

export { Checkbox };
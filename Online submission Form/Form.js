import React, { useState } from 'react';
import './Form.css';

function Form() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [pin, setPin] = useState('');
    const [data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const missingFields = [];
        if (!name) missingFields.push('Name');
        if (!address) missingFields.push('Address');
        if (!pin) missingFields.push('Pin');

        if (missingFields.length > 0) {
            let message = 'Please fill in the following fields: ';
            if (missingFields.length === 2) {
                message += missingFields.join(' and ');
            } else if (missingFields.length >= 3) {
                const lastField = missingFields.pop();
                message += missingFields.join(', ') + ' and ' + lastField;
            } else {
                message += missingFields[0];
            }
            alert(message);
            return;
        }

        if (isEditing) {
            const updatedData = [...data];
            updatedData[editIndex] = { name, address, pin };
            setData(updatedData);
            setIsEditing(false);
            setEditIndex(null);
        } else {
            setData([...data, { name, address, pin }]);
        }

        setName('');
        setAddress('');
        setPin('');
    };

    const handleEdit = (index) => {
        setName(data[index].name);
        setAddress(data[index].address);
        setPin(data[index].pin);
        setIsEditing(true);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const newData = data.filter((_, i) => i !== index);
        setData(newData);

        if (isEditing) {
            if (editIndex === index) {
                setIsEditing(false);
                setEditIndex(null);
                setName('');
                setAddress('');
                setPin('');
            } else if (editIndex > index) {
                setEditIndex(editIndex - 1);
            }
        }
    };

    return (
        <div className="main">
            <div>
                <div>Name:</div>
                <div>
                    <input
                        className="i1"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <div>Address:</div>
                <div>
                    <input
                        className="i1"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <div>Pin:</div>
                <div>
                    <input
                        className="i1"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <button onClick={handleSubmit}>{isEditing ? 'Update' : 'Submit'}</button>
            </div>
            <table className="table" id="data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Pin</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.name}</td>
                            <td>{entry.address}</td>
                            <td>{entry.pin}</td>
                            <td>
                                <button onClick={() => handleEdit(index)}>Edit</button>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Form;

import React, { useState } from 'react';

const IngredientRow = (props) => {
    const { index, ingredient, isEditing, EditIngredient, SaveIngredient, DeleteIngredient, editingIndex } = props;
    const [editedIngredient, setEditedIngredient] = useState(ingredient);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedIngredient({ ...editedIngredient, [name]: value });
    };

    return (
        <tr className={`whitespace-nowrap ${isEditing ? 'bg-orange-200' : ''}`}>
            <td className="px-6 py-4">
                {isEditing ? (
                    <input
                        type="text"
                        name="name"
                        value={editedIngredient.name}
                        onChange={handleChange}
                        className="text-sm text-gray-900 bg-orange-200 border-b-2 border-orange-500 focus:outline-none font-bold"
                    />
                ) : (
                    <div className="text-sm text-gray-900">{ingredient.name}</div>
                )}
            </td>
            <td className="px-6 py-4">
                {isEditing ? (
                    <input
                        type="number"
                        name="amount"
                        value={editedIngredient.amount}
                        onChange={handleChange}
                        className="text-sm text-gray-900 bg-orange-200 border-b-2 border-orange-500 focus:outline-none  font-bold"
                    />
                ) : (
                    <div className="text-sm text-gray-900">{ingredient.amount}</div>
                )}
            </td>
            <td className="px-6 py-4">
                {isEditing ? (
                    <input
                        type="text"
                        name="unit"
                        value={editedIngredient.unit}
                        onChange={handleChange}
                        className="text-sm text-gray-900 bg-orange-200 border-b-2 border-orange-500 focus:outline-none  font-bold"
                    />
                ) : (
                    <div className="text-sm text-gray-900">{ingredient.unit}</div>
                )}
            </td>
            <td className="px-6 py-4">
                {isEditing ? (
                    <input
                        type="date"
                        name="deadline"
                        value={editedIngredient.deadline}
                        onChange={handleChange}
                        className="text-sm text-gray-900 bg-orange-200 border-b-2 border-orange-500 focus:outline-none  font-bold"
                    />
                ) : (
                    <div className="text-sm text-gray-900">{ingredient.deadline}</div>
                )}
            </td>
            <td className="px-6 py-4">
                {isEditing ? (
                    <button onClick={() => SaveIngredient(index, editedIngredient)} className="text-blue-500 font-bold">
                        Save
                    </button>
                ) : (
                    <button href="#" className="disabled:opacity-50" onClick={EditIngredient} disabled={editingIndex !== null}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-stone-950"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 
    2 0 112.828 
    2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                    </button>
                )}
            </td>
            <td className="px-6 py-4">
                <button href="#" className="disabled:opacity-50" onClick={DeleteIngredient} disabled={editingIndex !== null}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-stone-950"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 
    4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                </button>
            </td>
        </tr>
    );
};

export default IngredientRow;
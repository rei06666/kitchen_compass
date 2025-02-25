import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from '../component/Sidebar';
import Underbar from '../component/Underbar';
import IngredientRow from '../component/IngredientRow';
import app_logo from "../image/kitchen_compass_logo.png";
import logout_logo from "../image/logout.png";
import receipt_logo from "../image/receipt_logo.png";

const Ingredients = () => {
    const [ingredients, setIngredients] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [ingredientToDelete, setIngredientToDelete] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const name = localStorage.getItem('kitchenCompassUserName');
    const pageName = "Ingredients";

    const testdata = {
        "Ingredients": [
            {
                "Name": "Broccoli",
                "Amount": 1,
                "Unit": "head",
                "Deadline": "2022-01-01"
            },
            {
                "Name": "Meat",
                "Amount": 500,
                "Unit": "g",
                "Deadline": "2022-01-01"
            },
            {
                "Name": "Bread",
                "Amount": 1,
                "Unit": "loaf",
                "Deadline": "2022-01-01"
            }
        ]
    };

    useEffect(() => {
        // APIからデータを取得する
        // fetch('/api/ingredients')
        //     .then(response => response.json())
        //     .then(data => setIngredients(data))
        //     .catch(error => console.error('Error fetching ingredients:', error));
        setIngredients(testdata.Ingredients);
    }, []);

    const Logout = () => {
        // ログアウト処理をここに追加
        localStorage.removeItem('accessToken');
        localStorage.removeItem('kitchenCompassUserName');
        navigate('/');
    };

    const EditIngredient = (index) => {
        setEditingIndex(index);
    };

    const SaveIngredient = (index, updatedIngredient) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index] = updatedIngredient;
        setIngredients(updatedIngredients);
        setEditingIndex(null);
    };

    const ConfirmDeleteIngredient = (ingredient) => {
        setIngredientToDelete(ingredient);
        setShowDeleteModal(true);
    };

    const DeleteIngredient = () => {
        setIngredients(ingredients.filter(ingredient => ingredient !== ingredientToDelete));
        setShowDeleteModal(false);
        setIngredientToDelete(null);
    };

    return (
        <div className="relative flex w-full">
            {/* モバイルでは表示されない */}
            <Sidebar src={app_logo} name={name} pageName={pageName} />
            <div className="grow p-10">
                <h1 className="text-3xl font-bold">Ingredients</h1>
                <button className="mt-5 ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                    <img className="fill-current w-4 h-4 mr-2" src={receipt_logo} alt="Scan Receipt" />
                    <span>Scan Receipt</span>
                </button>
                <div className="mt-10 ml-2 flex w-full">
                    <div className="flex flex-col w-full">
                        <div className="w-full">
                            <div className="border-b border-gray-200 shadow w-full">
                                <table className="divide-y divide-zinc-950 w-full">
                                    <thead className="bg-orange-500">
                                        <tr>
                                            <th className="px-6 py-2 text-sm text-left text-slate-950">Name</th>
                                            <th className="px-6 py-2 text-xs text-left text-slate-950">Amount</th>
                                            <th className="px-6 py-2 text-xs text-left text-slate-950">Unit</th>
                                            <th className="px-6 py-2 text-xs text-left text-slate-950">Deadline</th>
                                            <th className="px-6 py-2 text-xs text-left text-slate-950">Edit</th>
                                            <th className="px-6 py-2 text-xs text-left text-slate-950">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-orange-100 divide-y divide-gray-300">
                                        {ingredients.map((ingredient, index) => (
                                            <IngredientRow
                                                key={index}
                                                index={index}
                                                ingredient={ingredient}
                                                isEditing={editingIndex === index}
                                                EditIngredient={() => EditIngredient(index)}
                                                SaveIngredient={SaveIngredient}
                                                ConfirmDeleteIngredient={() => ConfirmDeleteIngredient(ingredient)}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* モバイルで表示する */}
            <Underbar pageName={pageName} />
            {/* ログアウトロゴを画面右上に配置 */}
            <div className="fixed top-2 right-2 m-4 flex items-center cursor-pointer" onClick={Logout}>
                <img
                    src={logout_logo}
                    alt="Logout"
                    className="w-8 h-8"
                />
                <span className="ml-2 text-lg font-bold">Log out</span>
            </div>
            {/* 削除確認モーダル */}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                        <p>Are you sure you want to delete this ingredient?</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                onClick={DeleteIngredient}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Ingredients;
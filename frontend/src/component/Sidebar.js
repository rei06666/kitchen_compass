import React from 'react';
import { useNavigate } from "react-router-dom";
import ingredientsIcon from "../image/ingredients_logo.png"
import cookingIcon from "../image/cooking_logo.png"

const Sidebar = (props) => {
    const firstCharOfName = props.name ? props.name.charAt(0) : '';
    const pageName = props.pageName
    const navigate = useNavigate();


    return (
        // レスポンシブデザインのため、md:w-[8%] md:blockを追加
        <div className="hidden md:w-[8%] md:block h-screen  bg-orange-400 text-black">
            <div className="p-4">
                <img src={props.src} className="w-2/3 mx-auto" />
            </div>
            <div className="flex justify-center mt-4">
                <div className="font-bold font-KonkhmerSleokchher text-3xl rounded-full bg-orange-500 w-1/2 aspect-square flex items-center justify-center">
                    {firstCharOfName}
                </div>
            </div>
            <ul className="mt-5">
                <li className={`h-25 px-4 py-2 ${pageName=='Ingredients' ? 'bg-orange-600' : ''} hover:bg-orange-500 items-center`} onClick={() => {navigate("/ingredients")}}>
                    <img src={ingredientsIcon} alt="Ingredients" className="w-2/3 mx-auto" />
                    <div style={{ fontSize: 'calc(8vw / 8)' }} className="font-bold font-KonkhmerSleokchher w-full text-center mx-auto py-1">
                        Ingredients
                    </div>
                </li>
                <li className={`h-25 px-4 py-2 ${pageName=='Cooking' ? 'bg-orange-600' : ''} hover:bg-orange-500 items-center`} onClick={() => {navigate("/cooking")}}>
                    <img src={cookingIcon} alt="cooking" className="w-2/5 mx-auto" />
                    <div style={{ fontSize: 'calc(8vw / 8)' }} className="font-bold font-KonkhmerSleokchher w-full text-center mx-auto py-1">
                        Cooking
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
import React from 'react';
import ingredientsIcon from "../image/ingredients_logo.png";
import cookingIcon from "../image/cooking_logo.png";
import { useNavigate } from "react-router-dom";

const Underbar = (props) => {
    const pageName = props.pageName;
    const navigate = useNavigate()

    return (
        <div className="h-[10%] md:hidden fixed bottom-0 w-full bg-orange-400 text-black flex">
            <ul className="flex w-full">
                <li className={`flex-1 px-4 py-2 ${pageName === 'Ingredients' ? 'bg-orange-600' : ''} hover:bg-orange-500 flex flex-col items-center`} onClick={() => {navigate("/ingredients")}}>
                    <img src={ingredientsIcon} alt="Ingredients" className="h-2/3" />
                    <div style={{ fontSize: 'calc(8vw / 3)' }} className="mt-1 font-bold font-KonkhmerSleokchher text-xs text-center">
                        Ingredients
                    </div>
                </li>
                <li className={`flex-1 px-4 py-2 ${pageName === 'Cooking' ? 'bg-orange-600' : ''} hover:bg-orange-500 flex flex-col items-center`} onClick={() => {navigate("/cooking")}}>
                    <img src={cookingIcon} alt="cooking" className="h-2/3" />
                    <div style={{ fontSize: 'calc(8vw / 3)' }} className="mt-1 font-bold font-KonkhmerSleokchher text-xs text-center">
                        cooking
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Underbar;
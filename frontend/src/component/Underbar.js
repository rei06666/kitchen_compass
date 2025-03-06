import React from 'react';
import ingredientsIcon from "../image/ingredients_logo.png";
import cookingIcon from "../image/cooking_logo.png";

const Underbar = (props) => {
    const pageName = props.pageName;
    const handlePageName = props.handlePageName;

    return (
        <div className="h-[10%] md:hidden fixed bottom-0 w-full bg-orange-400 text-black flex">
            <ul className="flex w-full">
                <li className={`flex-1 px-4 py-2 ${pageName === 'ingredients' ? 'bg-orange-600' : ''} hover:bg-orange-500 flex flex-col items-center`} onClick={() => {handlePageName("Ingredients")}}>
                    <img src={ingredientsIcon} alt="Ingredients" className="h-2/3" />
                    <div style={{ fontSize: 'calc(8vw / 3)' }} className="mt-1 font-bold font-KonkhmerSleokchher text-xs text-center">
                        Ingredients
                    </div>
                </li>
                <li className={`flex-1 px-4 py-2 ${pageName === 'cooking' ? 'bg-orange-600' : ''} hover:bg-orange-500 flex flex-col items-center`} onClick={() => {handlePageName("cooking")}}>
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
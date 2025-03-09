import React from 'react';
import ingredientsIcon from "../image/ingredients_logo.png"
import cookingIcon from "../image/cooking_logo.png"

const Sidebar = (props) => {

    // ユーザー名の先頭1文字を取得
    const firstCharOfName = props.name ? props.name.charAt(0) : '';
    // ページ名を取得
    const pageName = props.pageName
    // ページ名を変更する関数を取得
    const handlePageName = props.handlePageName

    return (
        // レスポンシブデザインのため、md:w-[8%] md:blockを追加
        <div className="hidden fixed md:w-[8%] md:block h-screen  bg-orange-400 text-black">
            {/* ユーザー名とアプリのロゴ */}
            <div className="p-4">
                <img src={props.src} className="w-2/3 mx-auto" />
            </div>
            <div className="flex justify-center mt-4">
                <div className="font-bold font-KonkhmerSleokchher text-3xl rounded-full bg-orange-500 w-1/2 aspect-square flex items-center justify-center">
                    {firstCharOfName}
                </div>
            </div>
            {/* ページ選択リスト */}
            <ul className="mt-5">
                <li className={`h-25 px-4 py-2 ${pageName=='ingredients' ? 'bg-orange-600' : ''} hover:bg-orange-500 items-center cursor-pointer`} onClick={() => {handlePageName("ingredients")}}>
                    <img src={ingredientsIcon} alt="Ingredients" className="w-2/3 mx-auto" />
                    <div style={{ fontSize: 'calc(8vw / 8)' }} className="font-bold font-KonkhmerSleokchher w-full text-center mx-auto py-1">
                        Ingredients
                    </div>
                </li>
                <li className={`h-25 px-4 py-2 ${pageName=='cooking' ? 'bg-orange-600' : ''} hover:bg-orange-500 items-center cursor-pointer`} onClick={() => {handlePageName("cooking")}}>
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
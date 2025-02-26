import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from '../component/Sidebar';
import Underbar from '../component/Underbar';
import app_logo from "../image/kitchen_compass_logo.png";
import logout_logo from "../image/logout.png";

const menuData = {
    menus: [
        {
            "name": "ハンバーグ" ,
            "image": "https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqG91D0jtYA8ffcvNYEaSWqFiu6NEj1MaTdZ-CPt-6YVVlxyY7tEABkq5AmX6qnvqGZrY-UPo52uyglfeLvy2mDvmPcOnrgKaDPZK6tNNjRL1saE4-W9uPEB76D8ZD-3inzOxrYG5tFG5kVMAHJXNVkDgUUjQfrSz3EoTjCHnQc5VLy081uZa8lDuwdcy3vRMShigbDBCLSj4c9RJD2XYiO1uYhye2oJxDZ2eIIyo2EvVZBj2JTHC0INSvFj4nRO82Ln8FgJwley2l1ExQSlWmQ-8=/hanba-gu6321.JPG",
            "description": "ハンバーグの説明",
            "ingredients": [
                {
                    "name": "挽き肉",
                    "quantity": "200g"
                },
                {
                    "name": "玉ねぎ",
                    "quantity": "1/2個"
                },
                {
                    "name": "パン粉",
                    "quantity": "大さじ1"
                },
                {
                    "name": "牛乳",
                    "quantity": "大さじ1"
                },
                {
                    "name": "塩",
                    "quantity": "少々"
                },
                {
                    "name": "こしょう",
                    "quantity": "少々"
                },
                {
                    "name": "卵",
                    "quantity": "1個"
                },
                {
                    "name": "ケチャップ",
                    "quantity": "大さじ1"
                },
                {
                    "name": "ソース",
                    "quantity": "適量"
                }
            ],
            "url": "https://www.kurashiru.com/recipes/d70b6d20-e200-460e-8a98-407117ab8724"
        },
        {
            "name": "ハンバーグ" ,
            "image": "https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqG91D0jtYA8ffcvNYEaSWqFiu6NEj1MaTdZ-CPt-6YVVlxyY7tEABkq5AmX6qnvqGZrY-UPo52uyglfeLvy2mDvmPcOnrgKaDPZK6tNNjRL1saE4-W9uPEB76D8ZD-3inzOxrYG5tFG5kVMAHJXNVkDgUUjQfrSz3EoTjCHnQc5VLy081uZa8lDuwdcy3vRMShigbDBCLSj4c9RJD2XYiO1uYhye2oJxDZ2eIIyo2EvVZBj2JTHC0INSvFj4nRO82Ln8FgJwley2l1ExQSlWmQ-8=/hanba-gu6321.JPG",
            "description": "ハンバーグの説明",
            "ingredients": [
                {
                    "name": "挽き肉",
                    "quantity": "200g"
                },
                {
                    "name": "玉ねぎ",
                    "quantity": "1/2個"
                },
                {
                    "name": "パン粉",
                    "quantity": "大さじ1"
                },
                {
                    "name": "牛乳",
                    "quantity": "大さじ1"
                },
                {
                    "name": "塩",
                    "quantity": "少々"
                },
                {
                    "name": "こしょう",
                    "quantity": "少々"
                },
                {
                    "name": "卵",
                    "quantity": "1個"
                },
                {
                    "name": "ケチャップ",
                    "quantity": "大さじ1"
                },
                {
                    "name": "ソース",
                    "quantity": "適量"
                }
            ],
            "url": "https://www.kurashiru.com/recipes/d70b6d20-e200-460e-8a98-407117ab8724"
        },
        {
            "name": "ハンバーグ" ,
            "image": "https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqG91D0jtYA8ffcvNYEaSWqFiu6NEj1MaTdZ-CPt-6YVVlxyY7tEABkq5AmX6qnvqGZrY-UPo52uyglfeLvy2mDvmPcOnrgKaDPZK6tNNjRL1saE4-W9uPEB76D8ZD-3inzOxrYG5tFG5kVMAHJXNVkDgUUjQfrSz3EoTjCHnQc5VLy081uZa8lDuwdcy3vRMShigbDBCLSj4c9RJD2XYiO1uYhye2oJxDZ2eIIyo2EvVZBj2JTHC0INSvFj4nRO82Ln8FgJwley2l1ExQSlWmQ-8=/hanba-gu6321.JPG",
            "description": "ハンバーグの説明",
            "ingredients": [
                {
                    "name": "挽き肉",
                    "quantity": "200g"
                },
                {
                    "name": "玉ねぎ",
                    "quantity": "1/2個"
                },
                {
                    "name": "パン粉",
                    "quantity": "大さじ1"
                },
                {
                    "name": "牛乳",
                    "quantity": "大さじ1"
                },
                {
                    "name": "塩",
                    "quantity": "少々"
                },
                {
                    "name": "こしょう",
                    "quantity": "少々"
                },
                {
                    "name": "卵",
                    "quantity": "1個"
                },
                {
                    "name": "ケチャップ",
                    "quantity": "大さじ1"
                },
                {
                    "name": "ソース",
                    "quantity": "適量"
                }
            ],
            "url": "https://www.kurashiru.com/recipes/d70b6d20-e200-460e-8a98-407117ab8724"
        },
        {
            "name": "ハンバーグ" ,
            "image": "https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqG91D0jtYA8ffcvNYEaSWqFiu6NEj1MaTdZ-CPt-6YVVlxyY7tEABkq5AmX6qnvqGZrY-UPo52uyglfeLvy2mDvmPcOnrgKaDPZK6tNNjRL1saE4-W9uPEB76D8ZD-3inzOxrYG5tFG5kVMAHJXNVkDgUUjQfrSz3EoTjCHnQc5VLy081uZa8lDuwdcy3vRMShigbDBCLSj4c9RJD2XYiO1uYhye2oJxDZ2eIIyo2EvVZBj2JTHC0INSvFj4nRO82Ln8FgJwley2l1ExQSlWmQ-8=/hanba-gu6321.JPG",
            "description": "ハンバーグの説明",
            "ingredients": [
                {
                    "name": "挽き肉",
                    "quantity": "200g"
                },
                {
                    "name": "玉ねぎ",
                    "quantity": "1/2個"
                },
                {
                    "name": "パン粉",
                    "quantity": "大さじ1"
                },
                {
                    "name": "牛乳",
                    "quantity": "大さじ1"
                },
                {
                    "name": "塩",
                    "quantity": "少々"
                },
                {
                    "name": "こしょう",
                    "quantity": "少々"
                },
                {
                    "name": "卵",
                    "quantity": "1個"
                },
                {
                    "name": "ケチャップ",
                    "quantity": "大さじ1"
                },
                {
                    "name": "ソース",
                    "quantity": "適量"
                }
            ],
            "url": "https://www.kurashiru.com/recipes/d70b6d20-e200-460e-8a98-407117ab8724"
        }
    ]
}

const Cooking = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const name = localStorage.getItem('kitchenCompassUserName');
    const pageName = "Cooking";
    const [selectedTab, setSelectedTab] = useState('HomeAndNotExpired');

    const Logout = () => {
        // ログアウト処理をここに追加
        localStorage.removeItem('accessToken');
        localStorage.removeItem('kitchenCompassUserName');
        navigate('/');
    };

    const handleTabClick = (tabName) => {
        setSelectedTab(tabName);
    };

    return (
        <div className="relative flex w-full">
            {/* モバイルでは表示されない */}
            <Sidebar src={app_logo} name={name} pageName={pageName} />
            <div className="grow p-10 md:ml-[8%]">
                <h1 className="text-3xl font-bold">Cooking</h1>
                <div className='mt-5 ml-[2%] text-3xl'>
                    <h2 className="font-bold text-orange-950">mode</h2>
                    <div className="mt-2 overflow-hidden rounded-xl border border-gray-100 bg-orange-50 p-1">
                        {/* タブ表示 */}
                        <ul className="hidden md:flex items-center gap-2 text-sm font-medium">
                            <li className="flex-1">
                                <a
                                    className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 ${selectedTab === 'HomeAndNotExpired' ? 'bg-orange-400 text-gray-900 shadow' : 'text-gray-500 hover:bg-orange-200 hover:text-gray-700 hover:shadow'}`}
                                    onClick={() => handleTabClick('HomeAndNotExpired')}
                                >
                                    At home, not expired
                                </a>
                            </li>
                            <li className="flex-1">
                                <a
                                    className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 ${selectedTab === 'Home' ? 'bg-orange-400 text-gray-900 shadow' : 'text-gray-500 hover:bg-orange-200 hover:text-gray-700 hover:shadow'}`}
                                    onClick={() => handleTabClick('Home')}
                                >
                                    At home
                                </a>
                            </li>
                            <li className="flex-1">
                                <a
                                    className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 ${selectedTab === 'AnyIngredient' ? 'bg-orange-400 text-gray-900 shadow' : 'text-gray-500 hover:bg-orange-200 hover:text-gray-700 hover:shadow'}`}
                                    onClick={() => handleTabClick('AnyIngredient')}
                                >
                                    Any ingredient
                                </a>
                            </li>
                        </ul>
                        {/* プルダウン表示 */}
                        <div className="md:hidden">
                            <select
                                className="w-full rounded-lg border border-gray-300 bg-white p-2 text-sm"
                                value={selectedTab}
                                onChange={(e) => handleTabClick(e.target.value)}
                            >
                                <option value="HomeAndNotExpired">At home, not expired</option>
                                <option value="Home">At home</option>
                                <option value="AnyIngredient">Any ingredient</option>
                            </select>
                        </div>
                    </div>
                    <div className="rounded-xl p-5 border-gray-900 shadow w-full mt-[5%]">
                        <form class="w-full">
                        <label for="message" class="w-full mb-2 text-lg font-medium dark:text-black">What kind of dish do you want to eat?</label>
                            <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Feel free to write your request"></textarea>
                        </form>
                        <div class="flex justify-end">
                            <button class="text-lg right-2 mt-5 bg-orange-400 hover:bg-orange-500 border-gray-500 border text-white font-bold py-2 px-4 rounded">Request</button>
                        </div>
                    </div>
                    <h2 className="mt-20 font-bold text-orange-950">menu</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-5">
                        {menuData.menus.map((menu, index) => (
                            <div key={index} className="border-3  rounded-lg p-5 shadow  bg-orange-200 hover:bg-orange-300">
                                <h3 className="mt-2 mb-2 text-xl font-bold">{menu.name}</h3>
                                <img src={menu.image} alt={menu.name} className="w-full object-cover rounded-lg" />
                                <p className="mt-1 text-gray-700">{menu.description}</p>
                                <ul className="mt-2">
                                    {menu.ingredients.map((ingredient, idx) => (
                                        <li key={idx} className="text-gray-600">{ingredient.name}: {ingredient.quantity}</li>
                                    ))}
                                </ul>
                                <a href={menu.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded">View Recipe</a>
                            </div>
                        ))}
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
        </div>
    );
};

export default Cooking;
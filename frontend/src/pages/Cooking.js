import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import logout_logo from "../image/logout.png";
import ExecuteAPI from '../util/ExecuteAPI';

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

const recommendMode = {
    // 家にあって期限切れでない
    "HomeAndNotExpired": 1,
    // 家にある（期限切れも含む）
    "Home": 2,
    // 家になくてもいい
    "AnyIngredient": 3
}

const Cooking = (props) => {
    const navigate = useNavigate();
    // const name = localStorage.getItem('kitchenCompassUserName');
    const [request, setRequest] = useState('');
    const [error, setError] = useState('');
    const [selectedTab, setSelectedTab] = useState(recommendMode.HomeAndNotExpired);
    const [loading, setLoading] = useState(false);
    const [menus, setMenus] = useState([]);
    const name=props.name

    const Logout = () => {
        // ログアウト処理をここに追加
        localStorage.removeItem('accessToken');
        localStorage.removeItem('kitchenCompassUserName');
        navigate('/');
    };

    const handleTabClick = (tabName) => {
        setSelectedTab(tabName);
    };

    const handleResuestChange = (event) => {
        setRequest(event.target.value);
    }

    const sendRequest = async (event) => {
        try {
            setMenus([]);
            setError('');
            event.preventDefault();
            const result = checkRequest();
            if (!result) {
                return;
            }
            setLoading(true);
            const body = JSON.stringify({
                username: name,
                mode: selectedTab,
                request: request
            })
            const response = await ExecuteAPI("", "POST", {'Content-Type': 'application/json'}, body, "/menu/recommend");
            if (!response.ok) {
                throw new Error();
            }
            const responseJson = await response.json();
            setMenus(responseJson.menus);
            setLoading(false);
        }

        catch (error) {
            setError('Failed to get menu');
            setLoading(false);
            return
        }
    }

    const checkRequest = () => {
        if (request === '') {
            setError('Request is empty');
            return false;
        }
        setError('');
        return true;
    }

    return (
        <div className="grow p-10 md:ml-[8%]">
            <div>
                <h1 className="text-3xl font-bold">Cooking</h1>
                <div className='mt-5 ml-[2%] text-3xl'>
                    <h2 className="font-bold text-orange-950">mode</h2>
                    <div className="mt-2 overflow-hidden rounded-xl border border-gray-100 bg-orange-50 p-1">
                        {/* タブ表示 */}
                        <ul className="hidden md:flex items-center gap-2 text-sm font-medium">
                            <li className="flex-1">
                                <a
                                    className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 ${selectedTab === recommendMode.HomeAndNotExpired ? 'bg-orange-400 text-gray-900 shadow' : 'text-gray-500 hover:bg-orange-200 hover:text-gray-700 hover:shadow'}`}
                                    onClick={() => handleTabClick('HomeAndNotExpired')}
                                >
                                    At home, not expired
                                </a>
                            </li>
                            <li className="flex-1">
                                <a
                                    className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 ${selectedTab === recommendMode.Home ? 'bg-orange-400 text-gray-900 shadow' : 'text-gray-500 hover:bg-orange-200 hover:text-gray-700 hover:shadow'}`}
                                    onClick={() => handleTabClick('Home')}
                                >
                                    At home
                                </a>
                            </li>
                            <li className="flex-1">
                                <a
                                    className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 ${selectedTab === recommendMode.AnyIngredient ? 'bg-orange-400 text-gray-900 shadow' : 'text-gray-500 hover:bg-orange-200 hover:text-gray-700 hover:shadow'}`}
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
                        <div className={`${!error ? 'hidden' : ''} text-lg font-bold font-KonkhmerSleokchher text-rose-600`}>
                            {error}
                        </div>
                        <form className="w-full" onSubmit={sendRequest}>
                        <label htmlFor="request" className="w-full mb-2 text-lg font-medium dark:text-black">What kind of dish do you want to eat?</label>
                            <textarea onChange={handleResuestChange} id="request" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Feel free to write your request" value={request}></textarea>
                            <div className="flex justify-end">
                                <button type='submit' className="text-lg right-2 mt-5 bg-orange-900 hover:bg-orange-500 border-gray-500 border text-white font-bold py-2 px-4 rounded">Request</button>
                            </div>
                        </form> 
                    </div>
                    <h2 className={`mt-20 font-bold text-orange-950 ${loading ? "" : "hidden"}`}>menu</h2>
                    {/* ロード中 */}
                    {loading && (
                        <div role="status " className="flex items-center justify-center mt-20">
                            <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                        </div>
                    )}
                    {/* メニュー表示 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-5">
                        {menus.map((menu, index) => (
                            <div key={index} className="border-3  text-lg rounded-lg p-5 shadow  bg-orange-200 hover:bg-orange-300">
                                <h1 className="mt-2 mb-2  font-bold text-orange-900">menu name</h1>
                                <h1 className="mt-2 mb-2  font-bold">{menu.name}</h1>
                                <img src={menu.image} alt={menu.name} className="w-full object-cover rounded-lg" />
                                <h1 className="mt-2 mb-2  font-bold text-orange-900">description</h1>
                                <p className="mt-1 text-gray-700">{menu.description}</p>
                                <h1 className="mt-2 mb-2  font-bold text-orange-900">ingredients</h1>
                                <ul className="mt-2">
                                    {menu.ingredients.map((ingredient, idx) => (
                                        <li key={idx} className="text-gray-600">{ingredient.name}: {ingredient.quantity}</li>
                                    ))}
                                </ul>
                                <a href={menu.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block bg-orange-900 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded">View Recipe</a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
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
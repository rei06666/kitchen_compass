import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from '../component/Sidebar';
import Underbar from '../component/Underbar';
import app_logo from "../image/kitchen_compass_logo.png";
import logout_logo from "../image/logout.png";

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
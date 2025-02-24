import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from '../component/Sidebar';
import Underbar from '../component/Underbar';
import app_logo from "../image/kitchen_compass_logo.png"
import logout_logo from "../image/logout.png"

export default function Ingredients() {

    const navigate = useNavigate();
    const location = useLocation();
    const name = localStorage.getItem('kitchenCompassUserName');
    const pageName = "Ingredients"

    const Logout = () => {
        // ログアウト処理をここに追加
        localStorage.removeItem('accessToken');
        localStorage.removeItem('kitchenCompassUserName');
        navigate('/');
    };

    return (
        <div className="flex w-100">
            {/* モバイルでは表示されない */}
            <Sidebar src={app_logo} name={name} pageName={pageName} />
            <div className="grow p-10">
                {/* 他のコンテンツをここに追加 */}
                <h1 className="text-3xl font-bold">Ingredients</h1>
                {/* ここに他のコンテンツを追加 */}
            </div>
            {/* モバイルで表示する */}
            <Underbar pageName={pageName} />
            {/* ログアウトロゴを画面右上に配置 */}
            <div className="absolute top-2 right-2 m-4 flex items-center cursor-pointer" onClick={Logout}>
                <img
                    src={logout_logo}
                    alt="Logout"
                    className="w-8 h-8"
                />
                <span className="ml-2 text-lg font-bold">Log out</span>
            </div>
        </div>
    );
}
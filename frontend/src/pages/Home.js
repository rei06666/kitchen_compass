import React, { useState } from 'react';
import Ingredients from "./Ingredients";
import Cooking from "./Cooking";
import Sidebar from "../component/Sidebar";
import Underbar from "../component/Underbar";
import app_logo from "../image/kitchen_compass_logo.png";

function Home() {
    const [pageName, setPageName] = useState("ingredients");
    const name = "naruserei";
    // const name = localStorage.getItem('kitchenCompassUserName');

    return (
        <div>
            {/* モバイルでは表示されない */}
            <Sidebar src={app_logo} name={name} pageName={pageName} handlePageName={setPageName}/>
            {/* モバイルで表示する */}
            <Underbar pageName={pageName} handlePageName={setPageName} />
            {pageName === "ingredients" && <Ingredients name={name} />}
            {pageName === "cooking" && <Cooking name={name} />}
        </div>
    );
};

export default Home;
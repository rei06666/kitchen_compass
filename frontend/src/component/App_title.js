// アプリのタイトル
const App_title = (props) => {
    return (
        <div>
            <img src={props.src} className="w-1/5 mx-auto" />
            <div className="font-bold font-KonkhmerSleokchher text-center p-2">{props.txt}</div>
        </div>
    );
};

export default App_title;

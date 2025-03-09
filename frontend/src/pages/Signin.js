import { useForm } from 'react-hook-form';
// import { ErrorMessage } from '@hookform/error-message';
import { useNavigate } from "react-router-dom";
import app_logo from "../image/kitchen_compass_logo.png"
import broccoli_logo from "../image/broccoli_logo.png"
import meat_logo from "../image/meat_logo.png"
import bread_logo from "../image/bread_logo.png"
import App_title from "../component/App_title"
import { useLocation } from "react-router-dom";

export default function Signin() {

    const navigate = useNavigate();
    const location = useLocation();
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        mode: 'onChange',
    });

    // ログイン
    const signIn = async (data) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_PATH}/user/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    password: data.password
                }),
            });
    
            if (!response.ok) {
                throw new Error();
            }

            
            const responseJson = await response.json()
            const accessToken = responseJson.accessToken
            // accessTokenをローカルストレージに保存
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('kitchenCompassUserName', data.name);
    
            navigate("/home", { state: {success: "ログインに成功しました"}});
        } catch (error) {
            console.error(error);
            const errorText = "ログインに失敗しました";
            navigate("/", { state: {error: errorText }});
        }
    }

    // パスワードのリセット
    const goToVerification = () => {
        navigate("/verification")
    }

    // アカウント作成
    const goToSignUp = () => {
        console.log("create account")
        navigate("/account/create")
    }

    return (
        <div className="min-h-screen bg-orange-300">
            <div className="mx-auto max-w-lg py-[10vh]">
                <div>
                    <App_title txt="Kitchen Compass" src={app_logo} />
                    <div className={`font-bold font-KonkhmerSleokchher text-center p-2 ${location.state?.error ? 'text-rose-600' : 'text-emerald-400'}`}>
                        {location.state?.success || location.state?.error}
                    </div>
                    <div className="container mx-auto w-2/3 rounded-sm shadow-md bg-orange-200">
                        <form
                        onSubmit={handleSubmit(signIn)}
                        className="p-2"
                        >
                        <div className="mt-2 flex w-full flex-col">
                            <label className="text-[12px] font-KonkhmerSleokchher text-gray-950" htmlFor="name">
                            Name
                            </label>
                            <input
                            {...register("name", { required: "名前を入力してください" })}
                            className="rounded-md border px-2 py-0.5 focus:border-2 focus:border-lime-400 focus:outline-none"
                            type="name"
                            name="name"
                            placeholder="value"
                            />
                            {errors.name && (
                                <div className="text-[10px] font-KonkhmerSleokchher py-0.5 text-rose-600">
                                {errors.name.message}
                                </div>
                            )}
                        </div>
                        <div className="flex w-full flex-col mt-5">
                            <label className="text-[12px] font-KonkhmerSleokchher text-gray-950" htmlFor="name">
                            Password
                            </label>
                            <input
                            {...register("password", { 
                                required: "パスワードを入力してください",
                                minLength: {
                                    value: 8,
                                    message: "パスワードは8文字以上である必要があります"
                                },
                                validate: {
                                    hasUpperCase: value => /[A-Z]/.test(value) || "パスワードには大文字を含める必要があります",
                                    hasLowerCase: value => /[a-z]/.test(value) || "パスワードには小文字を含める必要があります",
                                    hasNumber: value => /[0-9]/.test(value) || "パスワードには数字を含める必要があります",
                                    hasSymbol: value => /[!@#$%^&*(),.?":{}|<>]/.test(value) || "パスワードには記号を含める必要があります"
                                }
                            })}
                            className="rounded-md border px-2 py-0.5 focus:border-2 focus:border-lime-400 focus:outline-none"
                            type="password"
                            name="password"
                            placeholder="value"
                            />
                            {errors.password && (
                                <div className="text-[10px] font-KonkhmerSleokchher py-0.5 text-rose-600">
                                {errors.password.message}
                                </div>
                            )}
                        </div>
                        <button
                            className="w-full rounded-lg mt-8 bg-stone-950 hover:bg-stone-700 px-2 py-0.5 font-KonkhmerSleokchher text-white"
                            type="submit"
                        >
                            Sign In
                        </button>
                        </form>
                        <button className="mt-8 px-2 py-1 text-[10px] font-KonkhmerSleokchher px-py-0.5 underline text-gray-950" onClick={goToVerification}>
                            パスワードを忘れましたか？
                        </button>
                    </div>
                    <div className="mx-auto w-2/3 text-center">
                        <button className="mt-1 text-[10px] font-KonkhmerSleokchher underline text-gray-950" onClick={goToSignUp}>
                                    アカウントを持っていませんか?<br></br>
                                    <p className="text-[12px]">アカウントの作成</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}
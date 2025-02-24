import { useForm} from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import app_logo from "../image/kitchen_compass_logo.png"
import App_title from "../component/App_title"
import { useLocation } from "react-router-dom";

export default function ResetPassword() {

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

    const resetPassword = async (data) => {
        try {
            console.log(data.verification)
            const response = await fetch(`${process.env.REACT_APP_API_PATH}/user/password/change`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    verifyCode: data.verification,
                    newPassword: data.newpassword,
                    name: location.state?.name
                }),
            });
    
            if (!response.ok) {
                throw new Error();
            }
    
            const resultText = "パスワード再設定に成功しました";
            navigate("/", { state: {success: resultText }});
        } catch (error) {
            console.error(error);
            const errorText = "パスワード再設定に失敗しました";
            navigate("/", { state: {error: errorText }});
        }
    }

    const backToSignin = () => {
        navigate("/")
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
                        onSubmit={handleSubmit(resetPassword)}
                        className="p-2"
                        >
                            <div className="flex w-full flex-col">
                            <label className="text-[12px] font-KonkhmerSleokchher text-gray-950" htmlFor="verification">
                            確認コード
                            </label>
                            <input
                            {...register("verification", { required: "確認コードをを入力してください" })}
                            className="rounded-md border px-2 py-0.5 focus:border-2 focus:border-lime-400 focus:outline-none"
                            type="verification"
                            name="verification"
                            placeholder="value"
                            />
                            {errors.verification && (
                                <div className="text-[10px] font-KonkhmerSleokchher py-0.5 text-rose-600">
                                {errors.verification.message}
                                </div>
                            )}
                        </div>
                        <div className="flex w-full flex-col  mt-5">
                            <label className="text-[12px] font-KonkhmerSleokchher text-gray-950" htmlFor="newpassword">
                            New Password
                            </label>
                            <input
                            {...register("newpassword", { 
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
                            name="newpassword"
                            placeholder="value"
                            />
                            {errors.newpassword && (
                                <div className="text-[10px] font-KonkhmerSleokchher py-0.5 text-rose-600">
                                {errors.newpassword.message}
                                </div>
                            )}
                        </div>
                            <button
                                className="text-[12px] w-full rounded-lg mt-8 bg-stone-950 hover:bg-stone-700 px-2 py-0.5 font-KonkhmerSleokchher text-white"
                                type="submit"
                            >
                                パスワード再設定
                            </button>
                        </form>
                    </div>
                    <div className="mx-auto w-2/3 text-center">
                        <button className="mt-10 text-[10px] font-KonkhmerSleokchher underline text-gray-950 hover:text-stone-700" onClick={backToSignin}>
                                    ログイン画面に戻る
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}
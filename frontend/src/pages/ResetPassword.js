import { useForm} from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import app_logo from "../image/kitchen_compass_logo.png"
import App_title from "../component/App_title"

export default function ResetPassword() {

    const navigate = useNavigate();

    const isValid = (data) => {
        console.log(data);
      };
    const isInValid = (errors) => {
        console.log(errors);
    };
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        mode: 'onChange',
    });

    const resetPassword = () => {
        const result = "パスワードをリセットしました"
        navigate("/", {state: result})
    }

    const backToSignin = () => {
        navigate("/")
    }

    return (
        <div className="min-h-screen bg-orange-300">
            <div className="mx-auto max-w-lg py-[10vh]">
                <div>
                    <App_title txt="Kitchen Compass" src={app_logo} />
                    <div className="container mx-auto w-2/3 rounded-sm shadow-md bg-orange-200">
                        <form
                        onSubmit={handleSubmit(isValid, isInValid)}
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
                            {...register("email", { required: "メールアドレスを入力してください" })}
                            className="rounded-md border px-2 py-0.5 focus:border-2 focus:border-lime-400 focus:outline-none"
                            type="newpassword"
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
                                className="text-[12px] w-full rounded-lg mt-8 bg-stone-950 hover:bg-stone-700 px-2 py-0.5 font-KonkhmerSleokchher text-white" onClick={resetPassword}
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
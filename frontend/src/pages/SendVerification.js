import { useForm} from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import app_logo from "../image/kitchen_compass_logo.png"
import App_title from "../component/App_title"

export default function SendVerification() {

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

    const sendVerification = () => {
        navigate("/password/reset")
    }

    const backToSignin = () => {
        console.log("back to signin")
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
                        <div className="flex w-full flex-col  mt-5">
                            <label className="text-[12px] font-KonkhmerSleokchher text-gray-950" htmlFor="email">
                            Email
                            </label>
                            <input
                            {...register("email", { required: "メールアドレスを入力してください" })}
                            className="rounded-md border px-2 py-0.5 focus:border-2 focus:border-lime-400 focus:outline-none"
                            type="email"
                            name="email"
                            placeholder="value"
                            />
                            {errors.email && (
                                <div className="text-[10px] font-KonkhmerSleokchher py-0.5 text-rose-600">
                                {errors.email.message}
                                </div>
                            )}
                        </div>
                        <div class="flex px-10">
                            <button
                                className="text-[12px] w-full mt-8 px-2 py-0.5 font-KonkhmerSleokchher text-black hover:text-stone-700" onClick={backToSignin}
                                type="submit"
                            >
                                Cancel
                            </button>
                            <button
                                className="text-[12px] w-full rounded-lg mt-8 bg-stone-950 hover:bg-stone-700 px-2 py-0.5 font-KonkhmerSleokchher text-white" onClick={sendVerification}
                                type="submit"
                            >
                                確認コードを送信
                            </button>
                        </div>
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
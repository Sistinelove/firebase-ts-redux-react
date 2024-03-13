import { useNavigate } from "react-router-dom";
import { ChangeEvent, FocusEvent, useState } from "react";
import { setUser } from "../store/slices/userSlice";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { useAppDispatch } from "../hooks/redux-hooks";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [isPassword] = useState(true);
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [repeatPasswordDirty, setRepeatPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState("Email не может быть пустым");
    const [passwordError, setPasswordError] = useState(
        "Пароль не может быть пустым"
    );

    const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError("Неккоректный email");
        } else {
            setEmailError("");
        }
    };

    const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (e.target.value.length < 3 || e.target.value.length > 8) {
            setPasswordError("Пароль должен быть больше 3 и меньше 8 символов");
            if (!e.target.value) {
                setPasswordError("Пароль не может быть пустым");
            }
        } else {
            setPasswordError("");
        }
    };

    const repeatPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(e.target.value);
        if (e.target.value.length < 3 || e.target.value.length > 8) {
            setPasswordError("Пароль должен быть больше 3 и меньше 8 символов");
            if (!e.target.value) {
                setPasswordError("Пароль не может быть пустым");
            }
        } else {
            setPasswordError("");
        }
    };

    const blurHandler = (e: FocusEvent<HTMLInputElement, Element>) => {
        switch (e.target.name) {
            case "email":
                setEmailDirty(true);
                break;
            case "password":
                setPasswordDirty(true);
                break;
            case "repeatpassword":
                setRepeatPasswordDirty(true);
                break;
        }
    };

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleRegister = (email: string, password: string) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                console.log(user);
                dispatch(
                    setUser({
                        email: user.email,
                        id: user.uid,
                        token: user.refreshToken,
                    })
                );
                localStorage.setItem("token", user.refreshToken);
                navigate("/");
            })
            .catch(console.error);
    };

    const handleLogin = (email: string, password: string) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(
                    setUser({
                        email: user.email,
                        id: user.uid,
                        token: user.refreshToken,
                    })
                );
                localStorage.setItem("token", user.refreshToken);
                navigate("/");
            })
            .catch(console.error);
    };

    return (
        <div className="flex justify-center items-center h-screen font-roboto">
            <div className="shadow-md bg-white w-[500px] h-auto rounded-[16px] p-[16px] flex flex-col gap-6">
                <div className="h-auto w-auto flex flex-col gap-6 mb-6">
                    <h2 className=" text-xl font-roboto">Регистрация</h2>
                    <div className="flex flex-col gap-2 w">
                        <div className="text-base h-[22px]">Имя</div>
                        <input
                            name="email"
                            value={name}
                            onBlur={(e) => blurHandler(e)}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            className="pt-4 pr-2 pb-4 pl-4 h-12 bg-gray-200 text-gray-400 rounded-lg"
                            placeholder="Артур"
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="text-base mb-2 h-[22px] font-roboto">
                            Электронная почта
                        </div>
                        <input
                            name="email"
                            value={email}
                            onBlur={(e) => blurHandler(e)}
                            onChange={(e) => emailHandler(e)}
                            className="pt-4 pr-2 pb-4 pl-4 h-12 bg-gray-200 text-gray-400 rounded-lg mb-1"
                            placeholder="example@mail.ru"
                        />
                        {emailDirty && emailError && (
                            <div className="text-[10px] h-3 text-customRed">
                                Ошибка
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-base">Пароль</div>
                        <div className="flex w-auto h-12 bg-gray-200 gap-2 rounded-lg">
                            <div className="flex gap-2 w-full items-center">
                                <input
                                    name="password"
                                    value={password}
                                    onBlur={(e) => blurHandler(e)}
                                    onChange={(e) => passwordHandler(e)}
                                    className="pt-4 pr-2 pb-4 pl-4 h-12 bg-gray-200 text-gray-400 w-full rounded-lg "
                                    placeholder="****"
                                />
                                <button className="w-6 h-6 mr-2">
                                    <img
                                        src="/Vector.png"
                                        alt="Показать/Скрыть пароль"
                                    />
                                </button>
                            </div>
                        </div>{" "}
                        {passwordDirty && passwordError && (
                            <div className="text-[10px] h-3 text-customRed">
                                {passwordError}{" "}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-base">Подтвердите пароль</div>
                        <div className="flex w-auto h-12 bg-gray-200 gap-2 rounded-lg">
                            <div className="flex gap-2 w-full items-center">
                                <input
                                    name="repeatpassword"
                                    value={repeatPassword}
                                    onBlur={(e) => blurHandler(e)}
                                    onChange={(e) => repeatPasswordHandler(e)}
                                    className="pt-4 pr-2 pb-4 pl-4 h-12 bg-gray-200 text-gray-400 w-full rounded-lg "
                                    placeholder="****"
                                />

                                <button className="w-6 h-6 mr-2">
                                    {isPassword ? (
                                        <img
                                            src="/Vector.png"
                                            alt="Показать/Скрыть пароль"
                                        />
                                    ) : null}
                                </button>
                            </div>
                        </div>
                        {repeatPasswordDirty && passwordError && (
                            <div className="text-[10px] h-3 text-customRed">
                                {passwordError}
                            </div>
                        )}
                    </div>
                </div>
                <div className="">
                    <button
                        onClick={() => {
                            handleRegister(email, password);
                        }}
                        className="bg-Violet rounded-lg w-full pt-4 pr-2 pb-4 pl-4 h-12 flex items-center text-white justify-center"
                    >
                        Зарегистрироваться
                    </button>
                </div>
                <div className="">
                    <button
                        onClick={() => {
                            handleLogin(email, password);

                        }}
                        className="bg-Violet rounded-lg w-full pt-4 pr-2 pb-4 pl-4 h-12 flex items-center text-white justify-center"
                    >
                        Войти
                    </button>
                </div>
            </div>
        </div>
    );
};

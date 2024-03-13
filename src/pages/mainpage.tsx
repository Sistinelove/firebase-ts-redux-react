import React, { useEffect, useState } from "react";
import { Button } from "../components/button";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { SelectUserList, fetchuserlist } from "../store/slices/userSlice";
import { useAppDispatch } from "../hooks/redux-hooks";
import { useSelector } from "react-redux";
import { User } from "../types";

export const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const auth = getAuth();
    const [autorization, setAutorization] = useState(false);
    const users = useSelector<User[]>(SelectUserList);
    console.log(users);

    useEffect(() => {
        dispatch(fetchuserlist());
    }, []);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setAutorization(user ? true : false);
        });
    }, [auth]);

    const singOutHandler = () => {
        signOut(auth);
        localStorage.removeItem("token");
        setAutorization(false);
    };

    function handleClick(userId:string) {
        navigate(`/AboutPerson/${userId}`);
    }

    return (
        <div className="flex flex-col w-screen h-screen items-center font-roboto">
            <div className="flex flex-row">
                <div className="bg-Violet text-white w-screen flex flex-row">
                    <div className="mr-4 ml-4 mt-12 mb-12 lg:font-normal lg:mr-72 lg:ml-72 lg:mt-12 lg:mb-12 h-auto flex flex-col items-center text-center">
                        <h1 className="text-[36px] mb-4 lg:text-6xl">
                            Наша команда
                        </h1>
                        <div className=" text-base text-roboto lg:text-xl">
                            Это опытные специалисты, хорошо разбирающиеся во
                            всех задачах, которые ложатся на их плечи, и умеющие
                            находить выход из любых, даже самых сложных
                            ситуаций.
                        </div>
                    </div>
                    <div className="">
                        {!autorization ? (
                            <>
                                <div className="sm:flex hidden mt-8 mr-20">
                                    <Link to="/signup">
                                        <Button>Войти</Button>
                                    </Link>
                                </div>
                                <img
                                    src="logOutMobile.png"
                                    alt="logOutMobile"
                                    className="sm:hidden mr-20 mt-8 "
                                />
                            </>
                        ) : (
                            <>
                                <div className="sm:flex hidden mt-8 mr-20">
                                    <Link to="/signup">
                                        <Button onClick={singOutHandler}>
                                            Выйти
                                        </Button>
                                    </Link>
                                </div>
                                <img
                                    src="logOutMobile.png"
                                    alt="logOutMobile"
                                    className="sm:hidden mr-20 mt-8 "
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap justify-start  gap-4 mt-8 mr-8 ml-8 lg:flex lg:mt-12 lg:mr-20 lg:ml-20">
                {users.map((user) => (
                    <button
                        key={user.id}
                        onClick={()=>handleClick(user.id)}
                        className="flex gap-4 flex-col border-xl shadow-sm border rounded-lg items-center"
                    >
                        <img
                            src={user.avatar}
                            alt="Avatar"
                            className="w-32 h-32 mt-12 mr-20 ml-20 mb-4  rounded-full "
                        />
                        <div className="text-xl mr-20 ml-20 ">
                            {user.first_name}
                        </div>
                        <div className="w-[265px] h-7 mb-5 mr-5 ml-5 flex justify-end">
                            <div className="bg-customGray w-auto h-auto flex justify-center items-center">
                                <img
                                    className="w-4 h-3"
                                    src="/like.svg"
                                    alt="#"
                                />
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

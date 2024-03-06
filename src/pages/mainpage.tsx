import React, { useEffect, useState } from "react";
import { Button } from "../components/button";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

interface UserData {
    id: number;
    avatar: string;
    first_name: string;
}

export const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const [users, setUsers] = useState<UserData[]>([]);
    const [autorization, setAutorization] = useState(false);

    useEffect(() => {
        fetch("https://reqres.in/api/users?page=2")
            .then((res) => res.json())
            .then((data) => setUsers(data.data));
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

    function handleClick() {
        navigate("/AboutPerson");
    }

    return (
        <div className="flex flex-col w-screen h-screen items-center font-roboto">
            <div className="flex flex-col">
                <div className="">
                    {!autorization ? (
                        <div className=" hidden lg:mt-8 lg:mt-8ml-[1295px] absolute ">
                            <Link to="/signup">
                                <Button>Войти</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className=" ">
                            <Link to="/signup">
                                <Button onClick={singOutHandler}>Выйти</Button>
                            </Link>
                        </div>
                    )}
                </div>
                <div className="bg-Violet text-white w-screen ">
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
                </div>
            </div>
            <div className="flex flex-wrap justify-start  gap-4 mt-8 mr-8 ml-8 lg:flex lg:mt-12 lg:mr-20 lg:ml-20">
                {users.map((user) => (
                    <button
                        key={user.id}
                        onClick={handleClick}
                        className="flex gap-4 flex-col border-xl shadow-sm border rounded-lg items-center"
                    >
                        <img
                            src={user.avatar}
                            alt="Avatar"
                            className="mt-12 mr-20 ml-20 mb-4  rounded-full "
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

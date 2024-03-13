import { useEffect, useState } from "react";
import { Button } from "../components/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AboutPerson = () => {
    const [authorization, setAuthorization] = useState(false);
    const auth = getAuth();
    
    const [user, setUser] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthorization(!!user);
        });
        return () => unsubscribe();
    }, [auth]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://reqres.in/api/users/${id}`
                );
                setUser(response.data.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchData();
    }, [id]);

    return authorization ? (
        <div className="flex flex-col w-screen h-screen">
            <div className="bg-Violet w-screen h-auto sm:h-64 sm:flex sm:flex-row">
                <div className="flex flex-row ">
                    <div className="mt-3 ml-4  sm:ml-20 sm:mt-8 sm:mr-7 ">
                        <div className="sm:mr-7 sm:text-center">
                            <div className="hidden sm:block text-white ">
                                <Link to="/">
                                    <Button>Назад</Button>
                                </Link>
                            </div>
                            <img
                                src="/public/arrowLeft.svg"
                                className="block sm:hidden"
                                alt=""
                                onClick={()=>navigate("/")}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row items-center sm:mb-10 mb-16 ">
                        <div className="flex gap-4 items-center flex-col sm:gap-8 mt-16 sm:flex-row sm:justify-center ">
                            <div className="order-3 sm:order-1 w-44 h-44 ">
                                <img
                                    src={user.avatar}
                                    className="w-44 h-44 rounded-full"
                                    alt="User Avatar"
                                />
                            </div>
                            <div className="order-1 sm:order-2 flex-col sm:mt-7 sm:mb-7  text-white">
                                <div className="text-4xl sm:text-6xl sm:mb-4 ">
                                    {user.first_name} {user.last_name}
                                </div>
                                <div className="order-2  text-xl sm:justify-start sm:text-3xl">
                                    партнер
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sm:mt-8 justify-end mt-8">
                        <div className="hidden ml-96 sm:block text-white">
                            <Button>Выход</Button>
                        </div>
                        <img
                            src="/public/mobileSignOut.svg"
                            className="sm:hidden block"
                            alt=""
                        />
                    </div>
                </div>
            </div>

            <div className="flex-col mt-12 flex sm:flex sm:flex-row sm:gap-32 sm:w-screen">
                <div className="order-2 sm:order-1 sm:ml-48 sm:mb-72 sm:w-full">
                    <p className="mr-4 ml-4 sm:text-base sm:leading-5">
                        Клиенты видят в нем эксперта по вопросам разработки
                        комплексных решений финансовых продуктов, включая такие
                        аспекты, как организационная структура, процессы,
                        аналитика и ИТ-компоненты. Он помогает клиентам лучше
                        понимать структуру рисков их бизнеса, улучшать процессы
                        за счет применения новейших технологий и увеличивать
                        продажи, используя самые современные аналитические
                        инструменты.
                        <br />
                        <br />
                        В работе с клиентами недостаточно просто решить
                        конкретную проблему или помочь справиться с трудностями.
                        Не менее важно уделять внимание обмену знаниями: "Один
                        из самых позитивных моментов — это осознание того, что
                        ты помог клиенту перейти на совершенно новый уровень
                        компетентности, уверенность в том, что после окончания
                        проекта у клиента есть все необходимое, чтобы дальше
                        развиваться самостоятельно".
                        <br />
                        <br />
                        Помимо разнообразных проектов для клиентов финансового
                        сектора, Сорин ведет активную предпринимательскую
                        деятельность. Он является совладельцем сети клиник
                        эстетической медицины в Швейцарии, предлагающей
                        инновационный подход к красоте, а также инвестором
                        других бизнес-проектов.
                    </p>
                </div>
                <div className="order-1 mb-8 sm:order-2 flex flex-col smLmt-12 sm:mr-72 ">
                    <div className="ml-4">
                        <div className="mb-6 mr-4 flex gap-2">
                            <img src="/public/phonePhoto.svg" alt="#" />
                            <div className="text-base">+7 (954) 333-44-55</div>
                        </div>
                        <div className="flex gap-2">
                            <img src="/public/emailPhoto.svg" alt="#" />
                            <div className="text-base">{user.email}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div>Вы не авторизованы</div>
    );
};

export default AboutPerson;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Signup } from "./pages/signup";
import { MainPage } from "./pages/mainpage";
import { Provider } from "react-redux";
import "./firebase";
import { store } from "./store";
import AboutPerson from "./pages/AboutPerson";


function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/signup" element={<Signup  />} />
                    <Route path="/aboutperson/:id" element={<AboutPerson/>} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import Group1Page from "./pages/Group1Page";
import Group2Page from "./pages/Group2Page";
import Group3Page from "./pages/Group3Page";
import Group4Page from "./pages/Group4Page";
import Group5Page from "./pages/Group5Page";
import Group6Page from "./pages/Group6Page";
import Group7Page from "./pages/Group7Page";
import Group8Page from "./pages/Group8Page";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import SurverPage from "./pages/SurveyPage";
import SurveyPage2 from "./pages/SurveyPage2";
import SurveyPage3 from "./pages/SurveyPage3";
import NoticePage from "./pages/NoticePage";
import FinalPage from "./pages/FinalPage";
import FindPasswordPage from "./pages/FindPasswordPage";
import Group1SecondPage from "./pages/Group1SecondPage";
import Group2SecondPage from "./pages/Group2SecondPage";
import Group3SecondPage from "./pages/Group3SecondPage";
import Group4SecondPage from "./pages/Group4SecondPage";
import Group5SecondPage from "./pages/Group5SecondPage";
import Group6SecondPage from "./pages/Group6SecondPage";
import Group7SecondPage from "./pages/Group7SecondPage";
import Group8SecondPage from "./pages/Group8SecondPage";
import PerformanceInformationPage from "./pages/PerformanceInformationPage";

function Main() {
  const [loginStatus, setLoginStatus] = useState(localStorage.getItem("ID"));
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage setLoginStatus={setLoginStatus} />} />
          <Route path="group">
            <Route path="1">
              <Route index element={<Group1Page loginStatus={loginStatus} />} />
              <Route
                path="second"
                element={<Group1SecondPage loginStatus={loginStatus} />}
              />
            </Route>
            <Route path="2">
              <Route index element={<Group2Page loginStatus={loginStatus} />} />
              <Route
                path="second"
                element={<Group2SecondPage loginStatus={loginStatus} />}
              />
            </Route>
            <Route path="3">
              <Route index element={<Group3Page loginStatus={loginStatus} />} />
              <Route
                path="second"
                element={<Group3SecondPage loginStatus={loginStatus} />}
              />
            </Route>
            <Route path="4">
              <Route index element={<Group4Page loginStatus={loginStatus} />} />
              <Route
                path="second"
                element={<Group4SecondPage loginStatus={loginStatus} />}
              />
            </Route>
            <Route path="5">
              <Route index element={<Group5Page loginStatus={loginStatus} />} />
              <Route
                path="second"
                element={<Group5SecondPage loginStatus={loginStatus} />}
              />
            </Route>
            <Route path="6">
              <Route index element={<Group6Page loginStatus={loginStatus} />} />
              <Route
                path="second"
                element={<Group6SecondPage loginStatus={loginStatus} />}
              />
            </Route>
            <Route path="7">
              <Route index element={<Group7Page loginStatus={loginStatus} />} />
              <Route
                path="second"
                element={<Group7SecondPage loginStatus={loginStatus} />}
              />
            </Route>
            <Route path="8">
              <Route index element={<Group8Page loginStatus={loginStatus} />} />
              <Route
                path="second"
                element={<Group8SecondPage loginStatus={loginStatus} />}
              />
            </Route>
          </Route>
          <Route path="register" element={<RegisterPage />} />
          <Route path="findpassword" element={<FindPasswordPage />} />
          <Route
            path="survey"
            element={<SurverPage loginStatus={loginStatus} />}
          />
          <Route
            path="survey2"
            element={<SurveyPage2 loginStatus={loginStatus} />}
          />
          <Route
            path="survey3"
            element={<SurveyPage3 loginStatus={loginStatus} />}
          />
          <Route
            path="notice"
            element={<NoticePage loginStatus={loginStatus} />}
          />
          <Route
            path="perfinf"
            element={<PerformanceInformationPage loginStatus={loginStatus} />}
          />
          <Route path="end" element={<FinalPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;

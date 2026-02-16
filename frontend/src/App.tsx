import "./styles/main.scss";
import MemberListPage from "./pages/MembersListPage";
import Layout from "./components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodaysClassPage from "./pages/TodaysClassPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<div>ホームページ (Coming soon)</div>} />
          <Route path="/members" element={<MemberListPage />} />
          <Route path="/attendance" element={<TodaysClassPage />} />
        </Routes>
        <MemberListPage />
      </Layout>
    </BrowserRouter>
  );
}

export default App;

import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LayOut from "./components/Layout";
import News from "./pages/News";
import MyNft from "./pages/MyNft";
import Trade from "./pages/Trade";
import Settings from "./pages/Settings";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayOut />}>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/my-nft" element={<MyNft />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

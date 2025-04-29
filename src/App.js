import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Public from "./routes/Public";
import Admin from "./routes/Admin";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ChatboxButton from "./components/Shared/Navigation/ChatboxButton/ChatboxButton";
import BackToTopButton from "./components/Shared/Navigation/BackToTopButton/BackToTopButton";
import { openChat } from "./services/chatService";
import { floatingButtonsConfig } from "./config/floatingButtonsConfig";

const ScrollToTop = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return children;
};

const AppContent = () => {
  const { chatbox, backToTop } = floatingButtonsConfig;
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const handleChatboxClick = () => {
    openChat(chatbox.defaultService, chatbox.defaultConfig);
  };

  return (
    <>
      <Routes>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="*" element={<Public />} />
      </Routes>
      {!isAdminRoute && (
        <>
          <ChatboxButton
            onClick={handleChatboxClick}
            iconSrc={chatbox.iconSrc}
            size={chatbox.size}
            backgroundColor={chatbox.backgroundColor}
          />
          <BackToTopButton
            scrollThreshold={backToTop.scrollThreshold}
            size={backToTop.size}
            backgroundColor={backToTop.backgroundColor}
          />
        </>
      )}
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop>
        <AppContent />
      </ScrollToTop>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Public from "./routes/Public";
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

function App() {
  const { chatbox, backToTop } = floatingButtonsConfig;

  const handleChatboxClick = () => {
    openChat(chatbox.defaultService, chatbox.defaultConfig);
  };

  return (
    <Router>
      <ScrollToTop>
        <Public />
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
      </ScrollToTop>
    </Router>
  );
}

export default App;

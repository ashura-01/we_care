import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import AiChat from "./components/AiChat"; // Import the new chat

const Layout = () => {
  // State to control the sidebar
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);

  return (
    <>
      {/* Pass the open function to the NavBar */}
      <NavBar onOpenChat={openChat} />
      
      {/* The invisible sidebar sitting on the right edge */}
      <AiChat isOpen={isChatOpen} onClose={closeChat} />
      
      {/* Pass the open function to any page rendered inside the Layout (like Home!) */}
      <Outlet context={{ openChat }} />
    </>
  );
};

export default Layout;
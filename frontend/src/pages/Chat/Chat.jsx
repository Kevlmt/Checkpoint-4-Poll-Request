/* eslint-disable import/no-unresolved */
import Header from "@components/Header";
import { useState } from "react";
import AsideChat from "./Components/AsideChat";
import ContentChat from "./Components/ContentChat";
import "./Chat.scss";

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chat-page">
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="chat-page-content">
        <AsideChat isOpen={isOpen} setIsOpen={setIsOpen} />
        <ContentChat />
      </div>
    </div>
  );
}

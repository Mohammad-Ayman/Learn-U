import React, { createContext, useContext, useState } from "react";

const AccordionContext = createContext();

export const useAccordionContext = () => {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error("AccordionContext must be used within AccordionProvider");
  }
  return ctx;
};

export const Accordion = ({ className = undefined, children }) => {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (id) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter((item) => item !== id));
    } else {
      setOpenItems([...openItems, id]);
    }
  };

  const ctxValues = {
    openItems,
    toggleItem,
  };

  return (
    <AccordionContext.Provider value={ctxValues}>
      <ul className={className}>{children}</ul>
    </AccordionContext.Provider>
  );
};

const AccordionItemContext = createContext();
const useAccordionItemContext = () => {
  const ctx = useContext(AccordionItemContext);
  if (!ctx) {
    throw new Error(
      "AccordionItemContext must be used within AccordionItemProvider"
    );
  }
  return ctx;
};

const AccordionItem = ({ id, className = undefined, children }) => {
  const { openItems } = useAccordionContext();
  const isOpen = openItems.includes(id);
  const contextValue = { id, isOpen };

  return (
    <AccordionItemContext.Provider value={contextValue}>
      <li className={className}>{children}</li>
    </AccordionItemContext.Provider>
  );
};

const AccordionTitle = ({ className = undefined, children }) => {
  const { toggleItem } = useAccordionContext();
  const { id } = useAccordionItemContext();
  const handleClick = () => {
    toggleItem(id);
  };
  return (
    <article className={className} onClick={handleClick}>
      {children}
    </article>
  );
};

const AccordionContent = ({ className = undefined, children }) => {
  const { isOpen } = useAccordionItemContext();
  const contentStyle = isOpen ? "block" : "none";
  return (
    <article style={{ display: contentStyle }} className={className}>
      {children}
    </article>
  );
};

Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;

export default Accordion;

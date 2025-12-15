import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TabComponent = ({
  tabSection,
  children,
  style
}) => {
  const [active, setActive] = useState(tabSection[0][0].label);
  const allTabs = tabSection.flat(); // merges nested arrays into one
  const activeTab = allTabs.find((tab) => tab.label === active);

  return (
    <>
      {
        tabSection.map((tabs, index) => (
            <div key={index} className={`${style} bg-gray-200 p-1 rounded-full flex justify-between relative overflow-hidden mb-4`}>
              {tabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setActive(tab.label)}
                  className="relative z-10 w-full text-center px-4 py-0 h-[25px] rounded-full font-medium text-sm transition text-gray-700 hover:text-gray-900"
                >
                  {active === tab.label && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-white rounded-full shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${active === tab.label ? "text-gray-900" : "text-gray-700"}`}>
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
        ))
      }
      <div>
        { children }
      </div>
      <div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

export default TabComponent
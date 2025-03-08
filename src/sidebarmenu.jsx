import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FaAngleRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const menuAnimation = {
  hidden: {
    opacity: 0,
    height: 0,
    padding: 0,
    transition: { duration: 0.3, when: "afterChildren" },
  },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      when: "beforeChildren",
    },
  },
};

const menuItemAnimation = {
  hidden: (i) => ({
    padding: 0,
    x: "-100%",
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
  show: (i) => ({
    x: 0,
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
};

const SidebarMenu = ({
  route,
  showAnimation,
  isOpen,
  setIsOpen,
  activePaths,
  setActivePaths,
}) => {
  console.log("test route", route);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setActivePaths((prev) => [...prev, route.name]);
    console.log("opening", route);
    setIsMenuOpen(!isMenuOpen);
    setIsOpen(true);
  };

  useEffect(() => {
    console.log(activePaths, "activeeeeeeeeeeeeeeee");
    if (!isOpen) {
      setIsMenuOpen(false);
    }
  }, [isOpen]);

  return (
    <>
      <div className="menu" onClick={toggleMenu}>
        <div className="menu_item">
          <div className="icon">{route.icon}</div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="link_text"
              >
                {route.name
                  .split(" ")
                  .map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  )
                  .join(" ")}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {isOpen && (
          <motion.div
            animate={
              isMenuOpen
                ? {
                    rotate: 90,
                  }
                : { rotate: 0 }
            }
          >
            <FaAngleRight className="arrow-icon pe-2" />
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="menu_container"
          >
            {route.subRoutes.map((subRoute, i) => (
              <motion.div variants={menuItemAnimation} key={i} custom={i}>
                {subRoute.subRoutes ? (
                  <SidebarMenu
                    route={subRoute}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    activePaths={activePaths}
                    setActivePaths={setActivePaths}
                  />
                ) : (
                  <a
                    to={subRoute.path}
                    className={({ isActive }) =>
                      isActive ? "link active-link" : "link"
                    }
                    // className="link"
                    // exact
                    // isActive={(match, location) => match && match.isExact}
                    // activeClassName="active-link"
                    // onClick={() => setIsOpen(false)} //Add Code
                  >
                    <div className="icon">{subRoute.icon}</div>
                    <motion.div className="link_text">
                      {subRoute.name}
                    </motion.div>
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SidebarMenu;

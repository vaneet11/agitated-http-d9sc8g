import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useState, useEffect, useRef, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SideBarMenu from "./sidebarmenu";
import routeMap from "./routeMap";

const SideBar = () => {
  const sidebarRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activePaths, setActivePaths] = useState([]);

  const findRouteKey = (path) => {
    return (
      Object.entries(routeMap)
        .filter(([key, value]) => path.startsWith(value))
        .sort((a, b) => b[1].length - a[1].length)?.[0]?.[0] || null
    );
  };

  const route_arr = [
    {
      menu_details: {
        title: "PROJECT MANAGEMENT",
      },
      submenus: {
        allmenu: [
          {
            DiplayName: "Candidate Details Verify",
            ObjectType: "2",
          },
          {
            DiplayName: "Feedback Submitted",
            ObjectType: "7",
          },
        ],
        "sub-section": [
          {
            DiplayName: "Submenu Item 1",
            ObjectType: "3",
          },
          {
            DiplayName: "Submenu Item 2",
            ObjectType: "4",
          },
        ],
      },
    },
    {
      menu_details: {
        title: "Human Resource",
      },
      submenus: {
        allmenu: [
          {
            DiplayName: "Offer Accepted",
            ObjectType: "6",
          },
        ],
        "sub-section": [
          {
            DiplayName: "Submenu Item A",
            ObjectType: "5",
          },
        ],
      },
    },
  ];

  let routeKey = [];
  const { new_routes, alloweObjectIds } = useMemo(() => {
    let new_routes = [];
    let alloweObjectIds = [];

    if (Array.isArray(route_arr)) {
      for (let row of route_arr) {
        if (
          [
            "ROM",
            "PROJECT MANAGEMENT",
            "Human Resource",
            "TIME SHEET",
            "SUPPORT DESK",
            "PAYROLL",
            "ORGANIZATION",
            "Payroll Management",
          ].includes(row.menu_details.title)
        ) {
          let temp = {
            name: row.menu_details.title,
            path: "/",
            exact: true,
            subRoutes: [],
          };

          let subMenuArr = [];
          if (row.submenus && Object.keys(row.submenus).length > 0) {
            Object.keys(row.submenus).forEach((subkey) => {
              if (
                ![
                  "allmenu",
                  "Report",
                  "List",
                  "Training",
                  "Resource",
                  "Task",
                  "Attendance",
                ].includes(subkey)
              ) {
                let subSubRoute = [];
                for (let childMenu of row.submenus[subkey]) {
                  if (
                    ![
                      "Incentives Master",
                      "Award Master",
                      "Internal Project",
                      "My Projects",
                      "Project Status Report",
                      "Cancel Leave Request",
                      "Incentive List (Training)",
                      "Update Incentive List(Consulting & Content)",
                      "Incentive List",
                      "Incentive List Fixed Bid",
                      "Team Incentives",
                      "Payroll Statement",
                      "Expense Settlement Statement",
                      "Expense Settlement",
                    ].includes(childMenu.DiplayName)
                  ) {
                    alloweObjectIds.push(childMenu.ObjectType);
                    subSubRoute.push({
                      path: routeMap[childMenu.ObjectType],
                      name: childMenu.DiplayName,
                    });
                  }
                }
                subMenuArr.push({
                  path: "/",
                  name: subkey,
                  subRoutes: subSubRoute,
                });
              }
            });

            temp.subRoutes = subMenuArr;
          }

          if (row.submenus?.allmenu) {
            for (let first_row of row?.submenus?.allmenu) {
              if (
                ![
                  "Attendance Register",
                  "Attendance Book Statement",
                  "Attendance In Out Summary",
                  "Attendance Log Statement",
                  "Attendance Book Summary",
                  "Holiday",
                  "Shift",
                  "Employee Qualification",
                  "Attendance Status",
                  "HR Calendars",
                  "Department",
                  "Designation",
                  "Skills",
                  "Employee Report",
                  "Employee List",
                  "Attendance Statement",
                  "Attendance Approval",
                  "Daily Attendance",
                  "Mark Attendance",
                  "HR Incentive List",
                  "Income Tax Slab",
                  "Employee Payrolls List",
                  "Payroll Statement",
                  "Employee Leave",
                  "Employee Shifts",
                  "Employee Leave List",
                  "Employee Shifts List",
                  "Payroll Journal Voucher",
                  "Payroll Journal Voucher List",
                  "Employee Payment",
                  "Employee Payrolls",
                ].includes(first_row.DiplayName)
              ) {
                alloweObjectIds.push(first_row.ObjectType);
                subMenuArr.push({
                  path: routeMap[first_row.ObjectType],
                  name: first_row.DiplayName,
                });
              }
            }
          }

          temp.subRoutes = subMenuArr;
          new_routes.push(temp);
        }
      }
    }

    return { new_routes, alloweObjectIds };
  }, [route_arr]);

  let path = "/candidate-details-verify";
  routeKey = findRouteKey(path);

  console.log("locationPath::::: ", "/candidate-details-verify");
  console.log("alloweObjectIds::::: ", alloweObjectIds);
  console.log("routeKey::::: ", routeKey);

  const actionsArray = [
    "/candidate-details-verify",
    "/candidate-details-verify",
    "/addfeedback",
    "/view-feedbacks",
    "/feedback-link-expire",
    "/feedback-submitted",
    "/offer-accepted",
    "/dashboard",
  ];
  useEffect(() => {
    if (
      alloweObjectIds.includes(Number(routeKey)) ||
      checkAction("/candidate-details-verify")
    ) {
    } else {
      // navigate("/dashboard");
    }
  }, [routeKey, alloweObjectIds]);

  function checkAction(action) {
    return actionsArray.some((item) => action.startsWith(item));
  }

  // useEffect(() => {
  //   if (!alloweObjectIds.includes(Number(routeKey))) {
  //     navigate("/notfound");
  //   }
  // }, [routeKey, alloweObjectIds, navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggle = () => {
    console.log("opening Toglle");
    setIsOpen(!isOpen);
  };

  const showAnimation = {
    hidden: { width: 0, opacity: 0, transition: { duration: 0.5 } },
    show: { opacity: 1, width: "auto", transition: { duration: 0.5 } },
  };

  return (
    <div className="main-container">
      <div className="main-child" ref={sidebarRef}>
        <motion.div
          animate={{
            width: isOpen ? "220px" : "38px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className="sidebar"
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  ---
                </motion.h1>
              )}
            </AnimatePresence>
            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          {console.log("activeeeeeeeeeeeeeeee:sidebar", activePaths)}
          <section className="routes">
            {new_routes.map((route, index) => {
              return route.subRoutes ? (
                <SideBarMenu
                  key={index}
                  setIsOpen={setIsOpen}
                  route={route}
                  showAnimation={showAnimation}
                  isOpen={isOpen}
                  activePaths={activePaths}
                  setActivePaths={setActivePaths}
                />
              ) : (
                <NavLink
                  to={route.path}
                  key={index}
                  className={({ isActive }) => (isActive ? "active" : "link")}
                >
                  <div className="icon">X</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default SideBar;

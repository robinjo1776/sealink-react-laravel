import { useState, useEffect } from "react";
import { Button, Layout, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import MenuList from "./components/common/sidebar/MenuList";
import ToggleThemeButton from "./components/common/sidebar/ToggleThemeButton";
import { Header } from "antd/es/layout/layout";
import AppRoutes from "./routes.jsx";
import logo from "./assets/images/logo.jpg";
import "antd/dist/reset.css";
import "./styles/Table.css";

const { Sider } = Layout;

const App = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || "employee"
  ); // Default to employee

  useEffect(() => {
    // Retrieve theme preference from localStorage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setDarkTheme(storedTheme === "dark");
    }

    // Listen for changes in localStorage (e.g., role change)
    const handleStorageChange = () => {
      const role = localStorage.getItem("userRole") || "employee";
      setUserRole(role);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkTheme ? "dark" : "light";
    setDarkTheme(!darkTheme);
    localStorage.setItem("theme", newTheme); // Persist theme
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Router>
      <LayoutWithSidebar
        darkTheme={darkTheme}
        setCollapsed={setCollapsed}
        collapsed={collapsed}
        toggleTheme={toggleTheme}
        colorBgContainer={colorBgContainer}
        logo={logo}
        userRole={userRole}
      />
    </Router>
  );
};

const LayoutWithSidebar = ({
  darkTheme,
  setCollapsed,
  collapsed,
  toggleTheme,
  colorBgContainer,
  logo,
  userRole,
}) => {
  const location = useLocation();
  const authPages = ["/login", "/register", "/emp_login"];
  const isAuthPage = authPages.includes(location.pathname);

  return (
    <Layout style={{ height: "100vh" }}>
      {!isAuthPage && (
        <Sider
          collapsed={collapsed}
          collapsible
          trigger={null}
          className="sidebar"
          theme={darkTheme ? "dark" : "light"}
          width={200} // Fixed sidebar width
        >
          <MenuList darkTheme={darkTheme} userRole={userRole} />
          <ToggleThemeButton darkTheme={darkTheme} ToggleTheme={toggleTheme} />
        </Sider>
      )}
      <Layout>
        {!isAuthPage && (
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={logo}
              alt="App Logo"
              style={{ height: "40px", margin: "0 16px" }}
            />
            <Button
              className="toggle"
              onClick={() => setCollapsed(!collapsed)}
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />
          </Header>
        )}
        <Layout.Content
          style={{
            padding: "0 24px",
            minHeight: "calc(100vh - 64px)",
            width: "100%",
          }}
        >
          <AppRoutes userRole={userRole} /> {/* Pass userRole to routes */}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default App;

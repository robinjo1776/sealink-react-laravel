import { useMemo } from "react";
import { Menu } from "antd";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  BarsOutlined,
  DollarCircleOutlined,
  UsergroupAddOutlined,
  FileTextOutlined,
  FileDoneOutlined,
  FolderOpenOutlined,
  PayCircleOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "../../../styles/global.css"; 

const MenuList = ({ darkTheme, userRole }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const employeeItems = [
    {
      key: "crm-menu",
      icon: <UsergroupAddOutlined />,
      label: "CRM",
      children: [
        { key: "lead", label: <Link to="/lead">Leads</Link> },
        { key: "follow-up", label: <Link to="/follow-up">Lead F/U</Link> },
      ],
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  const adminItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },

    {
      key: "sales-quotes-menu",
      icon: <DollarCircleOutlined />,
      label: "Sales & Quotes",
      children: [
        { key: "sales-quotes", label: <Link to="/sales-quotes">Quotes</Link> },
        {
          key: "ads-ship",
          label: <Link to="/advertise-shipments">Ads Ship.</Link>,
        },
      ],
    },

    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  const items = useMemo(() => {
    console.log("Current user role in MenuList:", userRole);
    return userRole === "employee" ? employeeItems : adminItems;
  }, [userRole, employeeItems, adminItems]);

  console.log("Current user role in MenuList:", userRole);

  const getSelectedKeys = () => {
    return items.reduce((acc, item) => {
      if (
        item.label &&
        item.label.props &&
        item.label.props.to === currentPath
      ) {
        acc.push(item.key);
      }
      if (item.children) {
        item.children.forEach((child) => {
          if (child.label && child.label.props && child.label.props.to) {
            const childPath = child.label.props.to;
            if (
              currentPath === childPath ||
              currentPath.startsWith(childPath)
            ) {
              acc.push(item.key, child.key);
            }
          }
        });
      }
      return acc;
    }, []);
  };

  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      mode="inline"
      className="menu-bar"
      selectedKeys={getSelectedKeys()}
      items={items}
      inlineCollapsed={false}
    />
  );
};

MenuList.propTypes = {
  darkTheme: PropTypes.bool.isRequired,
  userRole: PropTypes.string.isRequired,
};

export default MenuList;

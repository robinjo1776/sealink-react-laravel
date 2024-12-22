import { useMemo } from 'react';
import { Menu } from 'antd';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HomeOutlined, TruckOutlined  , LogoutOutlined } from '@ant-design/icons';
import '../../../styles/global.css';

const MenuList = ({ darkTheme, userRole }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const employeeItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  const adminItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },


        {
          key: 'ads-ship',icon: <TruckOutlined />,
          label: <Link to="/shipment">Shipments</Link>,
        },


    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  const items = useMemo(() => {
    console.log('Current user role in MenuList:', userRole);
    return userRole === 'employee' ? employeeItems : adminItems;
  }, [userRole, employeeItems, adminItems]);

  console.log('Current user role in MenuList:', userRole);

  const getSelectedKeys = () => {
    return items.reduce((acc, item) => {
      if (item.label && item.label.props && item.label.props.to === currentPath) {
        acc.push(item.key);
      }
      if (item.children) {
        item.children.forEach((child) => {
          if (child.label && child.label.props && child.label.props.to) {
            const childPath = child.label.props.to;
            if (currentPath === childPath || currentPath.startsWith(childPath)) {
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
      theme={darkTheme ? 'dark' : 'light'}
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

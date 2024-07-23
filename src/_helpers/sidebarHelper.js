import { Link } from "react-router-dom";
import { isValidElement } from "react";
import { IoIosArrowDown } from "react-icons/io";

const subMenuIcon = <IoIosArrowDown size={20} />;

const getIcon = (icon) => {
  return (
    icon &&
    (isValidElement(icon) ? (
      <span className="ant-menu-item-icon">{icon}</span>
    ) : (
      <icon className="ant-menu-item-icon" />
    ))
  );
};

const renderMenuItemChildren = (item) => {
  const { icon, messageId, path } = item;
  if (path && path.includes("/"))
    return {
      key: item.path,
      icon: getIcon(icon),
      label: (
        <Link to={path}>
          <span data-testid={messageId.toLowerCase + "-nav"}>{item.title}</span>
        </Link>
      ),
    };
  else {
    return {
      key: item.path ? item.path : item.id,
      icon: getIcon(icon),
      label: (
        <span data-testid={messageId.toLowerCase + "-nav"}>{item.title}</span>
      ),
    };
  }
};

const renderMenuItem = (item) => {
  return item.type === "collapse" || item.type === "group"
    ? {
        key: item.path,
        ...renderMenuItemChildren(item),
        children: item.children.map((item) =>
          renderMenuItem({ ...item, icon: item.icon || subMenuIcon })
        ),
        type: item.type,
      }
    : {
        key: item.path,
        ...renderMenuItemChildren(item),
      };
};

const renderMenu = (item) => {
  return item.type === "group" || item.type === "collapse"
    ? {
        key: item.path ? item.path : item.id,
        ...renderMenuItemChildren(item),
        children: item.children.map((item) =>
          renderMenuItem({ ...item, icon: item.icon || subMenuIcon })
        ),
        type: item.type,
      }
    : {
        key: item.path,
        exact: item.exact,
        ...renderMenuItemChildren(item),
      };
};

export const getRouteMenus = (routesConfig) => {
  return routesConfig.map((route) => renderMenu(route));
};

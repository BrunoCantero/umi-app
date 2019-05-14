import React from 'react';
import { Menu, Icon } from 'antd';
import { router } from 'umi';
import { formatMessage } from 'umi-plugin-locale';

const { Item, SubMenu } = Menu;

function formatRoute(route) {
  return {
    title: route.title,
    icon: route.icon,
    path: route.path,
  };
}

function formatMenuData({ path, routes }) {
  const menuRoutes = routes.filter(route => route.path && route.path.startsWith(path) && !route.path.includes(':'));
  const menuData = [];
  const homeRoute = formatRoute(menuRoutes.find(route => route.path === path));
  menuData.push(homeRoute);
  const groupRouteLength = homeRoute.path.split('/').length + 1;
  menuRoutes.forEach((route) => {
    const paths = route.path.split('/');
    if (paths.length === groupRouteLength) { // Este es un grupo de rutas
      let subRoutes = menuRoutes.filter(menuRoute => menuRoute.path.startsWith(route.path) && menuRoute.path.split('/').length === groupRouteLength + 1);
      subRoutes = subRoutes.map(subRoute => formatRoute(subRoute));
      const formatedRoute = formatRoute(route);
      menuData.push(subRoutes.length ? { ...formatedRoute, routes: subRoutes } : formatedRoute);
    }
  });
  return menuData;
}

const MenuLabel = ({ icon, title }) => (
  <React.Fragment>
    {icon && <Icon type={icon} />}
    <span>{formatMessage({ id: title })}</span>
  </React.Fragment>
);

const MenuItem = ({ icon, title, path, ...props }) => (
  <Item key={path} {...props}>
    <MenuLabel icon={icon} title={title} />
  </Item>
);

class MainMenu extends React.Component {
  handleClick = path => () => {
    const { onCollapse } = this.props;
    router.push(path);
    onCollapse(true, 'menu');
  }

  render() {
    const { route, location } = this.props;
    const menuData = formatMenuData(route);
    let pathname = location.pathname.split('/');
    if (pathname[pathname.length - 1] === '') {
      pathname.pop();
    }
    pathname = pathname.join('/');
    return (
      <Menu theme="dark" mode="inline" selectedKeys={[pathname]}>
        {menuData.map(menu => (!menu.routes ? (
          <MenuItem {...menu} key={menu.path} onClick={this.handleClick(menu.path)} />
        ) : (
          <SubMenu
            key={menu.path}
            title={<MenuLabel {...menu} />}
          >
            {menu.routes.map(submenu => (
              <MenuItem key={submenu.path} {...submenu} onClick={this.handleClick(submenu.path)} />
            ))}
          </SubMenu>
        )
        ))}
      </Menu>
    );
  }
}

export default MainMenu;

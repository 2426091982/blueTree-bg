/**
 * 
 * @param {object[]} routes
 * @param {string} routes[].path
 * @param {object|string} routes[].redirect
 * @param {routes} routes[].children
 * @param {string|string[]} routes[].alias
 * @param {string} routes[].name
 * @param {string} routes[].beforeEnter
 * @param {string} routes[].props
 * @param {object} routes[].meta
 * @param {string} routes[].meta.title 导航栏标题
 * @param {string} routes[].meta.icon 导航栏图标
 * @param {string} routes[].meta.noRender 是否渲染导航栏
 * @param {string} routes[].meta.noBreadCrumb 是否渲染面包屑
 * @param {any} routes[].components
 * @param {any} routes[].component
 * @returns routes
 */
export function defineRoutes(routes) {
    return routes;
};
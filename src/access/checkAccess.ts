/**
 * 检查权限（检查当前登录用户是否具有某个权限）
 *
 */
import AccessEnum from "@/access/accessEnum";
import ACCESS_ENUM from "@/access/accessEnum";

const checkAccess = (
    loginUser: API.LoginUserVO,
    needAccess = AccessEnum.NOT_LOGIN,
) => {
    // 获取当前登录用户拥有的权限（如果没有登录，就代表没有权限）
    const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
    // 如果当前不需要任何权限
    if (needAccess === AccessEnum.NOT_LOGIN) {
        return true;
    }
    // 如果页面需要登录才可访问
    if (needAccess === AccessEnum.USER) {
        // 如果用户未登录，表示无权限
        if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
            return false;
        }
    }
    // 如果需要管理员权限才可访问
    if (needAccess === AccessEnum.ADMIN) {
        // 必须要有管理员权限，如果没有，则表示无权限
        return loginUserAccess === AccessEnum.ADMIN;
    }
    return true;
};

export default checkAccess;
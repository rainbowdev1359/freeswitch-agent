export const getFormatedDate = (date: string) => {
    const today = new Date(date);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // month is zero-based
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formatted = dd + '/' + mm + '/' + yyyy;
    return formatted;
}

export const filterSidebar = (permissions: [], requiredPermission: string, menus: any) => {
    const filters = permissions.filter(obj => obj.section_name.toLowerCase().includes(requiredPermission));
    const hasPermission = filters.every((filter) => !filter.is_permission);

    if (hasPermission) {
        return menus.filter((menu) => !menu.to.toLowerCase().includes(requiredPermission));
    }

    return menus;
}

export const filterGrant = (permissions: [], requiredPermission: string) => {
    const filters = permissions.filter(obj => obj.category_name.includes(requiredPermission));
    const hasPermission = filters.every((filter) => filter.is_permission);

    return hasPermission;
}
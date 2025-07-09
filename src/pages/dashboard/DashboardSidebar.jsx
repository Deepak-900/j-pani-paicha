import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    FiHome,
    FiPackage,
    FiShoppingCart,
    FiUsers,
    FiSettings,
    FiChevronDown,
    FiChevronUp,
    FiX,
    FiChevronLeft,
    FiChevronRight
} from 'react-icons/fi';
import Logo from '../../assets/logo.png';

const DashboardSidebar = ({ isOpen, onClose, isMobile }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [expandedMenu, setExpandedMenu] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const location = useLocation();
    const sidebarRef = useRef(null);

    const navItems = useMemo(() => [
        {
            id: 'home',
            to: "/dashboard",
            icon: FiHome,
            label: "Dashboard",
        },
        {
            id: 'products',
            icon: FiPackage,
            label: "Products",
            dropdownItems: [
                { to: "/dashboard/products", label: "All Products", icon: FiPackage },
                { to: "/dashboard/products/categories", label: "Categories", icon: FiChevronDown },
                { to: "/dashboard/products/inventory", label: "Inventory", icon: FiChevronDown },
                { to: "/dashboard/products/add-new", label: "Add New", icon: FiChevronDown },
            ],
        },
        {
            id: 'orders',
            icon: FiShoppingCart,
            label: "Orders",
            dropdownItems: [
                { to: "/dashboard/orders", label: "All Orders", icon: FiShoppingCart },
                { to: "/dashboard/orders/pending", label: "Pending", icon: FiChevronDown },
                { to: "/dashboard/orders/completed", label: "Completed", icon: FiChevronDown },
                { to: "/dashboard/orders/returns", label: "Returns", icon: FiChevronDown },
            ],
        },
        {
            id: 'users',
            icon: FiUsers,
            label: "Users",
            dropdownItems: [
                { to: "/dashboard/users", label: "All Users", icon: FiUsers },
                { to: "/dashboard/users/admins", label: "Admins", icon: FiChevronDown },
                { to: "/dashboard/users/customers", label: "Customers", icon: FiChevronDown },
                { to: "/dashboard/users/roles", label: "Roles", icon: FiChevronDown },
            ],
        },
        {
            id: 'settings',
            to: "/dashboard/settings",
            icon: FiSettings,
            label: "Settings",
        },
    ], []);

    useEffect(() => {
        setExpandedMenu(null);
        setHoveredItem(null);
    }, [collapsed]);

    useEffect(() => {
        if (collapsed) return;

        const activeMenu = navItems.find(item =>
            item.dropdownItems && item.dropdownItems.some(subItem =>
                location.pathname.startsWith(subItem.to)
            )
        );

        if (activeMenu) {
            setExpandedMenu(activeMenu.id);
        }
    }, [location.pathname, collapsed, navItems]);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const toggleMenu = (menuId) => {
        setExpandedMenu(expandedMenu === menuId ? null : menuId);
    };

    const handleItemHover = (itemId, event) => {
        if (!collapsed) return;

        const itemElement = event.currentTarget;
        const rect = itemElement.getBoundingClientRect();

        setPopupPosition({
            top: rect.top,
            left: rect.right + 8
        });
        setHoveredItem(itemId);
    };

    const handlePopupMouseEnter = () => {
        // Keep the popup open when mouse moves to it
    };

    const handlePopupMouseLeave = () => {
        setHoveredItem(null);
    };

    const getCollapseIcon = () => {
        if (isMobile) {
            return <FiX size={20} />;
        }
        return collapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />;
    };

    return (
        <aside
            ref={sidebarRef}
            className={`bg-white border-r border-gray-200 h-full flex flex-col transition-all duration-300 ease-in-out
                ${isMobile ? `fixed top-0 left-0 z-30 w-64 h-full ${isOpen ? 'translate-x-0' : '-translate-x-full'}` :
                    `relative ${collapsed ? 'w-16' : 'w-64'}`}`}
        >
            {/* Header with updated logo and button positioning */}
            <div className={`p-4 border-b border-gray-200 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
                <div className="flex items-center gap-2 relative">
                    <div className={`flex items-center justify-center ${collapsed ? 'mx-auto' : ''}`}>
                        <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center text-white font-bold flex-shrink-0">
                            <img src={Logo} alt="Logo" className="h-full w-auto" />
                        </div>
                        {!collapsed && (
                            <Link to={'/'} className="font-bold whitespace-nowrap ml-2">
                                <span className='text-xl'>
                                    <span className="text-black">J</span>
                                    <span className="text-[#2c4358]"> PANI </span>
                                    <span className="text-[#ea8442]"> PAICHA </span>
                                </span>
                            </Link>
                        )}
                    </div>

                    {!isMobile && !collapsed && (
                        <button
                            onClick={toggleCollapse}
                            className="p-1 -mr-3 rounded-md hover:bg-gray-100 flex-shrink-0"
                        >
                            <FiChevronLeft size={20} className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
                        </button>
                    )}
                </div>

                {!isMobile && collapsed && (
                    <button
                        onClick={toggleCollapse}
                        className="absolute left-16 py-1 border border-gray-200 border-l-0 rounded-r-md  bg-white hover:bg-gray-100 flex-shrink-0 z-10"
                    >
                        <FiChevronRight size={20} />
                    </button>
                )}

                {isMobile && !collapsed && (
                    <button
                        onClick={onClose}
                        className="p-1 rounded-md hover:bg-gray-100 flex-shrink-0"
                    >
                        <FiX size={20} />
                    </button>
                )}
            </div>

            {/* Navigation - keep existing */}
            <nav className="flex-1 overflow-y-auto p-3">
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.to ||
                            (item.dropdownItems?.some(sub => location.pathname.startsWith(sub.to)));

                        const ItemButton = (
                            <button
                                onClick={() => !collapsed && toggleMenu(item.id)}
                                onMouseEnter={(e) => handleItemHover(item.id, e)}
                                onMouseLeave={() => !collapsed && setHoveredItem(null)}
                                className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors duration-200
                                    ${isActive ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}
                                    ${collapsed ? 'justify-center' : ''}`}
                            >
                                <div className="flex items-center">
                                    <item.icon className={`text-lg ${collapsed ? '' : 'mr-3'}`} />
                                    {!collapsed && <span className="font-medium">{item.label}</span>}
                                </div>
                                {!collapsed && item.dropdownItems && (expandedMenu === item.id ? <FiChevronUp /> : <FiChevronDown />)}
                            </button>
                        );

                        return (
                            <li
                                key={item.id}
                                className="relative group"
                                onMouseEnter={() => !collapsed && setHoveredItem(item.id)}
                                onMouseLeave={() => !collapsed && setHoveredItem(null)}
                            >
                                {item.dropdownItems ? (
                                    <>
                                        {ItemButton}
                                        {!collapsed && expandedMenu === item.id && (
                                            <ul className="ml-8 mt-1 space-y-1">
                                                {item.dropdownItems.map(subItem => (
                                                    <li key={subItem.to}>
                                                        <Link
                                                            to={subItem.to}
                                                            className={`flex items-center px-3 py-2 rounded-lg text-sm
                                                                ${location.pathname.startsWith(subItem.to) ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                                                            onClick={isMobile ? onClose : undefined}
                                                        >
                                                            <subItem.icon className="w-4 h-4 mr-3" />
                                                            {subItem.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        to={item.to}
                                        onMouseEnter={(e) => handleItemHover(item.id, e)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                        className={`flex items-center p-3 rounded-lg transition-colors duration-200
                                            ${location.pathname === item.to ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}
                                            ${collapsed ? 'justify-center' : ''}`}
                                        onClick={isMobile ? onClose : undefined}
                                    >
                                        <item.icon className={`text-lg ${collapsed ? '' : 'mr-3'}`} />
                                        {!collapsed && <span className="font-medium">{item.label}</span>}
                                    </Link>
                                )}

                                {/* Hover Popup for collapsed sidebar */}
                                {collapsed && hoveredItem === item.id && (
                                    <div
                                        className="fixed z-50 shadow-xl rounded-lg bg-white border border-gray-200 min-w-[200px]"
                                        style={{
                                            top: `${popupPosition.top}px`,
                                            left: `${popupPosition.left}px`
                                        }}
                                        onMouseEnter={handlePopupMouseEnter}
                                        onMouseLeave={handlePopupMouseLeave}
                                    >
                                        <div className="py-2">
                                            {item.dropdownItems ? (
                                                <>
                                                    <div className="px-4 py-2 font-medium border-b border-gray-100">
                                                        {item.label}
                                                    </div>
                                                    <ul className="py-1">
                                                        {item.dropdownItems.map(subItem => (
                                                            <li key={subItem.to}>
                                                                <Link
                                                                    to={subItem.to}
                                                                    className={`flex items-center px-4 py-2 text-sm
                                                                        ${location.pathname.startsWith(subItem.to) ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                                                                    onClick={onClose}
                                                                >
                                                                    <subItem.icon className="w-4 h-4 mr-3" />
                                                                    {subItem.label}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </>
                                            ) : (
                                                <Link
                                                    to={item.to}
                                                    className={`flex items-center px-4 py-2 text-sm
                                                        ${location.pathname === item.to ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                                                    onClick={onClose}
                                                >
                                                    <item.icon className="w-4 h-4 mr-3" />
                                                    {item.label}
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className={`p-4 border-t border-gray-200 ${collapsed ? 'px-3' : ''}`}>
                <div className="flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
                    {!collapsed && (
                        <div className="ml-3">
                            <p className="font-medium truncate">Admin User</p>
                            <p className="text-xs text-gray-500 truncate">Administrator</p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default React.memo(DashboardSidebar);
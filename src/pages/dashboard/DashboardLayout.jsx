import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (!mobile) {
                setSidebarOpen(true); // Always show sidebar on desktop
            } else {
                setSidebarOpen(false); // Hide by default on mobile
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar - now positioned absolutely on mobile */}
            <DashboardSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                isMobile={isMobile}
            />

            {/* Main content area */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Mobile header */}
                <header className="lg:hidden sticky top-0 z-10 bg-white shadow-sm p-3 flex justify-between items-center border-b border-gray-200">
                    <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
                    <button
                        onClick={toggleSidebar}
                        className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
                    >
                        {sidebarOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
                    </button>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-auto">
                    <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Overlay - only shown on mobile when sidebar is open */}
            {isMobile && sidebarOpen && (
                <div
                    className="fixed inset-0bg-opacity-90 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default DashboardLayout;
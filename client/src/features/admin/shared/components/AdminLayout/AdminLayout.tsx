import { useAdminLayout } from './files/AdminLayout.hook';
import { ADMIN_LAYOUT_STYLES } from './files/AdminLayout.styles';
import type { AdminLayoutProps } from './files/AdminLayout.types';

// Import components
import AdminHeader from '../AdminHeader';
import AdminSidebar from '../AdminSidebar';

/**
 * @component AdminLayout
 * @description Layout component for admin dashboard with sidebar and header
 *
 * @dependencies useAdminLayout hook, AdminHeader, AdminSidebar
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const AdminLayout = (props: AdminLayoutProps) => {
    const {
        isSidebarOpen,
        toggleSidebar,
        closeSidebar,
    } = useAdminLayout(props);

    return (
        <div className={ADMIN_LAYOUT_STYLES.container}>
            {/* Header */}
            <AdminHeader 
                onToggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
            />

            {/* Sidebar */}
            <AdminSidebar 
                isOpen={isSidebarOpen}
                onClose={closeSidebar}
            />

            {/* Main Content */}
            <main className={ADMIN_LAYOUT_STYLES.main}>
                <div className={ADMIN_LAYOUT_STYLES.content}>
                    {props.children}
                </div>
            </main>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div 
                    className={ADMIN_LAYOUT_STYLES.overlay}
                    onClick={closeSidebar}
                />
            )}
        </div>
    );
};

export default AdminLayout;

import { useAdminHeader } from './files/AdminHeader.hook';
import { ADMIN_HEADER_STYLES } from './files/AdminHeader.styles';
import type { AdminHeaderProps } from './files/AdminHeader.types';

/**
 * @component AdminHeader
 * @description Header component for admin dashboard with user info and controls
 *
 * @dependencies useAdminHeader hook, AdminHeader.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const AdminHeader = (props: AdminHeaderProps) => {
    const {
        user,
        isDropdownOpen,
        userInitials,
        formattedEmail,
        companyName,
        logoPath,
        toggleDropdown,
        handleLogout,
    } = useAdminHeader(props);

    return (
        <header className={ADMIN_HEADER_STYLES.container}>
            <div className={ADMIN_HEADER_STYLES.content}>
                {/* Mobile Menu Button */}
                <button
                    onClick={props.onToggleSidebar}
                    className={ADMIN_HEADER_STYLES.mobileMenuButton}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Logo */}
                <div className={ADMIN_HEADER_STYLES.logo.container}>
                    <div className={ADMIN_HEADER_STYLES.logo.imageWrapper}>
                        <div className={ADMIN_HEADER_STYLES.logo.glow}></div>
                        <img
                            src={logoPath}
                            alt={`${companyName} Logo`}
                            className={ADMIN_HEADER_STYLES.logo.image}
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                    </div>
                    <span className={ADMIN_HEADER_STYLES.logo.text}>{companyName}</span>
                </div>

                {/* Title */}
                <div className={ADMIN_HEADER_STYLES.title.container}>
                    <h1 className={ADMIN_HEADER_STYLES.title.text}>
                        Dashboard Administrateur
                    </h1>
                    <span className={ADMIN_HEADER_STYLES.title.decoration}>
                        Gestion du système
                    </span>
                </div>

                {/* User Section */}
                <div className={ADMIN_HEADER_STYLES.user.container}>
                    <button
                        onClick={toggleDropdown}
                        className={ADMIN_HEADER_STYLES.user.button}
                    >
                        <span className={ADMIN_HEADER_STYLES.user.emailText}>
                            {formattedEmail}
                        </span>
                        <div className={ADMIN_HEADER_STYLES.user.avatar}>
                            {userInitials}
                        </div>
                        <svg className={ADMIN_HEADER_STYLES.user.dropdownIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className={ADMIN_HEADER_STYLES.user.dropdown.container}>
                            <button
                                onClick={handleLogout}
                                className={ADMIN_HEADER_STYLES.user.dropdown.item}
                            >
                                <svg className={ADMIN_HEADER_STYLES.user.dropdown.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span className={ADMIN_HEADER_STYLES.user.dropdown.text}>
                                    Déconnexion
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Decorative Elements */}
            <div className={ADMIN_HEADER_STYLES.decorative.leftAccent}></div>
            <div className={ADMIN_HEADER_STYLES.decorative.rightAccent}></div>
            <div className={ADMIN_HEADER_STYLES.decorative.bottomGlow}></div>
        </header>
    );
};

export default AdminHeader;

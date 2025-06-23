import { useUserHeader } from './files/UserHeader.hook';
import { USER_HEADER_STYLES } from './files/UserHeader.styles';
import type { UserHeaderProps } from './files/UserHeader.types';

/**
 * @component UserHeader
 * @description Rich header component for authenticated users with decorative patterns
 */
const UserHeader = (props: UserHeaderProps) => {
    const {
        companyName,
        logoPath,
        welcomeMessage,
        logoutButtonText,
        user,
        isDropdownOpen,
        isLoading,
        userInitials,
        formattedEmail,
        toggleDropdown,
        handleLogout,
    } = useUserHeader(props);

    // Loading state
    if (isLoading) {
        return (
            <header className={`${USER_HEADER_STYLES.container} ${props.className || ''}`}>
                <div className={USER_HEADER_STYLES.content}>
                    <div className={USER_HEADER_STYLES.wrapper}>
                        <div className="flex items-center justify-center w-full">
                            <div className="animate-pulse text-white">Chargement...</div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }

    // No user state
    if (!user) {
        return null;
    }

    return (
        <header className={`${USER_HEADER_STYLES.container} ${props.className || ''}`}>
            <div className={USER_HEADER_STYLES.patterns.overlay}></div>
            <div className={USER_HEADER_STYLES.patterns.dots}>
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern
                            id="dots"
                            x="0"
                            y="0"
                            width="40"
                            height="40"
                            patternUnits="userSpaceOnUse"
                        >
                            <circle cx="20" cy="20" r="1.5" fill="currentColor" opacity="0.3" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dots)" className="text-blue-400" />
                </svg>
            </div>
            <div className={USER_HEADER_STYLES.patterns.circuit}>
                <svg viewBox="0 0 200 200" className="w-full h-full">
                    <path
                        d="M20 20 L180 20 L180 180 L20 180 Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="text-purple-400"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="8"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="text-blue-400"
                    />
                    <circle
                        cx="150"
                        cy="150"
                        r="8"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="text-green-400"
                    />
                    <path
                        d="M50 50 L150 150"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-slate-400"
                    />
                </svg>
            </div>
            <div className={USER_HEADER_STYLES.decorative.leftAccent}></div>
            <div className={USER_HEADER_STYLES.decorative.rightAccent}></div>
            <div className={USER_HEADER_STYLES.decorative.bottomGlow}></div>

            <div className={USER_HEADER_STYLES.content}>
                <div className={USER_HEADER_STYLES.wrapper}>
                    {/* Logo Section */}
                    <div className={USER_HEADER_STYLES.logo.container}>
                        <div className={USER_HEADER_STYLES.logo.imageWrapper}>
                            <div className={USER_HEADER_STYLES.logo.glow}></div>
                            <img
                                src={logoPath}
                                alt={`${companyName} Logo`}
                                className={USER_HEADER_STYLES.logo.image}
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        </div>
                        <span className={USER_HEADER_STYLES.logo.text}>{companyName}</span>
                    </div>

                    {/* Welcome Message */}
                    <div className={USER_HEADER_STYLES.welcome.container}>
                        <h1 className={USER_HEADER_STYLES.welcome.text}>{welcomeMessage}</h1>
                        <p className={USER_HEADER_STYLES.welcome.decoration}>
                            Tableau de bord utilisateur
                        </p>
                    </div>

                    {/* User Section */}
                    <div className={`${USER_HEADER_STYLES.user.container} dropdown-container`}>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log('User button clicked');
                                toggleDropdown();
                            }}
                            className={USER_HEADER_STYLES.user.emailButton}
                            type="button"
                        >
                            <div className={USER_HEADER_STYLES.user.avatar}>{userInitials}</div>
                            <span className={USER_HEADER_STYLES.user.emailText}>
                                {formattedEmail}
                            </span>
                            <svg
                                className={`${USER_HEADER_STYLES.user.dropdownIcon} ${
                                    isDropdownOpen ? 'transform rotate-180' : ''
                                } transition-transform duration-200`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className={USER_HEADER_STYLES.user.dropdown.container}>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        console.log('Logout button clicked');
                                        handleLogout();
                                    }}
                                    className={USER_HEADER_STYLES.user.dropdown.item}
                                    type="button"
                                >
                                    <svg
                                        className={USER_HEADER_STYLES.user.dropdown.icon}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    <span className={USER_HEADER_STYLES.user.dropdown.text}>
                                        {logoutButtonText}
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default UserHeader;

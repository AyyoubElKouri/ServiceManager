import React from 'react';
import { useInactive } from './files/Inactive.hook';
import { INACTIVE_STYLES } from './files/Inactive.styles';

/**
 * @component Inactive
 * @description Page component displayed when user account is inactive and awaiting admin approval
 *
 * @dependencies useInactive hook for page logic
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const Inactive = () => {
    const {
        title,
        subtitle,
        message,
        additionalInfo,
        backButtonText,
        contactText,
        contactEmail,
        handleBackToWelcome,
        handleContactSupport,
    } = useInactive();

    return (
        <div className={INACTIVE_STYLES.container}>
            <div className={INACTIVE_STYLES.contentWrapper}>
                {/* Icon */}
                <div className={INACTIVE_STYLES.iconContainer}>
                    <svg
                        className={INACTIVE_STYLES.icon}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>

                {/* Content */}
                <div className={INACTIVE_STYLES.textContent}>
                    <h1 className={INACTIVE_STYLES.title}>{title}</h1>
                    <p className={INACTIVE_STYLES.subtitle}>{subtitle}</p>
                    <p className={INACTIVE_STYLES.message}>{message}</p>
                    <p className={INACTIVE_STYLES.additionalInfo}>{additionalInfo}</p>
                </div>

                {/* Actions */}
                <div className={INACTIVE_STYLES.buttonContainer}>
                    <button onClick={handleBackToWelcome} className={INACTIVE_STYLES.backButton}>
                        {backButtonText}
                    </button>
                </div>

                {/* Contact Support */}
                <div className={INACTIVE_STYLES.contactSection}>
                    <p className={INACTIVE_STYLES.contactText}>{contactText}</p>
                    <button onClick={handleContactSupport} className={INACTIVE_STYLES.contactEmail}>
                        {contactEmail}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Inactive;

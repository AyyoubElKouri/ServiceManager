import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PAGE_CONTENT, COMPANY_INFO } from './Inactive.constants';

/**
 * @hook useInactive
 * @description Custom hook that contains all logic for the Inactive page component
 *
 * @returns {Object} All data and functions needed by the Inactive component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useInactive = () => {
    const navigate = useNavigate();

    /**
     * @function handleBackToWelcome
     * @description Navigate back to the welcome page
     */
    const handleBackToWelcome = useCallback(() => {
        navigate('/');
    }, [navigate]);

    /**
     * @function handleContactSupport
     * @description Handle contact support action (opens email client)
     */
    const handleContactSupport = useCallback(() => {
        const emailSubject = encodeURIComponent('Support - Activation de compte');
        const emailBody = encodeURIComponent(
            `Bonjour,\n\nJ'aimerais obtenir des informations sur l'activation de mon compte.\n\nCordialement,`,
        );
        window.location.href = `mailto:${COMPANY_INFO.supportEmail}?subject=${emailSubject}&body=${emailBody}`;
    }, []);

    return {
        // Page content
        title: PAGE_CONTENT.title,
        subtitle: PAGE_CONTENT.subtitle,
        message: PAGE_CONTENT.message,
        additionalInfo: PAGE_CONTENT.additionalInfo,
        backButtonText: PAGE_CONTENT.backButtonText,
        contactText: PAGE_CONTENT.contactText,
        contactEmail: PAGE_CONTENT.contactEmail,
        companyName: COMPANY_INFO.name,

        // Actions
        handleBackToWelcome,
        handleContactSupport,
    };
};

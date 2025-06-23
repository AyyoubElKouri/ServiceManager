import { INACTIVE_USERS_STYLES } from '../../InactiveUsers.styles';
import { getInitials, formatDate, getFullName } from '../../InactiveUsers.utils';
import { INACTIVE_USERS_CONSTANTS } from '../../InactiveUsers.constants';
import type { UserCardProps } from '../../InactiveUsers.types';

/**
 * @component UserCard
 * @description Card component for displaying individual user information
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const UserCard = ({ user, onActivate, onDelete, isLoading }: UserCardProps) => {
    const initials = getInitials(user);
    const fullName = getFullName(user);
    const createdDate = formatDate(user.createdAt);
    const isActivating = isLoading === 'activate';
    const isDeleting = isLoading === 'delete';
    const isAnyLoading = isActivating || isDeleting;

    return (
        <div className={INACTIVE_USERS_STYLES.userCard.container}>
            <div className={INACTIVE_USERS_STYLES.userCard.content}>
                {/* Left Section - User Info */}
                <div className={INACTIVE_USERS_STYLES.userCard.leftSection}>
                    <div className={INACTIVE_USERS_STYLES.userCard.avatar}>{initials}</div>
                    <div className={INACTIVE_USERS_STYLES.userCard.userInfo}>
                        <h3 className={INACTIVE_USERS_STYLES.userCard.userName}>{fullName}</h3>
                        <p className={INACTIVE_USERS_STYLES.userCard.userEmail}>{user.email}</p>
                        <div className={INACTIVE_USERS_STYLES.userCard.userDetails}>
                            <span
                                className={`${INACTIVE_USERS_STYLES.userCard.role} ${
                                    user.role === 'admin'
                                        ? INACTIVE_USERS_STYLES.userCard.roleAdmin
                                        : INACTIVE_USERS_STYLES.userCard.roleUser
                                }`}
                            >
                                {INACTIVE_USERS_CONSTANTS.roleLabels[user.role]}
                            </span>
                            <span className={INACTIVE_USERS_STYLES.userCard.date}>
                                Créé le {createdDate}
                            </span>
                            <span className={INACTIVE_USERS_STYLES.userCard.date}>
                                ID: {user.user_id}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Section - Actions */}
                <div className={INACTIVE_USERS_STYLES.userCard.rightSection}>
                    <button
                        onClick={() => onActivate(user.user_id)}
                        disabled={isAnyLoading}
                        className={INACTIVE_USERS_STYLES.buttons.activate}
                    >
                        {isActivating
                            ? INACTIVE_USERS_CONSTANTS.buttons.activating
                            : INACTIVE_USERS_CONSTANTS.buttons.activate}
                    </button>
                    <button
                        onClick={() => onDelete(user.user_id)}
                        disabled={isAnyLoading}
                        className={INACTIVE_USERS_STYLES.buttons.delete}
                    >
                        {isDeleting
                            ? INACTIVE_USERS_CONSTANTS.buttons.deleting
                            : INACTIVE_USERS_CONSTANTS.buttons.delete}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;

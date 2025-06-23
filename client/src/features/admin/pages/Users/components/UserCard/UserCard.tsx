import { useState, useCallback } from 'react';
import { USERS_STYLES } from '../../Users.styles';
import { USERS_CONSTANTS } from '../../Users.constants';
import type { UserCardProps, UpdateUserData, FormErrors } from '../../Users.types';

/**
 * @component UserCard
 * @description Card component for displaying and editing individual user information
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const UserCard = ({ user, onUpdate, onDelete, isLoading }: UserCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<UpdateUserData>({
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
    });
    const [errors, setErrors] = useState<FormErrors>({});

    // Get user initials
    const getInitials = (user: any) => {
        return `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase();
    };

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR');
    };

    // Get full name
    const getFullName = (user: any) => {
        return `${user.first_name || ''} ${user.last_name || ''}`.trim();
    };

    // Handle input change
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    }, [errors]);

    // Validate form
    const validateForm = useCallback((): boolean => {
        const newErrors: FormErrors = {};

        if (formData.first_name && formData.first_name.trim().length < 2) {
            newErrors.first_name = 'Le prénom doit contenir au moins 2 caractères';
        }

        if (formData.last_name && formData.last_name.trim().length < 2) {
            newErrors.last_name = 'Le nom doit contenir au moins 2 caractères';
        }

        if (formData.password && formData.password.length < 5) {
            newErrors.password = 'Le mot de passe doit contenir au moins 5 caractères';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    // Handle save
    const handleSave = useCallback(async () => {
        if (!validateForm()) {
            return;
        }

        try {
            // Filter out empty values
            const updateData: UpdateUserData = {};
            if (formData.first_name?.trim()) updateData.first_name = formData.first_name.trim();
            if (formData.last_name?.trim()) updateData.last_name = formData.last_name.trim();
            if (formData.password?.trim()) updateData.password = formData.password.trim();
            if (formData.role) updateData.role = formData.role;

            await onUpdate(user.user_id, updateData);
            setIsEditing(false);
            setFormData({ ...formData, password: '' }); // Clear password field
        } catch (error) {
            console.error('Error updating user:', error);
        }
    }, [formData, user.user_id, onUpdate, validateForm]);

    // Handle cancel
    const handleCancel = useCallback(() => {
        setIsEditing(false);
        setFormData({
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role,
        });
        setErrors({});
    }, [user]);

    // Handle delete
    const handleDelete = useCallback(() => {
        const fullName = getFullName(user);
        onDelete(user.user_id, fullName);
    }, [user, onDelete]);

    const initials = getInitials(user);
    const fullName = getFullName(user);
    const createdDate = formatDate(user.createdAt);
    const isUpdating = isLoading === 'update';
    const isDeleting = isLoading === 'delete';
    const isAnyLoading = isUpdating || isDeleting;

    if (isEditing) {
        return (
            <div className={USERS_STYLES.userCard.container}>
                <div className={USERS_STYLES.form.container}>
                    <div className={USERS_STYLES.form.grid}>
                        {/* First Name */}
                        <div className={USERS_STYLES.form.field}>
                            <label className={USERS_STYLES.form.label}>
                                {USERS_CONSTANTS.formLabels.first_name}
                            </label>
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name || ''}
                                onChange={handleInputChange}
                                className={USERS_STYLES.form.input}
                                placeholder="Prénom"
                            />
                            {errors.first_name && (
                                <p className={USERS_STYLES.form.error}>{errors.first_name}</p>
                            )}
                        </div>

                        {/* Last Name */}
                        <div className={USERS_STYLES.form.field}>
                            <label className={USERS_STYLES.form.label}>
                                {USERS_CONSTANTS.formLabels.last_name}
                            </label>
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name || ''}
                                onChange={handleInputChange}
                                className={USERS_STYLES.form.input}
                                placeholder="Nom"
                            />
                            {errors.last_name && (
                                <p className={USERS_STYLES.form.error}>{errors.last_name}</p>
                            )}
                        </div>

                        {/* Role */}
                        <div className={USERS_STYLES.form.field}>
                            <label className={USERS_STYLES.form.label}>
                                {USERS_CONSTANTS.formLabels.role}
                            </label>
                            <select
                                name="role"
                                value={formData.role || ''}
                                onChange={handleInputChange}
                                className={USERS_STYLES.form.select}
                            >
                                {USERS_CONSTANTS.roleOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Password */}
                        <div className={USERS_STYLES.form.field}>
                            <label className={USERS_STYLES.form.label}>
                                {USERS_CONSTANTS.formLabels.password} (optionnel)
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password || ''}
                                onChange={handleInputChange}
                                className={USERS_STYLES.form.input}
                                placeholder="Nouveau mot de passe"
                            />
                            {errors.password && (
                                <p className={USERS_STYLES.form.error}>{errors.password}</p>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className={USERS_STYLES.form.actions}>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className={USERS_STYLES.buttons.cancel}
                            disabled={isAnyLoading}
                        >
                            {USERS_CONSTANTS.buttons.cancel}
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className={USERS_STYLES.buttons.save}
                            disabled={isAnyLoading}
                        >
                            {isUpdating ? USERS_CONSTANTS.buttons.saving : USERS_CONSTANTS.buttons.save}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={USERS_STYLES.userCard.container}>
            <div className={USERS_STYLES.userCard.content}>
                {/* Left Section - User Info */}
                <div className={USERS_STYLES.userCard.leftSection}>
                    <div className={USERS_STYLES.userCard.avatar}>{initials}</div>
                    <div className={USERS_STYLES.userCard.userInfo}>
                        <h3 className={USERS_STYLES.userCard.userName}>{fullName}</h3>
                        <p className={USERS_STYLES.userCard.userEmail}>{user.email}</p>
                        <div className={USERS_STYLES.userCard.userDetails}>
                            <span
                                className={`${USERS_STYLES.userCard.role} ${
                                    user.role === 'admin'
                                        ? USERS_STYLES.userCard.roleAdmin
                                        : USERS_STYLES.userCard.roleUser
                                }`}
                            >
                                {USERS_CONSTANTS.roleLabels[user.role]}
                            </span>
                            <span className={USERS_STYLES.userCard.date}>
                                Créé le {createdDate}
                            </span>
                            <span className={USERS_STYLES.userCard.date}>
                                ID: {user.user_id}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Section - Actions */}
                <div className={USERS_STYLES.userCard.rightSection}>
                    <button
                        onClick={() => setIsEditing(true)}
                        disabled={isAnyLoading}
                        className={USERS_STYLES.buttons.edit}
                    >
                        {USERS_CONSTANTS.buttons.edit}
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isAnyLoading}
                        className={USERS_STYLES.buttons.delete}
                    >
                        {isDeleting ? USERS_CONSTANTS.buttons.deleting : USERS_CONSTANTS.buttons.delete}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;

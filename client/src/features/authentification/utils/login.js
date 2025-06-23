import { toast } from 'react-toastify';
import { setData } from '../../../utils/secureStorage';
import { LOGIN_ENDPOINT } from '../config/api';
import {
    REDIRECT_DELAY,
    LOGIN_STORAGE_KEYS,
    USER_ROLES,
    ROUTES,
    ERROR_MESSAGES,
} from '../config/constantes';

const validateForm = (formData) => {
    const { email, password } = formData;

    if (!email.trim() || !password.trim()) {
        toast.error(ERROR_MESSAGES.REQUIRED_FIELDS);
        return false;
    }

    return true;
};


const loginUser = async (credentials) => {
    const response = await fetch(LOGIN_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || ERROR_MESSAGES.NETWORK_ERROR);
    }

    return data;
};


const storeUserData = (userData) => {
    setData(LOGIN_STORAGE_KEYS.TOKEN, userData.token);
    setData(LOGIN_STORAGE_KEYS.USER, JSON.stringify(userData.user));
};


const getRedirectRoute = (user) => {
    if (!user.active) {
        return ROUTES.INACTIVE;
    }

    return user.role === USER_ROLES.ADMIN ? ROUTES.ADMIN : ROUTES.INTERVENTIONS;
};


const handleSuccessfulLogin = (userData, navigate) => {
    const redirectRoute = getRedirectRoute(userData.user);

    setTimeout(() => {
        navigate(redirectRoute);
    }, REDIRECT_DELAY);
};

export { validateForm, loginUser, storeUserData, handleSuccessfulLogin };
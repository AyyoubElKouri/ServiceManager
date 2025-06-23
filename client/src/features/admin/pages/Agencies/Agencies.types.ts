/**
 * @interface AgenciesProps
 * @description Props interface for the Agencies component
 */
export interface AgenciesProps {
    className?: string;
}

/**
 * @interface Agency
 * @description Interface for agency data from API
 */
export interface Agency {
    id?: string;
    agency_id?: string; // Au cas où l'API utilise agency_id au lieu de id
    name: string;
    adress?: string;
    phone?: string;
    email?: string;
    start_time?: string;
    end_time?: string;
    isActive?: boolean;
    current?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

/**
 * @interface CreateAgencyData
 * @description Interface for creating agency data
 */
export interface CreateAgencyData {
    name: string;
    adress?: string;
    start_time?: string;
    end_time?: string;
}

/**
 * @interface UpdateAgencyData
 * @description Interface for updating agency data
 */
export interface UpdateAgencyData {
    name?: string;
    adress?: string;
    start_time?: string;
    end_time?: string;
}

/**
 * @interface AgencyCardProps
 * @description Props for individual agency card component
 */
export interface AgencyCardProps {
    agency: Agency;
    onUpdate: (agencyId: string, data: UpdateAgencyData) => Promise<void>;
    onDelete: (agencyId: string, agencyName: string) => void;
    onSetCurrent: (agencyId: string) => Promise<void>;
    isLoading?: 'update' | 'delete' | 'setCurrent' | null;
}

/**
 * @interface CreateAgencyModalProps
 * @description Props for create agency modal component
 */
export interface CreateAgencyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateAgencyData) => Promise<void>;
    isLoading: boolean;
}

/**
 * @interface FormErrors
 * @description Form validation errors
 */
export interface FormErrors {
    [key: string]: string;
}

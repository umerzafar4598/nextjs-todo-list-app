export type AuthActionState = {
    success: boolean;
    errors?: {
        fieldErrors?: {
            email?: { errors: string[] };
            password?: { errors: string[] };
            name?: { errors: string[] };
        };
        formErrors?: string[];
        general?: string;
    };
};

export type AuthAction = {
    success: boolean;
    errors?: {
        fieldErrors?: {
            email?: { errors: string };
            password?: { errors: string };
            name?: { errors: string }
        };
        general?: string;
    }
}
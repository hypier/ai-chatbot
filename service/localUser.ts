import { useUser } from '@clerk/nextjs'

export function LocalUser(): LocalUser | null {
    const { user } = useUser();
    if (!user) {
        return null;
    }
    console.log('local user', user);
    return {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress ?? '',
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
    };
}

export interface LocalUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}
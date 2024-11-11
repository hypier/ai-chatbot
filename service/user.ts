import { auth, currentUser } from '@clerk/nextjs/server'

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}

export function userId() {
    return auth()?.userId;
}

export async function user(): Promise<User | null> {
    const clerkUser = await currentUser();
    
    if (!clerkUser) {
        return null;
    }

    return {
        id: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress ?? '',
        firstName: clerkUser.firstName ?? '',
        lastName: clerkUser.lastName ?? '',
    };
}


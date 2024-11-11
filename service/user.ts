import { auth, currentUser } from '@clerk/nextjs/server'

import { createUser, getUser } from "@/db/queries";

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}

export async function userId() {
    const userId = auth()?.userId;
    if (!userId) {
        return null;
    }

    const luser = await user();
    if (!luser) {
        return null;
    }

    const email = luser?.email ?? '';
    const userRecords = await getUser(email);
    const userRecord = userRecords[0];
    if (!userRecord) {
        await createUser(email, 'xxx');
    }

    return userId;
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


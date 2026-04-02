"use client";

import { ClerkProvider, useAuth } from '@clerk/nextjs'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { ConvexReactClient } from 'convex/react'
import React, { PropsWithChildren } from 'react'
import { SyncUserWithConvex } from '@/components/SyncUserWithConvex';

type Props = PropsWithChildren<{}>

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

const ConvexClientProvider = ({children}: Props) => {
    return (
        <ClerkProvider>
            <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
                <SyncUserWithConvex />
                {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}

export default ConvexClientProvider
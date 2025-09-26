
import React from 'react';

import { currentUser } from '@clerk/nextjs/server';
import HeaderContent from './header-content';

const Header = async () => {
  const user = await currentUser();

  // Convert the Clerk user to a plain object
  const safeUser = user
    ? {
        id: user.id,
        fullName: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
        email: user.emailAddresses?.[0]?.emailAddress ?? null,
        imageUrl: user.imageUrl ?? null,
      }
    : null;

  return <HeaderContent user={safeUser} />;
};

export default Header;

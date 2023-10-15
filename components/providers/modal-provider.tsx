'use client';

import { useEffect, useState } from 'react';
import CreateServerModal from '../modals/create-server-modal';
import EditServerModal from '../modals/edit-server-modal copy';
import InviteModal from '../modals/invite-modal';
import MembersModal from '../modals/members-modal';

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  return (
    <>
      {isMounted && (
        <>
          <EditServerModal />
          <CreateServerModal />
          <InviteModal />
          <MembersModal />
        </>
      )}
    </>
  );
}

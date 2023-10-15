'use client';

import { useEffect, useState } from 'react';
import CreateChannelModal from '../modals/create-channel-modal';
import CreateServerModal from '../modals/create-server-modal';
import DeleteServerModal from '../modals/delete-serval-modal';
import EditServerModal from '../modals/edit-server-modal copy';
import InviteModal from '../modals/invite-modal';
import LeaveServerModal from '../modals/leave-server-modal';
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
          <CreateChannelModal />
          <LeaveServerModal />
          <DeleteServerModal />
        </>
      )}
    </>
  );
}

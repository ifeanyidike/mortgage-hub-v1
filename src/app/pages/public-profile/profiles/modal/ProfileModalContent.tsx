"use client";
import { ModalProfile } from "@/app/partials/modals/profile";
import { useState } from "react";

const ProfileModalContent = () => {
  const [profileModalOpen, setProfileModalOpen] = useState(true);
  const handleClose = () => {
    setProfileModalOpen(false);
  };

  return <ModalProfile open={profileModalOpen} onClose={handleClose} />;
};

export { ProfileModalContent };

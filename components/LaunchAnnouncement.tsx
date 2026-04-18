"use client";

import { useState, useEffect } from "react";
import AnnouncementModal from "@/components/AnnouncementModal";
import AnnouncementBanner from "@/components/AnnouncementBanner";

const MODAL_KEY = "howtoerlc-launch-modal-v1";
const BANNER_KEY = "howtoerlc-announcement-dismissed-v4";

function readKey(key: string) {
  try { return localStorage.getItem(key) === "1"; } catch { return false; }
}
function setKey(key: string) {
  try { localStorage.setItem(key, "1"); } catch { /* ignore */ }
}

export default function LaunchAnnouncement() {
  const [showModal, setShowModal] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const modalDone = readKey(MODAL_KEY);
    const bannerDone = readKey(BANNER_KEY);
    if (!modalDone) {
      setShowModal(true);
    } else if (!bannerDone) {
      setShowBanner(true);
    }
  }, []);

  function dismissModal() {
    setKey(MODAL_KEY);
    setShowModal(false);
    if (!readKey(BANNER_KEY)) setShowBanner(true);
  }

  function dismissBanner() {
    setKey(BANNER_KEY);
    setShowBanner(false);
  }

  return (
    <>
      {showModal && <AnnouncementModal onDismiss={dismissModal} />}
      {showBanner && <AnnouncementBanner onDismiss={dismissBanner} />}
    </>
  );
}

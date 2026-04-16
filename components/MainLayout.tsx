import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnnouncementBanner from "@/components/AnnouncementBanner";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBanner />
      <Navigation />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

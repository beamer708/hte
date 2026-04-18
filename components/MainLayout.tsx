import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LaunchAnnouncement from "@/components/LaunchAnnouncement";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LaunchAnnouncement />
      <Navigation />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

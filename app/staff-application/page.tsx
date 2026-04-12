import { prisma } from "@/lib/db";
import StaffApplicationForm, { StaffApplicationsClosed } from "./StaffApplicationForm";

export default async function StaffApplicationPage() {
  const config = await prisma.siteConfig.findUnique({
    where: { key: "STAFF_APPS_OPEN" },
  });
  const isOpen = config?.value === "true";

  if (!isOpen) {
    return <StaffApplicationsClosed />;
  }

  return <StaffApplicationForm />;
}

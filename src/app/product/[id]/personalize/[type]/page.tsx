import GiftSite from "@/components/GiftSite";

type PersonalizePageProps = {
  params: Promise<{
    id: string;
    type: string;
  }>;
  searchParams: Promise<{
    amount?: string;
    creator?: string;
    name?: string;
    email?: string;
    phone?: string;
  }>;
};

export default async function PersonalizePage({
  params,
  searchParams,
}: PersonalizePageProps) {
  const { id, type } = await params;
  const { amount, creator, name, email, phone } = await searchParams;

  const recipientType =
    type === "creator" || type === "someone" || type === "myself"
      ? type
      : "someone";

  return (
    <GiftSite />
  );
}

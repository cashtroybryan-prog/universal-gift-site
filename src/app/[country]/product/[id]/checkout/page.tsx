import GiftSite from "@/components/GiftSite";

type CountryCheckoutPageProps = {
  params: Promise<{
    country: string;
    id: string;
  }>;
  searchParams: Promise<{
    amount?: string;
    type?: string;
    creator?: string;
    name?: string;
    email?: string;
    phone?: string;
    media?: string;
    mediaMode?: "card" | "gif" | "video";
    mediaIndex?: string;
    upload?: string;
    message?: string;
    text?: string;
  }>;
};

export default async function CountryCheckoutPage({
  params,
  searchParams,
}: CountryCheckoutPageProps) {
  const { country, id } = await params;
  const {
    amount,
    type,
    creator,
    name,
    email,
    phone,
    media,
    mediaMode,
    mediaIndex,
    upload,
    message,
    text,
  } = await searchParams;

  const recipientType =
    type === "creator" || type === "someone" || type === "myself"
      ? type
      : "someone";

  const safeMediaMode =
    mediaMode === "card" || mediaMode === "gif" || mediaMode === "video"
      ? mediaMode
      : "card";

  return (
    <GiftSite />
  );
}

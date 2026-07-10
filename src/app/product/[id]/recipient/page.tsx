import GiftSite from "@/components/GiftSite";

type RecipientPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    amount?: string;
  }>;
};

export default async function RecipientPage({
  params,
  searchParams,
}: RecipientPageProps) {
  const { id } = await params;
  const { amount } = await searchParams;

  return (
    <GiftSite />
  );
}

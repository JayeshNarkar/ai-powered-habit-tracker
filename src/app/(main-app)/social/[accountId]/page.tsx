import { ConnectDB } from "@/db/connect";
import User from "@/db/user-model";
import { notFound } from "next/navigation";

async function findAccount(accountId: string) {
  await ConnectDB();
  return await User.findOne({
    id: accountId,
  });
}

export default async function SocialIdPage({
  params: { accountId },
}: {
  params: { accountId: string };
}) {
  const res = await findAccount(accountId);

  if (!res) notFound();

  return <h1>{res.toString()}</h1>;
}

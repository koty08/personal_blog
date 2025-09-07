import CategoryCreate from "@/components/categorys/CategoryCreate";
import commonFetch from "../../lib/commonFetch";
import { notFound } from "next/navigation";
import CategoryLists from "@/components/categorys/CategoryLists";
import { Category } from "@prisma/client";

export default async function Categorys() {
  const categorys = await commonFetch<Category[]>("/category", undefined, { cache: "no-store" });
  if (!categorys) notFound();

  return (
    <div className="flex flex-col gap-3 items-center">
      <CategoryLists categorys={categorys} />
      <CategoryCreate />
    </div>
  );
}

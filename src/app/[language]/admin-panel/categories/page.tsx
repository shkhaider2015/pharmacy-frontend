"use server";

import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import CategoriesPageContent from "./page-content";

type Props = {
  params: Promise<{ language: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const { t } = await getServerTranslation(
    params.language,
    "admin-panel-categories"
  );

  return {
    title: t("title"),
  };
}

export default async function Page() {
  return <CategoriesPageContent />;
}

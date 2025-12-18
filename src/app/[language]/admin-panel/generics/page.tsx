"use server";

import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import GenericsPageContent from "./page-content";

type Props = {
  params: Promise<{ language: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const { t } = await getServerTranslation(
    params.language,
    "admin-panel-generics"
  );

  return {
    title: t("title"),
  };
}

export default async function Page() {
  return <GenericsPageContent />;
}

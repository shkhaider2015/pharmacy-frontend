import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import MedicationIcon from "@mui/icons-material/Medication";
import CategoryIcon from "@mui/icons-material/Category";
import ScienceIcon from "@mui/icons-material/Science";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import LocalShipping from "@mui/icons-material/LocalShipping";
import { useTranslation } from "@/services/i18n/client";

interface RouteItem {
  label: string;
  path: string;
  Icon: React.ElementType;
}

const useAdminRoutes = () => {
  const { t } = useTranslation("common");
  const dashboardRoutes: RouteItem[] = [
    {
      label: t("navigation:Dashboard"),
      path: "/admin-panel",
      Icon: DashboardIcon,
    },
    {
      label: t("navigation:Users"),
      path: "/admin-panel/users",
      Icon: PeopleIcon,
    },
  ];
  const productsRoutes: RouteItem[] = [
    {
      label: t("common:navigation:Products"),
      path: "/admin-panel/products",
      Icon: MedicationIcon,
    },
    {
      label: t("common:navigation:Categories"),
      path: "/admin-panel/categories",
      Icon: CategoryIcon,
    },
    {
      label: t("common:navigation:Generics"),
      path: "/admin-panel/generics",
      Icon: ScienceIcon,
    },
    {
      label: t("common:navigation:Manufacturers"),
      path: "/admin-panel/manufacturers",
      Icon: BusinessIcon,
    },
    {
      label: t("common:navigation:Suppliers"),
      path: "/admin-panel/suppliers",
      Icon: LocalShipping,
    },
    {
      label: t("common:navigation:Customers"),
      path: "/admin-panel/customers",
      Icon: PersonIcon,
    },
    // Drawer Menu Items
  ];

  return { dashboardRoutes, productsRoutes };
};

export default useAdminRoutes;

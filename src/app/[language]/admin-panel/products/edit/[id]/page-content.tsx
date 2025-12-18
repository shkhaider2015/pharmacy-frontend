"use client";

import { useGetCategoriesListQuery } from "@/app/[language]/admin-panel/categories/queries/queries";

import { Category } from "@/services/api/types/category";

import { useGetGenericsListQuery } from "@/app/[language]/admin-panel/generics/queries/queries";

import { Generic } from "@/services/api/types/generic";

import FormMultipleSelectExtendedInput from "@/components/form/multiple-select-extended/form-multiple-select-extended";

import { useGetManufacturersListQuery } from "@/app/[language]/admin-panel/manufacturers/queries/queries";

import { Manufacturer } from "@/services/api/types/manufacturer";

import FormSelectExtendedInput from "@/components/form/select-extended/form-select-extended";

import FormDateTimePickerInput from "@/components/form/date-pickers/date-time-picker";

import FormCheckboxBooleanInput from "@/components/form/checkbox-boolean/form-checkbox-boolean";

import FormTextInput from "@/components/form/text-input/form-text-input";

import {
  // React dependencies here
  useEffect,
  useCallback,
  useMemo,
} from "react";
import Button from "@mui/material/Button";
import { useForm, FormProvider, useFormState } from "react-hook-form";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { useSnackbar } from "@/hooks/use-snackbar";
import Link from "@/components/link";
import useLeavePage from "@/services/leave-page/use-leave-page";
import Box from "@mui/material/Box";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { useTranslation } from "@/services/i18n/client";
import { useParams, useRouter } from "next/navigation";
import { useEditProductService } from "@/services/api/services/products";
import { useGetProductQuery } from "../../queries/queries";

type EditFormData = {
  categories: Category[];

  generics: Generic[];

  manufacturer: Manufacturer | null;

  manufactureDate: Date | null;

  expiryDate: Date | null;

  stock: string;

  isPrescriptionRequired: boolean;

  description: string;

  name: string;

  // types here
};

const defaultValues: EditFormData = {
  categories: [],

  generics: [],

  manufacturer: null,

  manufactureDate: null,

  expiryDate: null,

  stock: "",

  isPrescriptionRequired: false,

  description: "",

  name: "",

  // default values here
};

const useValidationSchema = () => {
  const { t } = useTranslation("admin-panel-products-edit");

  return yup.object().shape({
    name: yup.string().required(t("inputs.name.validation.required")),

    description: yup.string().defined(),

    isPrescriptionRequired: yup.boolean().defined(),

    stock: yup.string().required(t("inputs.stock.validation.required")),

    expiryDate: yup
      .date()
      .required(t("inputs.expiryDate.validation.required"))
      .nullable(),

    manufactureDate: yup.date().nullable().defined(),

    manufacturer: yup.mixed<Manufacturer>().nullable().defined(),

    generics: yup.array().of(yup.mixed<Generic>().required()).required(),

    categories: yup.array().of(yup.mixed<Category>().required()).required(),

    // Do not remove this comment. <edit-form-validation-schema />
  });
};

function ManufacturerField() {
  const { t } = useTranslation("admin-panel-products-edit");
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetManufacturersListQuery();

  const options = useMemo(
    () => data?.pages.flatMap((page) => page?.data ?? []).filter(Boolean) ?? [],
    [data]
  );

  const handleScroll = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <FormSelectExtendedInput<EditFormData, Manufacturer>
      name="manufacturer"
      label={t("inputs.manufacturer.label")}
      testId="manufacturer"
      options={options}
      onEndReached={handleScroll}
      renderOption={(option) => option.name}
      keyExtractor={(option) => option.id.toString()}
      renderSelected={(selectedOption) => selectedOption.name}
    />
  );
}

function GenericsField() {
  const { t } = useTranslation("admin-panel-products-edit");
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetGenericsListQuery();

  const options = useMemo(
    () => data?.pages.flatMap((page) => page?.data ?? []).filter(Boolean) ?? [],
    [data]
  );

  const handleScroll = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <FormMultipleSelectExtendedInput<EditFormData, Generic>
      name="generics"
      label={t("inputs.generics.label")}
      testId="generics"
      options={options}
      onEndReached={handleScroll}
      renderOption={(option) => option.name}
      keyExtractor={(option) => option.id.toString()}
      renderSelected={(selectedOptions) =>
        selectedOptions.map((selectedOption) => selectedOption.name).join(", ")
      }
    />
  );
}

function CategoriesField() {
  const { t } = useTranslation("admin-panel-products-edit");
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetCategoriesListQuery();

  const options = useMemo(
    () => data?.pages.flatMap((page) => page?.data ?? []).filter(Boolean) ?? [],
    [data]
  );

  const handleScroll = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <FormMultipleSelectExtendedInput<EditFormData, Category>
      name="categories"
      label={t("inputs.categories.label")}
      testId="categories"
      options={options}
      onEndReached={handleScroll}
      renderOption={(option) => option.name}
      keyExtractor={(option) => option.id.toString()}
      renderSelected={(selectedOptions) =>
        selectedOptions.map((selectedOption) => selectedOption.name).join(", ")
      }
    />
  );
}

// Do not remove this comment. <edit-component-reference-field />

function EditFormActions() {
  const { t } = useTranslation("admin-panel-products-edit");
  const { isSubmitting, isDirty } = useFormState();
  useLeavePage(isDirty);

  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      disabled={isSubmitting}
      data-testid="submit-button"
    >
      {t("actions.submit")}
    </Button>
  );
}

function FormEdit() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const entityId = params.id;
  const fetchEditProduct = useEditProductService();
  const { t } = useTranslation("admin-panel-products-edit");
  const validationSchema = useValidationSchema();
  const { data: initialData } = useGetProductQuery({ id: entityId });

  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<EditFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { handleSubmit, setError, reset } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    const { data, status } = await fetchEditProduct({
      id: entityId,
      data: {
        name: formData.name,

        description: formData.description,

        isPrescriptionRequired: formData.isPrescriptionRequired,

        stock: formData.stock !== null ? Number(formData.stock) : null,

        expiryDate: formData.expiryDate
          ? formData.expiryDate.toISOString()
          : null,

        manufactureDate: formData.manufactureDate
          ? formData.manufactureDate.toISOString()
          : null,

        manufacturer: formData.manufacturer,

        generics: formData.generics,

        categories: formData.categories,

        // Do not remove this comment. <edit-form-submit-property />
      },
    });

    if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      (Object.keys(data.errors) as Array<keyof EditFormData>).forEach((key) => {
        setError(key, {
          type: "manual",
          message: t(`inputs.${key}.validation.server.${data.errors[key]}`),
        });
      });
      return;
    }
    if (status === HTTP_CODES_ENUM.OK) {
      enqueueSnackbar(t("alerts.success"), {
        variant: "success",
      });
      router.push("/admin-panel/products");
    }
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.data.name ?? "",

        description: initialData.data.description ?? "",

        isPrescriptionRequired:
          initialData.data.isPrescriptionRequired ?? false,

        stock:
          typeof initialData.data.stock === "number"
            ? initialData.data.stock.toString()
            : "",

        expiryDate: initialData.data.expiryDate
          ? new Date(initialData.data.expiryDate)
          : null,

        manufactureDate: initialData.data.manufactureDate
          ? new Date(initialData.data.manufactureDate)
          : null,

        manufacturer: initialData.data.manufacturer ?? null,

        generics: initialData.data.generics ?? [],

        categories: initialData.data.categories ?? [],

        // Do not remove this comment. <edit-form-reset-property />
      });
    }
  }, [initialData, reset]);

  return (
    <FormProvider {...methods}>
      <Container maxWidth="md">
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} mb={3} mt={3}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6">{t("title")}</Typography>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormTextInput<EditFormData>
                name="name"
                testId="name"
                label={t("inputs.name.label")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormTextInput<EditFormData>
                name="description"
                testId="description"
                label={t("inputs.description.label")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormCheckboxBooleanInput<EditFormData>
                name="isPrescriptionRequired"
                testId="isPrescriptionRequired"
                label={t("inputs.isPrescriptionRequired.label")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormTextInput<EditFormData>
                name="stock"
                testId="stock"
                label={t("inputs.stock.label")}
                type="number"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormDateTimePickerInput<EditFormData>
                name="expiryDate"
                testId="expiryDate"
                label={t("inputs.expiryDate.label")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormDateTimePickerInput<EditFormData>
                name="manufactureDate"
                testId="manufactureDate"
                label={t("inputs.manufactureDate.label")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <ManufacturerField />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <GenericsField />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <CategoriesField />
            </Grid>

            {/* Do not remove this comment. <edit-component-field />  */}

            <Grid size={{ xs: 12 }}>
              <EditFormActions />
              <Box ml={1} component="span">
                <Button
                  variant="contained"
                  color="inherit"
                  LinkComponent={Link}
                  href="/admin-panel/products"
                >
                  {t("actions.cancel")}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Container>
    </FormProvider>
  );
}

function Edit() {
  return <FormEdit />;
}

export default withPageRequiredAuth(Edit);

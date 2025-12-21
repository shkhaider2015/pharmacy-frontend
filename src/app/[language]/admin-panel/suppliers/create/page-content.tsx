"use client";

import FormDateTimePickerInput from "@/components/form/date-pickers/date-time-picker";

import FormTextInput from "@/components/form/text-input/form-text-input";

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
import { useRouter } from "next/navigation";
import { useCreateSupplierService } from "@/services/api/services/suppliers";

type CreateFormData = {
  lastOrderDate: Date | null;

  address: string;

  phone: string;

  email: string;

  name: string;

  // types here
};

const defaultValues: CreateFormData = {
  lastOrderDate: null,

  address: "",

  phone: "",

  email: "",

  name: "",

  // default values here
};

const useValidationSchema = () => {
  const { t } = useTranslation("admin-panel-suppliers-create");

  return yup.object().shape({
    name: yup.string().required(t("inputs.name.validation.required")),

    email: yup.string().defined(),

    phone: yup.string().defined(),

    address: yup.string().defined(),

    lastOrderDate: yup.date().nullable().defined(),

    // Do not remove this comment. <create-form-validation-schema />
  });
};

// Do not remove this comment. <create-component-reference-field />

function CreateFormActions() {
  const { t } = useTranslation("admin-panel-suppliers-create");
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

function FormCreate() {
  const router = useRouter();
  const fetchCreateSupplier = useCreateSupplierService();
  const { t } = useTranslation("admin-panel-suppliers-create");
  const validationSchema = useValidationSchema();

  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<CreateFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { handleSubmit, setError } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    const { data, status } = await fetchCreateSupplier({
      name: formData.name,

      email: formData.email,

      phone: formData.phone,

      address: formData.address,

      lastOrderDate: formData.lastOrderDate
        ? formData.lastOrderDate.toISOString()
        : null,

      // Do not remove this comment. <create-form-submit-property />
    });

    if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
      (Object.keys(data.errors) as Array<keyof CreateFormData>).forEach(
        (key) => {
          setError(key, {
            type: "manual",
            message: t(`inputs.${key}.validation.server.${data.errors[key]}`),
          });
        }
      );

      return;
    }

    if (status === HTTP_CODES_ENUM.CREATED) {
      enqueueSnackbar(t("alerts.success"), {
        variant: "success",
      });
      router.push("/admin-panel/suppliers");
    }
  });

  return (
    <FormProvider {...methods}>
      <Container maxWidth="md">
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} mb={3} mt={3}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6">{t("title")}</Typography>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormTextInput<CreateFormData>
                name="name"
                testId="name"
                label={t("inputs.name.label")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormTextInput<CreateFormData>
                name="email"
                testId="email"
                label={t("inputs.email.label")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormTextInput<CreateFormData>
                name="phone"
                testId="phone"
                label={t("inputs.phone.label")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormTextInput<CreateFormData>
                name="address"
                testId="address"
                label={t("inputs.address.label")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormDateTimePickerInput<CreateFormData>
                name="lastOrderDate"
                testId="lastOrderDate"
                label={t("inputs.lastOrderDate.label")}
              />
            </Grid>

            {/* Do not remove this comment. <create-component-field />  */}

            <Grid size={{ xs: 12 }}>
              <CreateFormActions />
              <Box ml={1} component="span">
                <Button
                  variant="contained"
                  color="inherit"
                  LinkComponent={Link}
                  href="/admin-panel/suppliers"
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

function Create() {
  return <FormCreate />;
}

export default withPageRequiredAuth(Create);

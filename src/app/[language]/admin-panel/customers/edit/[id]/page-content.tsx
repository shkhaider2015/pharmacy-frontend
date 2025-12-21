"use client";

import FormTextInput from "@/components/form/text-input/form-text-input";

import {
  // React dependencies here
  useEffect,
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
import { useEditCustomerService } from "@/services/api/services/customers";
import { useGetCustomerQuery } from "../../queries/queries";

type EditFormData = {
  address: string;

  phone: string;

  email: string;

  type: string;

  companyName: string;

  name: string;

  // types here
};

const defaultValues: EditFormData = {
  address: "",

  phone: "",

  email: "",

  type: "",

  companyName: "",

  name: "",

  // default values here
};

const useValidationSchema = () => {
  const { t } = useTranslation("admin-panel-customers-edit");

  return yup.object().shape({
    name: yup.string().defined(),

    companyName: yup.string().defined(),

    type: yup.string().required(t("inputs.type.validation.required")),

    email: yup.string().defined(),

    phone: yup.string().defined(),

    address: yup.string().defined(),

    // Do not remove this comment. <edit-form-validation-schema />
  });
};

// Do not remove this comment. <edit-component-reference-field />

function EditFormActions() {
  const { t } = useTranslation("admin-panel-customers-edit");
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
  const fetchEditCustomer = useEditCustomerService();
  const { t } = useTranslation("admin-panel-customers-edit");
  const validationSchema = useValidationSchema();
  const { data: initialData } = useGetCustomerQuery({ id: entityId });

  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<EditFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { handleSubmit, setError, reset } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    const { data, status } = await fetchEditCustomer({
      id: entityId,
      data: {
        name: formData.name,

        companyName: formData.companyName,

        type: formData.type,

        email: formData.email,

        phone: formData.phone,

        address: formData.address,

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
      router.push("/admin-panel/customers");
    }
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.data.name ?? "",

        companyName: initialData.data.companyName ?? "",

        type: initialData.data.type ?? "",

        email: initialData.data.email ?? "",

        phone: initialData.data.phone ?? "",

        address: initialData.data.address ?? "",

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
                name="companyName"
                testId="companyName"
                label={t("inputs.companyName.label")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormTextInput<EditFormData>
                name="type"
                testId="type"
                label={t("inputs.type.label")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormTextInput<EditFormData>
                name="email"
                testId="email"
                label={t("inputs.email.label")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormTextInput<EditFormData>
                name="phone"
                testId="phone"
                label={t("inputs.phone.label")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormTextInput<EditFormData>
                name="address"
                testId="address"
                label={t("inputs.address.label")}
              />
            </Grid>

            {/* Do not remove this comment. <edit-component-field />  */}

            <Grid size={{ xs: 12 }}>
              <EditFormActions />
              <Box ml={1} component="span">
                <Button
                  variant="contained"
                  color="inherit"
                  LinkComponent={Link}
                  href="/admin-panel/customers"
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

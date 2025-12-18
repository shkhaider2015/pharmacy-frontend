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
import { useEditManufacturerService } from "@/services/api/services/manufacturers";
import { useGetManufacturerQuery } from "../../queries/queries";

type EditFormData = {
  short: string;

  origin: string;

  address: string;

  license: string;

  name: string;

  // types here
};

const defaultValues: EditFormData = {
  short: "",

  origin: "",

  address: "",

  license: "",

  name: "",

  // default values here
};

const useValidationSchema = () => {
  const { t } = useTranslation("admin-panel-manufacturers-edit");

  return yup.object().shape({
    name: yup.string().required(t("inputs.name.validation.required")),

    license: yup.string().defined(),

    address: yup.string().defined(),

    origin: yup.string().defined(),

    short: yup.string().defined(),

    // Do not remove this comment. <edit-form-validation-schema />
  });
};

// Do not remove this comment. <edit-component-reference-field />

function EditFormActions() {
  const { t } = useTranslation("admin-panel-manufacturers-edit");
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
  const fetchEditManufacturer = useEditManufacturerService();
  const { t } = useTranslation("admin-panel-manufacturers-edit");
  const validationSchema = useValidationSchema();
  const { data: initialData } = useGetManufacturerQuery({ id: entityId });

  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<EditFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { handleSubmit, setError, reset } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    const { data, status } = await fetchEditManufacturer({
      id: entityId,
      data: {
        name: formData.name,

        license: formData.license,

        address: formData.address,

        origin: formData.origin,

        short: formData.short,

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
      router.push("/admin-panel/manufacturers");
    }
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.data.name ?? "",

        license: initialData.data.license ?? "",

        address: initialData.data.address ?? "",

        origin: initialData.data.origin ?? "",

        short: initialData.data.short ?? "",

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
                name="license"
                testId="license"
                label={t("inputs.license.label")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormTextInput<EditFormData>
                name="address"
                testId="address"
                label={t("inputs.address.label")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormTextInput<EditFormData>
                name="origin"
                testId="origin"
                label={t("inputs.origin.label")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormTextInput<EditFormData>
                name="short"
                testId="short"
                label={t("inputs.short.label")}
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
                  href="/admin-panel/manufacturers"
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

//@ts-nocheck
import { useState, useEffect, useMemo } from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Input from '@mui/material/Input';
import { useForm, Controller } from "react-hook-form";
import { merge, isEmpty } from "lodash";

const accountStatus = [
  {
    value: "Open",
    label: "Open",
  },
  {
    value: "PendingOpen",
    label: "PendingOpen",
  },
  {
    value: "Closed",
    label: "Closed",
  },
];

const productType = [
  {
    value: "Equity",
    label: "Equity",
  },
  {
    value: "Fixed Income",
    label: "Fixed Income",
  },
  {
    value: "Balanced",
    label: "Balanced",
  },
];

const myHelper = {
  accountName: {
    required: "Account Name is Required",
  },
};


export default function FormFields({ data={
    accountId: '',
    accountName: '',
    accountStatus: '',
    productType: '',
  } }: any) {


  const { control, formState, getValues, watch, register, handleSubmit } =
    useForm({
      defaultValues: useMemo(() => data, [data]) ,
    });
  const { errors } = formState;

  watch();


  const onSubmit = (data: any) => alert(JSON.stringify(data, null, 4));

  return (
    <Box sx={{ m: 1,maxWidth: '500px' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="accountName"
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  type="text"
                  fullWidth
                  label="Account Name"
                  error={error !== undefined}
                  helperText={error ? myHelper.accountName[error.type] : ""}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              defaultValue=""
              label="Account Status"
              inputProps={register("accountStatus", {
                required: "Please Select Status",
              })}
              error={errors.accountStatus}
              helperText={errors.accountStatus?.message}
            >
              {accountStatus.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              defaultValue=""
              label="Product Type"
              inputProps={register("productType", {
                required: "Please Select Product Type",
              })}
              error={errors.productType}
              helperText={errors.productType?.message}
            >
              {productType.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" sx={{ mt: 3 }}>
              submit
            </Button>
          </Grid>
          {/* <pre>{JSON.stringify(getValues(), null, 4)}</pre> */}
        </Grid>
      </form>
    </Box>
  );
}

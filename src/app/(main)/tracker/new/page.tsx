"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { useToast } from "@/components/providers/toast-provider";
import FormStatus from "@/components/ui/form-button";
import { createExpense } from "@/lib/expenses";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const auth = useAuth();
  const toast = useToast();

  const handleCreate = async (data: FormData) => {
    if (!auth.user) return;

    const name = data.get("name") as string;
    const description = data.get("description") as string;
    const date = new Date(data.get("date") as string);
    const cost = data.get("cost") as unknown as number;
    const quantity = data.get("quantity") as unknown as number;

    try {
      createExpense(auth.user.$id, { name, description, date, cost, quantity });
      toast.show({ message: "Your expense has been created!", severity: "success" });
    } catch (err) {
      console.error(err);
      toast.show({ message: "Unable to create your expense! Please try again later.", severity: "error" });
    } finally {
      router.push("/tracker");
    }
  };

  const handleCancel = () => {
    router.push("/tracker");
  };

  return (
    <Box className={"h-full grid place-items-center"}>
      <Paper className={"p-8 w-96"} variant={"outlined"}>
        <Box component={"form"} className={"flex flex-col gap-4"} action={handleCreate}>
          <Typography className={"font-bold text-2xl text-center"}>Add Expense</Typography>
          <Box className={"flex flex-col gap-2"}>
            <TextField
              variant={"filled"}
              size={"small"}
              type={"text"}
              name={"name"}
              placeholder={"Name"}
              hiddenLabel
              required
            />
            <TextField
              variant={"filled"}
              size={"small"}
              type={"text"}
              name={"description"}
              placeholder={"Description"}
              hiddenLabel
              multiline
              required
            />
            <TextField
              variant={"filled"}
              size={"small"}
              type={"date"}
              name={"date"}
              placeholder={"Date"}
              hiddenLabel
              multiline
              required
            />
            <TextField
              variant={"filled"}
              size={"small"}
              type={"number"}
              name={"cost"}
              placeholder={"Cost"}
              slotProps={{
                htmlInput: {
                  step: 0.01,
                },
              }}
              hiddenLabel
              required
            />
            <TextField
              variant={"filled"}
              size={"small"}
              type={"number"}
              name={"quantity"}
              placeholder={"Quantity"}
              defaultValue={1}
              hiddenLabel
              required
            />
          </Box>
          <Box className={"flex flex-col gap-2"}>
            <FormStatus>
              <FormStatus.Active>
                <Button variant={"contained"} color={"primary"} type={"submit"}>
                  Add
                </Button>
              </FormStatus.Active>
              <FormStatus.Pending>
                <Button variant={"contained"} color={"primary"} disabled>
                  Adding...
                </Button>
              </FormStatus.Pending>
            </FormStatus>
            <Button variant={"outlined"} color={"secondary"} onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
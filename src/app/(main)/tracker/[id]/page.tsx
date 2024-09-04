"use client";

import LoadingPage from "@/app/(main)/loading";
import NotFoundPage from "@/app/not-found";
import { useAuth } from "@/components/providers/auth-provider";
import { useToast } from "@/components/providers/toast-provider";
import FormStatus from "@/components/ui/form-button";
import { getExpense, updateExpense } from "@/lib/expenses";
import { ExpenseDocument } from "@/lib/integrations/appwrite/types";
import { humanizeDate } from "@/lib/utils";
import { RouteProps } from "@/types";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page(props: RouteProps) {
  const id = props.params.id as string;

  const router = useRouter();
  const auth = useAuth();
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [expense, setExpense] = useState<ExpenseDocument | undefined>();

  useEffect(() => {
    getExpense(id).then((res) => {
      setExpense(res);
      console.log(res);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <LoadingPage />;
  if (!expense) return <NotFoundPage />;

  const handleSave = async (data: FormData) => {
    if (!auth.user) return;

    const name = data.get("name") as string;
    const description = data.get("description") as string;
    const date = new Date(data.get("date") as string);
    const cost = data.get("cost") as unknown as number;
    const quantity = data.get("quantity") as unknown as number;

    try {
      updateExpense(id, { name, description, date, cost, quantity });
      toast.show({ message: "Your expense has been updated!", severity: "success" });
    } catch (err) {
      console.error(err);
      toast.show({ message: "Unable to update your expense! Please try again later.", severity: "error" });
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
        <Box component={"form"} className={"flex flex-col gap-4"} action={handleSave}>
          <Typography className={"font-bold text-2xl text-center"}>Edit Expense</Typography>
          <Box className={"flex flex-col gap-2"}>
            <TextField
              variant={"filled"}
              size={"small"}
              type={"text"}
              name={"name"}
              placeholder={"Name"}
              defaultValue={expense.name}
              hiddenLabel
              required
            />
            <TextField
              variant={"filled"}
              size={"small"}
              type={"text"}
              name={"description"}
              placeholder={"Description"}
              defaultValue={expense.description}
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
              defaultValue={humanizeDate(expense.date)}
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
              defaultValue={expense.cost}
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
              defaultValue={expense.quantity}
              hiddenLabel
              required
            />
          </Box>
          <Box className={"flex flex-col gap-2"}>
            <FormStatus>
              <FormStatus.Active>
                <Button variant={"contained"} color={"primary"} type={"submit"}>
                  Save
                </Button>
              </FormStatus.Active>
              <FormStatus.Pending>
                <Button variant={"contained"} color={"primary"} disabled>
                  Saving...
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
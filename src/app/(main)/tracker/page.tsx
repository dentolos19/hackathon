"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { useToast } from "@/components/providers/toast-provider";
import FormStatus from "@/components/ui/form-button";
import LoadingView from "@/components/views/loading-view";
import MissingParametersView from "@/components/views/missing-parameters-view";
import { updateUserPrefs } from "@/lib/auth";
import { getExpenses, getMonthlyExpenses } from "@/lib/expenses";
import { ExpenseDocument } from "@/lib/integrations/appwrite/types";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const auth = useAuth();
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState<ExpenseDocument[]>([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(0);
  const [monthlyBudget, setMonthlyBudget] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!auth.user) return;
    const now = dayjs();
    Promise.all([
      getExpenses(auth.user.$id).then((res) => {
        setExpenses(res);
      }),
      getMonthlyExpenses(auth.user.$id, now.year(), now.month()).then((res) => {
        setMonthlyExpenses(res);
        setMonthlyBudget(auth.user?.prefs.monthlyBudget || 0);
      }),
    ]).then(() => {
      setLoading(false);
    });
  }, [auth]);

  if (loading) return <LoadingView />;
  if (!auth.user) return <MissingParametersView />;

  console.log(auth.user.prefs);

  const handleModalSave = async (data: FormData) => {
    if (!auth.user) return;

    const budget = Number.parseFloat(data.get("budget") as string);

    try {
      await updateUserPrefs(auth.user.prefs, { monthlyBudget: budget });
      setMonthlyBudget(budget);
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.show({ message: "Failed to save monthly budget! Please try again later.", severity: "error" });
    } finally {
      auth.refresh();
      toast.show({ message: "Monthly budget has been saved!", severity: "success" });
    }
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Box>
      <Stack className={"py-4 mx-auto w-[90%] md:w-[70%] lg:w-[50%]"} spacing={1}>
        <Box className={"flex gap-2"}>
          <Paper className={"p-4 flex-1"}>
            <Typography className={"font-bold text-2xl"}>${monthlyExpenses}</Typography>
            <Typography className={"text-sm"} color={"textSecondary"}>
              This month's expenses
            </Typography>
          </Paper>
          <Paper className={"p-4 flex-1 flex"}>
            <Box className={"flex-1"}>
              <Typography className={"font-bold text-2xl"}>${monthlyBudget}</Typography>
              <Typography className={"text-sm"} color={"textSecondary"}>
                This month's budget
              </Typography>
            </Box>
            <Box className={"flex items-center"}>
              <IconButton onClick={handleModalOpen}>
                <EditIcon />
              </IconButton>
            </Box>
          </Paper>
        </Box>
        {expenses.length === 0 && (
          <Typography className={"mt-16 text-center"}>Get started by creating a new expense!</Typography>
        )}
        {expenses.map((expense) => (
          <Card key={expense.$id}>
            <CardActionArea LinkComponent={Link} href={`/tracker/${expense.$id}`}>
              <CardContent className={"flex"}>
                <Box className={"flex-1"}>
                  <Typography className={"font-bold text-2xl"}>{expense.name}</Typography>
                  <Typography className={"text-sm"} color={"textSecondary"}>
                    {dayjs(expense.date).format("MMMM D, YYYY")}
                  </Typography>
                </Box>
                <Box className={"flex items-center justify-center gap-1"}>
                  <Typography className={"font-bold text-2xl"}>${expense.cost.toFixed(2)}</Typography>
                  <Typography className={"text-sm"} color={"textSecondary"}>
                    x{expense.quantity}
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
      <Fab LinkComponent={Link} className={"fixed right-4 md:right-8 bottom-4 md:bottom-8"} href={"/tracker/new"}>
        <AddIcon />
      </Fab>
      <Dialog
        open={modalOpen}
        onClose={handleModalClose}
        PaperProps={{
          component: "form",
          action: handleModalSave,
        }}
      >
        <DialogTitle>Set Monthly Budget</DialogTitle>
        <DialogContent>
          <DialogContentText>Please set your monthly budget. Be appropriate in your setting!</DialogContentText>
          <FormControl className={"mt-4 w-full"} variant={"outlined"}>
            <OutlinedInput
              type={"number"}
              name={"budget"}
              defaultValue={"0.00"}
              required
              startAdornment={<InputAdornment position={"start"}>$</InputAdornment>}
              slotProps={{
                input: {
                  step: 0.01,
                },
              }}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <FormStatus>
            <FormStatus.Active>
              <Button type={"submit"}>Save</Button>
            </FormStatus.Active>
            <FormStatus.Pending>
              <Button disabled>Saving...</Button>
            </FormStatus.Pending>
          </FormStatus>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
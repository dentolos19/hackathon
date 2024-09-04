"use client";

import { useAuth } from "@/components/providers/auth-provider";
import LoadingView from "@/components/views/loading-view";
import { getExpenses } from "@/lib/expenses";
import { ExpenseDocument } from "@/lib/integrations/appwrite/types";
import AddIcon from "@mui/icons-material/Add";
import { Box, Card, CardActionArea, CardContent, Fab, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const auth = useAuth();
  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState<ExpenseDocument[]>([]);

  useEffect(() => {
    if (!auth.user) return;
    getExpenses(auth.user.$id).then((res) => {
      setExpenses(res);
      setLoading(false);
    });
  }, [auth]);

  if (loading) return <LoadingView />;

  return (
    <Box>
      <Stack className={"py-4 mx-auto w-[90%] md:w-[70%] lg:w-[50%]"} spacing={1}>
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
    </Box>
  );
}
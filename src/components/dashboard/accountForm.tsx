"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import useToast from "@/hooks/useToast";
import { updateAccountSettings } from "@/lib/actions/user/account/save";

const accountFormSchema = z.object({
  noitonUserId: z.string().optional(),
  notionAccountToken: z.string().optional(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

const AccountForm = ({
  userWithAccounts,
}: {
  userWithAccounts: Record<any, any>;
}) => {
  const defaultValues: Partial<AccountFormValues> = {
    noitonUserId: userWithAccounts?.notionUserId || undefined,
    notionAccountToken: userWithAccounts?.notionAuthToken || undefined,
  };

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  const toastOptions = useToast();

  const onSubmit = async (data: AccountFormValues) => {
    const accountData = await updateAccountSettings({
      id: userWithAccounts.id,
      notionAuthToken: data.notionAccountToken,
      notionUserId: data.noitonUserId,
    });
    if (accountData?.id) {
      toast.success("Account settings updated!", toastOptions);
    } else {
      toast.error("Failed to update account settings.", toastOptions);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="noitonUserId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notion User ID</FormLabel>
              <FormControl>
                <Input placeholder="Your User Id" {...field} />
              </FormControl>
              <FormDescription>
                This is your Notion user ID. You can find it in the URL of your
                Notion profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notionAccountToken"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notion Account Token</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Your Access Token"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your Notion account token.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update account settings</Button>
      </form>
    </Form>
  );
};

export default AccountForm;

"use client";

import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMockData } from "@/components/Providers";

const formSchema = z.object({
  username: z.string().min(3, "用户名至少包含六个字符"),
  password: z
    .string()
    .min(6, "密码至少包含六个字符")
    .max(18, "密码最多18个字符"),
  role: z.enum(["admin", "user"]),
  nickname: z.string().min(1, "请输入昵称"),
  email: z.string().email("请输入正确的邮箱格式"),
  status: z.enum(["active", "banned"]),
});

type formValueType = z.infer<typeof formSchema>;

const CreateUserPage = () => {
  const router = useRouter();

  const [users, setUsers] = useMockData();
  const form = useForm<formValueType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      role: "user",
      nickname: "",
      email: "",
      status: "active",
    },
  });

  const onSubmit = (value: formValueType) => {
    const id = Math.random().toString(36);
    const newUser = {
      ...value,
      id: id,
    };
    setUsers([...users, newUser]);
    router.back();
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex w-full h-12 items-center gap-4">
        <Button
          variant="ghost"
          className="rounded-full border"
          onClick={() => router.back()}
        >
          <MdArrowBack />
        </Button>
        <span className="text-lg font-bold">新增用户</span>
      </div>
      <div className="flex-1 flex flex-col gap-4 py-16">
        <Form {...form}>
          <form
            className="flex flex-col gap-4 w-[600px]"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    UserName
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Role
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Role"></SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">admin</SelectItem>
                        <SelectItem value="user">user</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    NickName
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Status
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Status"></SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">active</SelectItem>
                        <SelectItem value="banned">banned</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button type="submit" className="cursor-pointer">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateUserPage;

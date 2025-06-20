"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMockData } from "@/components/Providers";

const formSchema = z.object({
  username: z.string().min(3, "用户名至少包含六个字符"),
  password: z
    .string()
    .min(6, "密码至少包含六个字符")
    .max(18, "密码最多18个字符"),
});

type formValueType = z.infer<typeof formSchema>;

const LoginPage = () => {
  const router = useRouter();
  const [users, setUsers] = useMockData();

  const form = useForm<formValueType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: formValueType) => {
    console.log(values);
    const { username, password } = values;
    const target = users.find(
      (user) => user.username === username && user.password === password
    );
    if (!target) {
      alert("用户名或密码错误");
      return;
    }

    const id = target.id;

    document.cookie = `id=${id}; path=/`;

    router.push("/");
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-8 border p-4 rounded-md">
        <span className="text-2xl font-bold">登录</span>
        <div className="h-[300px] w-[350px]">
          <Form {...form}>
            <form
              className="flex flex-col gap-8"
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
              <Button type="submit" className="cursor-pointer">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

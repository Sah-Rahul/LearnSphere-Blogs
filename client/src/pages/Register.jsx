import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "@/helper/showToast";
import { LoginRoute } from "@/Routes/Route";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { USER_API_END_POINT } from "@/lib/constant";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const formSchema = z
    .object({
      name: z.string().min(3, "Name must be at least 3 characters."),
      email: z.string().email("Please enter a valid email."),
      password: z.string().min(8, "Password must be at least 8 characters."),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords must match",
      path: ["confirmPassword"],
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const res = await fetch(`${USER_API_END_POINT}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        return showToast("error", data.message || "Something went wrong!");
      }
      showToast("success", data.message || "Account created successfully!");
      navigate(LoginRoute);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md p-6 shadow-lg border">
        <h1 className="text-2xl font-bold text-center mb-5">Create Account</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="relative">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-10 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? <EyeOff size={25} /> : <Eye size={25} />}
              </button>
            </div>

            <Button type="submit" className="cursor-pointer w-full mt-2">
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> Please wait
                </>
              ) : (
                "Register"
              )}
            </Button>

            <div className="text-sm flex justify-center items-center gap-2 mt-3">
              <p>Already have an account?</p>
              <Link className="text-blue-500 hover:underline" to={LoginRoute}>
                Log In
              </Link>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Register;

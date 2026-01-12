import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const profileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    profileImg: z.any().optional(),
}).refine((data) => {

    if (data.password && data.password.trim().length > 0 && data.password.length < 6) {
        return false;
    }
    return true;
}, {
    message: "Password must be at least 6 characters",
    path: ["password"],
}).refine((data) => {

    if (data.password && data.password.trim().length > 0 && data.password !== data.confirmPassword) {
        return false;
    }
    return true;
}, {
    message: "Passwords must match",
    path: ["confirmPassword"],
});

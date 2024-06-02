import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
// import { useAuth } from '../../AuthContext'; // Make sure the path is correct
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useSignInMutation } from '@/store/apiSlices/authSlice';


const Login = () => {
    const { login } = useSignInMutation();
    const [ form, setForm ] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(form);
            toast.success('Login successful.');
        } catch (error) {
            toast.error('Login failed.');
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Link to="#" className="text-sm font-semibold leading-6 text-indigo-500">
                    Log in <span aria-hidden="true">&rarr;</span>
                </Link>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-bold text-2xl text-center border-b-2 border-indigo-400 pb-4">Login</DialogTitle>
                    <DialogDescription>
                        We're excited to see you again. Log in to access your account and continue your journey with us.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4 px-4">
                    <div className="grid grid-row-4 items-center gap-2">
                        <Label htmlFor="Email" className="text-md">
                            Email
                        </Label>
                        <Input 
                            id="Email" 
                            name="username" 
                            placeholder="Email" 
                            value={form.username} 
                            onChange={handleChange} 
                            className="col-span-3 outline-indigo-400" 
                        />
                    </div>
                    <div className="grid grid-row-4 items-center gap-2">
                        <Label htmlFor="Password" className="text-md">
                            Password
                        </Label>
                        <Input 
                            id="Password" 
                            name="password" 
                            placeholder="Password" 
                            type="password"
                            value={form.password} 
                            onChange={handleChange} 
                            className="col-span-3 outline-indigo-400" 
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-lg w-full">Login</Button>
                    </DialogFooter>
                </form>
                <Label htmlFor="Password" className="text-md">
                    Password
                    <Link to="#" className="col-span-3 text-indigo-500 outline-indigo-400 cursor-pointer"> Click Here </Link>
                </Label>
            </DialogContent>
        </Dialog>
    );
}

export default Login;

import React, { useState } from 'react';
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
import { Link } from "react-router-dom";
// import { useAuth } from '../../AuthContext'; // Make sure to adjust the import path
import { toast } from 'react-toastify';
import { useSignUpMutation } from '@/store/apiSlices/authSlice';

const Model = () => {
    const { register } = useSignUpMutation();
    const [form, setForm] = useState({
      name: '',
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
        await register(form);
        console.log('first', form)
        toast.success('Registration successful. You can now log in.');
      } catch (error) {
        toast.error('Registration failed.');
      }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="rounded-md bg-indigo-600 py-2.5 text-lg px-6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Get Started
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-bold text-2xl text-center border-b-2 border-indigo-400 pb-4">Register</DialogTitle>
                    <DialogDescription>
                        Registering is quick and easy. Just fill out the form below with your details to get started.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4 px-4">
                    <div className="grid grid-row-4 items-center gap-2">
                        <Label htmlFor="Name" className="text-md">
                            Name
                        </Label>
                        <Input id="Name" name="Name" placeholder="Name" className="col-span-3 outline-indigo-400" onChange={handleChange} value={form.username} />
                    </div>
                    <div className="grid grid-row-4 items-center gap-2">
                        <Label htmlFor="email" className="text-md">
                            Email
                        </Label>
                        <Input id="email" name="email" placeholder="Email" className="col-span-3 outline-indigo-400" onChange={handleChange} value={form.email} />
                    </div>
                    <div className="grid grid-row-4 items-center gap-2">
                        <Label htmlFor="password" className="text-md">
                            Password
                        </Label>
                        <Input id="password" name="password" type="password" placeholder="Password" className="col-span-3 outline-indigo-400" onChange={handleChange} value={form.password} />
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-lg w-full">Register</Button>
                    </DialogFooter>
                </form>
                <Label htmlFor="Password" className="text-md pl-3">
                    Forgot your password?
                    <Link to='/forgetpass' id="Password" className="text-indigo-500 outline-indigo-400 cursor-pointer ml-2">Click Here</Link>
                </Label>
            </DialogContent>
        </Dialog>
    );
}

export default Model;

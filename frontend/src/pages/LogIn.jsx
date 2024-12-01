import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/slices/userSlice";

const LogIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("email", formData.email);
    formdata.append("password", formData.password);
    dispatch(login(formdata));
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/${user.role}/dashboard`);
    }
   },[isAuthenticated,navigate,user]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your password"
                  className="w-full"
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading} >
              {
                loading ? "Logging In ..." : "Login"
              }
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-gray-500">
            Don't have an account yet?
          </div>
          <div className="flex gap-4 justify-center w-full">
            <Button
              variant="outline"
              onClick={() => navigate("/signup/farmer")}
              className="w-1/2"
            >
              Sign Up as Farmer
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/signup/buyer")}
              className="w-1/2"
            >
              Sign Up as Buyer
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LogIn;

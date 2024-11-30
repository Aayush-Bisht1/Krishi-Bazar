import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "@/store/slices/userSlice";

const SignUp = () => {
  const { text } = useParams();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
    address: "",
    phoneNo: "",
    profileImage: null,
    role: text || "",
    bankAccountNumber: "",
    bankAccountName: "",
    bankName: "",
    razorPayId: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
      }));
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const navigate = useNavigate();

  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("userName", formData.userName);
    formdata.append("password", formData.password);
    formdata.append("email", formData.email); 
    formdata.append("address", formData.address);
    formdata.append("phoneNo", formData.phoneNo);
    formdata.append("role", formData.role);
    formdata.append("profileImage", formData.profileImage);
    if (formData.role === "farmer") {
      formdata.append("bankAccountNumber", formData.bankAccountNumber);
      formdata.append("bankAccountName", formData.bankAccountName);
      formdata.append("bankName", formData.bankName);
      formdata.append("razorPayId", formData.razorPayId);
    }
    dispatch(register(formdata));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/${formData.role}/dashboard`);
    }
  }, [dispatch, isAuthenticated, loading]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Sign Up for Krishi Bazar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image Upload */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-300">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Camera className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  required
                />
              </div>
              <span className="text-sm text-gray-500">
                Click to upload profile picture
              </span>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
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
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNo">Phone Number</Label>
                <Input
                  id="phoneNo"
                  name="phoneNo"
                  type="tel"
                  value={formData.phoneNo}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  placeholder={text}
                  defaultValue={formData.role}
                  name="role"
                  className="cursor-not-allowed bg-gray-200"
                  readOnly
                />
              </div>
            </div>

            {/* Conditional Farmer Fields */}
            {text === "farmer" && (
              <div className="space-y-6 border-t pt-6">
                <h3 className="text-lg font-semibold">
                  Payment Method Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="accNo">Account Number</Label>
                    <Input
                      id="accNo"
                      name="bankAccountNumber"
                      placeholder="IFSC"
                      value={formData.bankAccountNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accName">Account Holder Name</Label>
                    <Input
                      id="accName"
                      name="bankAccountName"
                      value={formData.bankAccountName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="razorpayId">Razorpay ID</Label>
                    <Input
                      id="razorpayId"
                      name="razorPayId"
                      value={formData.razorPayId}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full">
              {loading && "Signing Up..."}
              {!loading && "Sign Up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;

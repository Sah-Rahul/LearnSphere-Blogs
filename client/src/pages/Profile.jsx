import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IoCameraOutline } from "react-icons/io5";
import Dropzone from "react-dropzone";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "@/hooks/useFetchData";
import { USER_API_END_POINT } from "@/lib/constant";
import Loading from "./Loading";
import { showToast } from "@/helper/showToast";
import { setUser } from "@/redux/slices/userSlice";

const Profile = () => {

  const dispatch = useDispatch()
  const [filePreview, setPreview] = useState();
  const [file, setFile] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [updating, setUpdating] = useState(false);

  const { user } = useSelector((state) => state.auth);

   
  const {
    data: userData,
    loading,
    error,
  } = useFetch(
    `${USER_API_END_POINT}/get-user/${user?._id}`,
    {
      method: "GET",
      credentials: "include",
    },
    [user?._id]
  );

  useEffect(() => {
    if (userData?.user) {
      setName(userData.user.name || "");
      setEmail(userData.user.email || "");
      setBio(userData.user.bio || "");
    }
  }, [userData]);

  const handleFileSelection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setPreview(preview);
  };

  const handleUpdate = async () => {
    try {
      setUpdating(true);

      const formData = new FormData();
      const data = { name, email, bio, password };
      formData.append("data", JSON.stringify(data));
      if (file) formData.append("file", file);

      const response = await fetch(
        `${USER_API_END_POINT}/update-user/${user?._id}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      const result = await response.json();
      if (result.success) {
        showToast("success", "Profile updated successfully");

        dispatch(setUser(result.user));

        setPreview(result.user.avatar);
      } else {
        showToast("error", "Failed to update profile");
      }
    } catch (err) {
      showToast("error", "Error updating profile");
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <Card>
        <CardContent>
          <div className="flex justify-center items-center mt-10">
            <Dropzone
              onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Avatar className="w-28 h-28 relative group">
                    <AvatarImage
                      src={
                        filePreview ||
                        userData?.user?.avatar ||
                        "https://avatar.iran.liara.run/public"
                      }
                      alt="User Avatar"
                    />
                    <div className="absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center bg-black bg-opacity-20 border-2 border-violet-500 rounded-full group-hover:flex hidden cursor-pointer">
                      <IoCameraOutline color="#7c3aed" />
                    </div>
                  </Avatar>
                </div>
              )}
            </Dropzone>
          </div>

          <div className="mt-8 space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                autoComplete="name"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Bio</label>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Enter bio"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password "
                autoComplete="password"
              />
            </div>

            <Button
              className="w-full cursor-pointer"
              onClick={handleUpdate}
              disabled={updating}
            >
              {updating ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Profile;

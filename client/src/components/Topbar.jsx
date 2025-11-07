import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search } from "lucide-react";
import SearchBox from "./SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_API_END_POINT } from "@/lib/constant";
import { removeUser } from "@/redux/slices/userSlice";
import { LoginRoute, registerRoute } from "@/Routes/Route";
import { showToast } from "@/helper/showToast";

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [showSearch, setShowSearch] = useState(false);
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  const handleLogout = async () => {
    try {
      const res = await fetch(`${AUTH_API_END_POINT}/logout`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Logout failed");
      }

      const data = await res.json();
      dispatch(removeUser());
      showToast("success", data.message || "Logout successful");
      navigate(LoginRoute);
    } catch (error) {
      console.error("Logout error:", error);
      showToast("error", error.message || "Logout failed");
    }
  };

  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b">
      <div className="flex justify-center items-center gap-2">
        <button className="md:hidden" type="button">
          <AiOutlineMenu size={24} />
        </button>
        <Link to="/" className="text-red-500">
          LearnSphere
        </Link>
      </div>

      <div className="w-[500px]">
        <div
          className={`md:relative md:block absolute bg-white left-0 w-full md:top-0 top-16 md:p-0 p-5 ${
            showSearch ? "block" : "hidden"
          }`}
        >
          <SearchBox />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button
          onClick={toggleSearch}
          type="button"
          className="md:hidden block"
        >
          <IoMdSearch size={25} />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                src={user?.avatar || "https://avatar.iran.liara.run/public"}
                className="cursor-pointer"
              />
            </Avatar>
          </DropdownMenuTrigger>

          {!user ? (
            <>
              {" "}
              <Button asChild className="rounded-full">
                <Link to={registerRoute}>
                  <MdLogin />
                  Sign In
                </Link>
              </Button>
            </>
          ) : (
            <>
              {" "}
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <p>{user.name}</p>
                  <p className="text-sm">{user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/profile">
                    <FaRegUser />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/create-blog">
                    <FaPlus />
                    Create Blog
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <IoLogOutOutline color="red" />
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </>
          )}
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Topbar;

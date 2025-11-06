import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
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

const Topbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const toggleSearch = () => {
    setShowSearch(!showSearch);
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

        <Button asChild className="rounded-full">
          <Link to="/signin">
            <MdLogin />
            Sign In
          </Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                src="https://images.unsplash.com/photo-1554755229-ca4470e07232?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDR8Ym84alFLVGFFMFl8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=500"
                className="cursor-pointer"
              />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <p>John Doe</p>
              <p className="text-sm">johndoe@email.com</p>
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
              <IoLogOutOutline color="red" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Topbar;

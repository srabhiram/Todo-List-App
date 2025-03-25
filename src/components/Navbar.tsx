"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

type userProps = {
  _id : string
  displayname : string
  username : string
}
const Navbar = ({ user }: { user: userProps[] }) => {
  const [currentUser, setCurrentUser] = useState<string>("");

  // Update currentUser when user data is available
  useEffect(() => {
    if (user.length > 0) {
      setCurrentUser(user[0]?.displayname);
    }
  }, [user]);
  return (
    <header className="flex justify-between p-2 bg-gray-200">
      <h1>Todo List</h1>
      <div className="flex gap-4">
        {/* <button className="bg-blue-400 px-2 py-1 rounded-xl">
          {currentUser}
        </button> */}
        <Select defaultValue={currentUser} onValueChange={setCurrentUser}>
          <SelectTrigger className="w-[150px] border-2 bg-gray-300">
            <SelectValue placeholder={currentUser} />
          </SelectTrigger>
          <SelectContent>
            {user?.map((user) => (
              <SelectItem value={user.displayname} key={user._id}>
                {user.displayname}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-5 items-center">
          <Image alt="profilepng" src={"/profile.png"} width={20} height={10} />
          <b>{currentUser}</b>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

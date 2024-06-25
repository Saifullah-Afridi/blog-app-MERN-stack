import React from "react";
import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

const Header = () => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <Navbar className="border-b-2 text-sm sm:text-xl ">
      <Link to="/" className="self-center    whitespace-nowrap font-semibold">
        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg py-1 px-2">
          Saifullah's
        </span>
        Blog
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline w-12 h-10"
        />
      </form>
      <Button color="gray" className="lg:hidden rounded-full">
        <AiOutlineSearch />
      </Button>

      <Navbar.Collapse>
        <Navbar.Link as="div" active={pathname === "/"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link as="div" active={pathname === "/about"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link as="div" active={pathname === "/projects"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
      <div className="flex gap-2 md:order-2">
        <Button
          color="gray"
          className="rounded-full hidden sm:inline w-12 h-10"
        >
          <FaMoon />
        </Button>
        <Link to="/sign-in">
          <Button gradientDuoTone="purpleToBlue" outline>
            Sign in
          </Button>
        </Link>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
};

export default Header;

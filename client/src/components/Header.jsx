import React, { useEffect } from "react";
import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import HeaderMenu from "./HeaderMenu";
import { toggleTheme } from "../store/slices/themeSlice";

const Header = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const handleTheme = () => {
    dispatch(toggleTheme());
  };
  return (
    <Navbar className="border-b-2 text-sm sm:text-xl">
      <Link to="/" className="self-center    whitespace-nowrap font-semibold ">
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
      <div className="flex gap-2 md:order-2">
        <Button
          onClick={handleTheme}
          color="gray"
          className="rounded-full hidden sm:inline w-12 h-10"
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {isAuthenticated ? (
          <HeaderMenu user={user} />
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign in
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>
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
    </Navbar>
  );
};

export default Header;

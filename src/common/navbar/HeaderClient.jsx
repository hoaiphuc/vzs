import { Navbar, Text, Avatar, Dropdown, Input } from "@nextui-org/react";
import { Layout } from "./Layout.js";
import { AcmeLogo } from "./AcmeLogo.js";
import { SearchIcon } from "./SearchIcon.js";
import { useAuth } from "../../components/firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { currentuser, logout } from "../feartures/authSlice.js";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { ClassSharp } from "@mui/icons-material";

export default function HeaderClient() {
  const [photoURL, setPhotoURL] = useState('');
  // const user = typeof localStorage.getItem("user") === 'string' ? JSON.parse(localStorage.getItem("user")) : null;

  const user = JSON.parse(localStorage.getItem("user"));

  const [activeLink, setActiveLink] = useState('/');

  const current_User = useSelector(currentuser);

  const currentUser = useAuth();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
  }, [current_User])
  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL)
    console.log('user');

  }, [currentUser, user])
  }, [currentUser])

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate("/");
      console.log("you are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };
  const handleLogin = async () => {
    try {
      navigate("/signin");
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleClick = (event, href) => {
    event.preventDefault();
    setActiveLink(href);
    navigate(href);
  };
  return (
    <Layout>
      <Navbar isBordered variant="sticky">
        <Navbar.Brand>

          <AcmeLogo />

          <Navbar.Content hideIn="xs" variant="highlight">
            <Navbar.Link isActive={activeLink === '/' ? true : false} onClick={(event) => handleClick(event, '/')}>
              Trang chủ
            </Navbar.Link>
            <Navbar.Link isActive={activeLink === '/post' ? true : false} onClick={(event) => handleClick(event, '/post')}>
              Đăng bài
            </Navbar.Link>
          </Navbar.Content>
        </Navbar.Brand>
        <Navbar.Content
          css={{
            "@xsMax": {
              w: "100%",
              jc: "space-between",
            },
          }}
        >
          <Navbar.Item
            css={{
              "@xsMax": {
                w: "100%",
                jc: "center",
              },
            }}
          >
            <Input
              clearable
              contentLeft={
                <SearchIcon fill="var(--nextui-colors-accents6)" size={16} />
              }
              contentLeftStyling={false}
              css={{
                w: "100%",
                boxShadow: "2px 5px 25px -5px #878383",
                "@xsMax": {
                  mw: "300px",
                },
                "& .nextui-input-content--left": {
                  h: "100%",
                  ml: "$4",
                  dflex: "center",
                },
              }}
              placeholder="Search..."
            />
          </Navbar.Item>
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  color="success"
                  size="xl"
                  src={current_User?.isAuthenticated ? photoURL : "https://api-private.atlassian.com/users/f3ba6e3feb7b6867012f05b2f873affb/avatar"}
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="success"
              onAction={(actionKey) => console.log({ actionKey })}
            >
              {!current_User?.isAuthenticated ? (
                <Dropdown.Item key="profile" css={{ height: "$18" }}>
                  <Text
                    onClick={handleLogin}
                    b
                    color="inherit"
                    css={{ d: "flex" }}
                  >
                    Đăng nhập
                  </Text>
                </Dropdown.Item>
              ) : (
                ""
              )}

              <Dropdown.Item key="settings" withDivider>
                <Link to="/profile">Thông tin cá nhân </Link>
              </Dropdown.Item>
              <Dropdown.Item key="team_settings">
                <Link to="/mypost">Bài đăng của tôi</Link>
              </Dropdown.Item>
              <Dropdown.Item key="analytics" withDivider>
                Bài đăng đã thích
              </Dropdown.Item>
              <Dropdown.Item key="system">Cài đặt</Dropdown.Item>
              <Dropdown.Item key="configurations">Giao diện</Dropdown.Item>
              <Dropdown.Item key="help_and_feedback" withDivider>
                Trợ giúp & Phản hồi{" "}
              </Dropdown.Item>
              {current_User?.isAuthenticated ? (
                <Dropdown.Item key="logout" withDivider color="error">
                  <div onClick={handleLogout}>Đăng xuất</div>
                </Dropdown.Item>
              ) : (
                ""
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
      </Navbar>
    </Layout>
  );
}

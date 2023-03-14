import { Navbar, Text, Avatar, Dropdown, Input } from "@nextui-org/react";
import { Layout } from "./Layout.js";
import { AcmeLogo } from "./AcmeLogo.js";
import { SearchIcon } from "./SearchIcon.js";
import { useAuth } from "../../components/firebase.js";
import { useDispatch } from "react-redux";
import { logout } from "../feartures/authSlice.js";
import { Link, useNavigate } from "react-router-dom";

export default function HeaderClient() {
  const user = JSON.parse(localStorage.getItem("user"));
  const currentUser = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <Layout>
      <Navbar isBordered variant="sticky">
        <Navbar.Brand css={{ mr: "$4" }}>
          <AcmeLogo />
          
          <Navbar.Content hideIn="xs" variant="highlight">
            <Navbar.Link isActive href="/">
              Trang chủ
            </Navbar.Link>
            <Navbar.Link href="/post">Đăng bài</Navbar.Link>
            {/* <Navbar.Link href="#">Activity</Navbar.Link>
            <Navbar.Link href="#">Settings</Navbar.Link> */}
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
                  size="lg"
                  src={user ? user.avatar : "https://cdn.lazi.vn/storage/uploads/users/avatar/1587962225_1585288013_anonymous_512.png"}
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="secondary"
              onAction={(actionKey) => console.log({ actionKey })}
            >
              {!user ? (
                <Dropdown.Item key="profile" css={{ height: "$18" }}>
                  <Text
                    onClick={handleLogin}
                    b
                    color="inherit"
                    css={{ d: "flex" }}
                  >
                    Sign In
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
              {user ? (
                <Dropdown.Item key="logout" withDivider color="error">
                  <div onClick={handleLogout}>Log Out</div>
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

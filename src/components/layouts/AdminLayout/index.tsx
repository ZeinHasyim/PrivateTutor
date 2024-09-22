import Sidebar from "@/components/fragments/Sidebar";
import styles from "./AdminLayout.module.scss";

type Proptypes = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: "bxs-dashboard",
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: "bxs-group",
  },
  {
    title: "Profile Guru",
    url: "/admin/profile-guru",
    icon: "bxs-box",
  },
  {
    title: "Monitoring",
    url: "/admin/pembelajaran",
    icon: "bxs-box",
  },
  {
    title: "Profile",
    url: "/admin/profile",
    icon: "bxs-group",
  },
];

const AdminLayout = (props: Proptypes) => {
  const { children } = props;
  return (
    <div className={styles.admin}>
      <Sidebar lists={listSidebarItem} name="Admin" />
      <div className={styles.admin__main}>{children}</div>
    </div>
  );
};

export default AdminLayout;

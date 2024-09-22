import Sidebar from "@/components/fragments/Sidebar";
import styles from "./AdminLayout.module.scss";

type Proptypes = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/guru",
    icon: "bxs-dashboard",
  },
  {
    title: "Upload Profile",
    url: "/guru/upload-profile",
    icon: "bxs-box",
  },
{
  title: "Monitoring",
  url: "/guru/pembelajaran",
  icon: "bxs-box",
},
{
  title: "Profile",
  url: "/guru/profile",
  icon: "bxs-user",
},
];

const GuruLayout = (props: Proptypes) => {
  const { children } = props;
  return (
    <div className={styles.admin}>
      <Sidebar lists={listSidebarItem} name="Guru" />
      <div className={styles.admin__main}>{children}</div>
    </div>
  );
};

export default GuruLayout;

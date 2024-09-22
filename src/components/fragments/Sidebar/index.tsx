import { useRouter } from "next/router";
import styles from "./Sidebar.module.scss";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { signOut } from "next-auth/react";

type Proptypes = {
  lists: Array<{
    title: string;
    url: string;
    icon: string;
  }>;
  name: string;
};

const Sidebar = (props: Proptypes) => {
  const { lists, name } = props;
  const {pathname} = useRouter();
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__top}>
        <h1 className={styles.sidebar__top__title}>{name} Panel</h1>
        <div className={styles.sidebar__top__lists}>
          {lists.map((list, index) => (
            <Link href={list.url} key={list.title} className={`${styles.sidebar__top__lists__item} ${pathname === list.url && styles.sidebar__top__lists__item__active}`}>
              <i className={`bx ${list.icon}`}></i>
              <h4 className={styles.sidebar__top__lists_item_title}>
                {list.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.sidebar__bottom}>
        <Button className={styles.sidebar__bottom__button} type="button" variant="secondary"> <Link href={"/"} > Kembali ke Home</Link></Button>
      
        <Button className={styles.sidebar__bottom__button} type="button" variant="secondary" onClick={() => signOut({ callbackUrl: '/' })
}>Logout</Button>
      </div>
    </div>
  );
};

export default Sidebar;

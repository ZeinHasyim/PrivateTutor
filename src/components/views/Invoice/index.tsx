import styles from "./Invoice.module.scss";
import convertIDR from "@/utils/currency";
import { Pembelajaran } from "@/types/pembelajaran.type";

type PropTypes = {
    pembelajaran: Pembelajaran | any;
};
const InvoiceView = ({ pembelajaran }: PropTypes) => {

    const handlePrint = () => {
        window.print(); // Fungsi cetak browser
    };
    // useEffect(() => {
    //     window.print();
    //     setPrint(true);
    // }, []);
    console.log(pembelajaran)
    return (
        <div className={styles.invoice}>
            <header className={styles.invoice__header}>
                <h1>Invoice</h1>
                <div className={styles.invoice__header__companyInfo}>
                    <h2>Private Tutor</h2>
   
                </div>
            </header>

            <section className={styles.invoice__details}>
                <div className={styles.invoice__details__customerInfo}>
                    <h3>Billing To:</h3>
                    <p>{pembelajaran?.member_name}</p>
                </div>
                <div className={styles.invoice__details__invoiceMeta}>
                    <p><strong>Invoice Number:</strong> {pembelajaran?.orderIdx}</p>
                </div>
            </section>

            <section className={styles.invoice__items}>
                <table>
                    <thead>
                        <tr>
                            <th>Teacher</th>
                            <th>Day</th>
                            <th>Jumlah Pertemuan</th>
                            <th>Course Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{pembelajaran?.teacher_name}</td>
                            <td>{pembelajaran?.day}</td>
                            <td>{pembelajaran?.meeting}</td>
                            <td>{convertIDR(pembelajaran?.price)}</td>
                            <td>{convertIDR(pembelajaran?.price)}</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <footer className={styles.invoice__footer}>
                <p><strong>Subtotal:</strong> </p>
                <p><strong>Total:</strong> {convertIDR(pembelajaran?.price)}</p>
                <p>Terima kasih sudah mempercayai kami</p>
            </footer>

            <div className={styles.invoice__printButton}>
                <button onClick={handlePrint}>Print Invoice</button>
            </div>
        </div>
    );
};
export default InvoiceView;

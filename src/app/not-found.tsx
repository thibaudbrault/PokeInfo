import Image from 'next/image';

import styles from '@/modules/404/NotFound.module.scss';

function NotFound() {
  return (
    <main className={styles.main}>
      <Image
        className={styles.image}
        src={`/MissingNo.png`}
        alt="MissingNo"
        width={150}
        height={150}
      />
      <p className={styles.text}>Oops !</p>
      <p className={styles.text}>The URL entered does not exist</p>
      <p className={styles.text}>Use the links above to find your way back</p>
    </main>
  );
}

export default NotFound;

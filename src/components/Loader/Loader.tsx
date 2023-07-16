import Image from 'next/image';

import styles from './Loader.module.scss';
import { TailSpin } from 'react-loader-spinner';

export function Loader() {
  return (
    <div className={styles.loading}>
      <Image src={`/pokeball.svg`} alt="" width={192} height={192} />
    </div>
  );
}

export function SmallLoader() {
  return (
    <div className={styles.smallLoading}>
      <Image src={`/pokeball.svg`} alt="" width={48} height={48} />
    </div>
  );
}

export function Spinner() {
  return (
    <TailSpin
      ariaLabel="loading"
      radius="1"
      wrapperClass={styles.spinner}
      visible={true}
    />
  );
}

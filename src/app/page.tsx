import styles from './page.module.css';
import Timeline from '../components/Timeline';
import SettingsSection from '../components/SettingsSection';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.titleSection}>
        <h1 className={styles.heading}>
          Let's build a world-class timeline!
        </h1>
      </div>
      <Timeline />
      <SettingsSection />
    </div>
  );
}

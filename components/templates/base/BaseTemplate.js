import styles from './BaseTemplate.module.css';

export const IBaseTemplate = {
  sampleTextProp: '',
};

function BaseTemplate({ sampleTextProp }) {
  return <div className={styles.container}>{sampleTextProp}</div>;
}

export default BaseTemplate;

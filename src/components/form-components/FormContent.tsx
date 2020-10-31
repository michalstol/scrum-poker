import React from 'react';

import styles from './../../styles/form.module.scss';

export default function FormContent({ children }: any) {
    return <div className={styles['form-content']}>{children}</div>;
}

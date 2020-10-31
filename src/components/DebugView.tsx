import React from 'react';

import { ContextInterface } from './../contexts/AppContext';

import styles from './../styles/debug.module.scss';

export default function DebugView({
    authenticated,
    connected,
    roomID,
    role,
    userName,
}: ContextInterface): any {
    return (
        <table className={styles.debug}>
            <thead>
                <tr>
                    <th>authenticated</th>
                    <th>connected</th>
                    <th>userName</th>
                    <th>roomID</th>
                    <th>role</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{authenticated ? 'true' : 'false'}</td>
                    <td>{connected ? 'true' : 'false'}</td>
                    <td>{userName}</td>
                    <td>{!!roomID ? roomID : 'null'}</td>
                    <td>{!!role ? role : 'null'}</td>
                </tr>
            </tbody>
        </table>
    );
}

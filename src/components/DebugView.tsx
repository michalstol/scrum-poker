import React from 'react';

import { ContextInterface } from './../contexts/AppContext';

import styles from './../styles/debug.module.scss';

export default function DebugView({
    authenticated,
    connected,
    reset,
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
                    <th>reset</th>
                    <th>userName</th>
                    <th>roomID</th>
                    <th>role</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{authenticated ? 'true' : 'false'}</td>
                    <td>{connected ? 'true' : 'false'}</td>
                    <td>
                        {reset === true && 'true'}
                        {reset === false && 'false'}
                        {reset === 'both' && 'both'}
                    </td>
                    <td>{userName}</td>
                    <td>{!!roomID ? roomID : 'null'}</td>
                    <td>{!!role ? role : 'null'}</td>
                </tr>
            </tbody>
        </table>
    );
}

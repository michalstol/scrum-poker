import React, { useState, useEffect } from 'react';

import { auth, db } from './../firebase/firebase';
import { setCookie } from './../helpers/cookie';

import { RoomIDInterface } from './../contexts/AppContext';

export default function Room({ roomID }: RoomIDInterface) {}

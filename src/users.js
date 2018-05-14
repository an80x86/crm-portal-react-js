// in src/users.js
import React from 'react';
import { List, Datagrid, TextField, BooleanField } from 'react-admin';

export const UserList = (props) => (
    <List title="Kullanıcılar" {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="user_kod" />
            <TextField source="user_ad" />
            <TextField source="user_soyad" />
            <TextField source="user_sifre" />
            <BooleanField source="durum" />
        </Datagrid>
    </List>
);

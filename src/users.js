// in src/users.js
import React from 'react';
import { List, Create, Edit, EditButton, Datagrid, TextField, BooleanField, TextInput, BooleanInput, SimpleForm, DisabledInput } from 'react-admin';
import { Filter } from 'react-admin';

const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

export const UserList = (props) => (
    <List title="Kullanıcılar" {...props} filters={<UserFilter />}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="user_kod" />
            <TextField source="user_ad" />
            <TextField source="user_soyad" />
            <BooleanField source="durum" />
            <EditButton />
        </Datagrid>
    </List>
);

const UserTitle = ({ record }) => {
    return <span>Kullanıcı: {record ? `"${record.user_kod}"` : ''}</span>;
};

export const UserEdit = (props) => (
    <Edit title={<UserTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="user_kod" />
            <TextInput source="user_ad" />
            <TextInput source="user_soyad" />
            <TextInput source="user_sifre" type="password"/>
            <BooleanInput source="durum" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
          <TextInput source="user_kod" />
          <TextInput source="user_ad" />
          <TextInput source="user_soyad" />
          <TextInput source="user_sifre" />
          <BooleanInput source="durum" />
        </SimpleForm>
    </Create>
);

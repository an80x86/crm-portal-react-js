// in src/App.js
import React from 'react';
import { Admin, Resource } from 'react-admin';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';

import { PostList, PostEdit, PostCreate } from './posts';
import { UserList, UserEdit } from './users';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import dataProvider from './dataProvider';

//const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');

const App = () => (
    <Admin title="crm portal v1.2" dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />
        <Resource name="users" list={UserList} edit={UserEdit} icon={UserIcon}/>
    </Admin>
);

export default App;

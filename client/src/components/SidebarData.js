import React from 'react'

import * as AiIcons from 'react-icons/ai'
import * as CgIcons from 'react-icons/cg';
import * as BsIcons from 'react-icons/bs';

import * as FcIcons from 'react-icons/fc';

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Insert 1K',
        path: '/insert1K',
        icon: <CgIcons.CgInsertBeforeO />,
        cName: 'nav-text'
    },
    {
        title: 'Insert 10K',
        path: '/insert10k',
        icon: <CgIcons.CgInsertBefore />,
        cName: 'nav-text'
    },
    {
        title: 'Insert 100K',
        path: '/insert100k',
        icon: <CgIcons.CgInsertBeforeR />,
        cName: 'nav-text'
    },
    {
        title: 'Display Data',
        path: '/displaydata',
        icon: <BsIcons.BsTable />,
        cName: 'nav-text'
    },
    {
        title: 'Display Count',
        path: '/displaycount',
        icon: <AiIcons.AiOutlineFieldNumber />,
        cName: 'nav-text'
    },
    {
        title: 'Delete All',
        path: '/deleteall',
        icon: <FcIcons.FcDeleteDatabase />,
        cName: 'nav-text'
    }

];

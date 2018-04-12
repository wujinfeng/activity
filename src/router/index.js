import Vue from 'vue';
import Router from 'vue-router';

import Index from '../components/page/Index.vue'

import ActList from '../components/page/agentOpsClient/ActList.vue'
import ActAdd from '../components/page/agentOpsClient/ActAdd.vue'
import ActStatis from '../components/page/agentOpsClient/ActStatis.vue'

import AwardList from '../components/page/agentOpsClient/AwardList.vue'
import AwardAdd from '../components/page/agentOpsClient/AwardAdd.vue'
import AwardWin from '../components/page/agentOpsClient/AwardWin.vue'

import AdList from '../components/page/agentOpsClient/AdList.vue'
import AdAdd from '../components/page/agentOpsClient/AdAdd.vue'
import AdStatis from '../components/page/agentOpsClient/AdStatis.vue'

import Login from '../components/page/Login.vue'

Vue.use(Router);

const router =  new Router({
    linkActiveClass: 'active',
    routes: [
        {
            name: 'login',
            path: '/',
            redirect: '/index'
        },
        {
            name: 'index',
            path: '/index',
            component: Index,
            children: [
                {
                    name: 'ActAdd',
                    path: '/ActAdd',
                    component: ActAdd,
                },
                {
                    name: 'ActList',
                    path: '/ActList',
                    component: ActList,
                },
                {
                    name: 'ActStatis',
                    path: '/ActStatis',
                    component: ActStatis,
                },
                {
                    name: 'AwardAdd',
                    path: '/AwardAdd',
                    component: AwardAdd,
                },
                 {
                    name: 'AwardList',
                    path: '/AwardList',
                    component: AwardList,
                },
                {
                    name: 'AwardWin',
                    path: '/AwardWin',
                    component: AwardWin,
                },
                 {
                    name: 'AdList',
                    path: '/AdList',
                    component: AdList,
                },
                {
                    name: 'AdAdd',
                    path: '/AdAdd',
                    component: AdAdd,
                },
                {
                    name: 'AdStatis',
                    path: '/AdStatis',
                    component: AdStatis,
                }
            ]
        },
        {
            path: '/login',
            component: Login
        }
    ]
})





export default router;

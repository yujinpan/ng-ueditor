import 'bootstrap/dist/css/bootstrap.css';

import './index.css';

import angular from 'angular';

import uirouter from 'angular-ui-router';
import routeConfig from './config';

import ueditorDirective from './component/ngUeditor';

angular.module('app', [uirouter, ueditorDirective])
    .config(routeConfig);

// 模拟加载
(()=>{
    angular.bootstrap(document, ['app']);
    setTimeout(() => {
        document.getElementById('main').setAttribute('style', '');
        document.getElementById('loading').remove();
    }, 1000);
})();
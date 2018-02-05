import angular from 'angular';

import './index.css';

// 主体：UEditor的directive类
class UEditor {
    constructor($timeout, $sce, $interval) {
        this.$timeout = $timeout;
        this.$sce = $sce;
        this.$interval = $interval;

        this.restrict = 'E';
        this.template = `
            <div class="ueditor-wrapper">
                <p ng-if="ueditorLoading" class="text-center small ueditor-loading">加载中...</p>
                <ul class="list-unstyled ueditor-list">
                    <li>
                        <div id="ueditor" class="pull-left"></div>
                    </li>
                    <li>
                        <article class="ueditor-content-view pull-left" ng-bind-html="content"></article>
                    </li>
                </ul>
            </div>
        `;
    }

    link(scope, element, attr) {
        scope.ueditorLoading = true;

        const ID = ueditor;

        // 实例化ueditor
        let ops = {
            focus: false,
            enableAutoSave: false,      // 自动保存
            initialFrameHeight: 400,    // 初始高度
            initialFrameWidth: '100%'   // 初始宽度
        };
        let ue = UE.getEditor(ID, ops);

        // UEditor ready
        let timeid;
        ue.ready(() => {

            // 监听UEditor编辑内容变化
            ue.addListener('contentChange selectionChange', () => {
                if (timeid) this.$timeout.cancel(timeid);
                timeid = this.$timeout(() => {
                    let html = ue.getContent();
                    if (scope.content !== html) {
                        scope.content = this.$sce.trustAsHtml(html);
                        timeid = null;
                    }
                }, 50);
            });

            // 初始化内容
            var beforeSetContentFn = () => {
                scope.$apply(function () {
                    scope.ueditorLoading = false;
                });
                ue.removeListener('beforeSetContent', beforeSetContentFn);
            };
            ue.addListener('beforeSetContent', beforeSetContentFn);

            // 点击结束自动输入
            var clickFn = () => {
                this.$interval.cancel(intervalId);
                intervalId = null;
                ue.removeListener('click', clickFn);
            };
            ue.addListener('click', clickFn);

            // 自动输入
            let intervalId, index = 0, initWord = [
                '<h2>Hello...</h2>',
                '<h3>You can try editing it.</h3>'
            ];
            intervalId = this.$interval(() => {
                ue.execCommand('inserthtml', initWord[index++]);
                if(index === initWord.length){
                    index--;
                }
            }, 800);
            
        });

        // UEditor destroy
        // *指令生命周期结束时，销毁编辑器实例，否则UEditor再次创建时报错
        scope.$on('$destroy', () => {
            ue.destroy();

            // 结束timeout
            $timeout.cancel(timeid);
            timeid = null;
        });
    }
}

// 辅助：用于UEditor的创建函数，方便注入其他的服务
function createDirective(...args) {
    return new UEditor(...args);
}
createDirective.$inject = ['$timeout', '$sce', '$interval'];

export default angular.module('directive.UEditor', [])
    .directive('ueditor', createDirective)
    .name;
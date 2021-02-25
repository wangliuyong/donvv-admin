/** ele admin license by http://eleadmin.com */
import NProgress from 'nprogress';
import ElementUI from 'element-ui';
import EleAvatarList from './ele-avatar-list';
import EleDataTable from './ele-data-table';
import EleDot from './ele-dot';
import EleEmpty from './ele-empty';
import EleEmptyLayout from './ele-empty-layout';
import EleProBreadcrumb from './ele-pro-breadcrumb';
import EleProHeader from './ele-pro-header';
import EleProLayout from './ele-pro-layout';
import EleProSetting from './ele-pro-setting';
import EleProSidebar from './ele-pro-sidebar';
import EleProSidebarItem from './ele-pro-sidebar-item';
import EleProTable from './ele-pro-table';
import EleProTableColumn from './ele-pro-table-column';
import EleProTableTools from './ele-pro-table-tools';
import EleProTabs from './ele-pro-tabs';
import EleResult from './ele-result';
import ElTableDraggable from './ele-table-draggable';
import EleTagsInput from './ele-tags-input';
import EleToolbar from './ele-toolbar';
import util from './util.js';

const install = function (Vue, opt) {
  NProgress.configure(Object.assign({
    showSpinner: false,
    trickleSpeed: 300
  }, opt ? opt.nProgress : opt));
  Vue.use(ElementUI, opt);
  Vue.component(EleAvatarList.name, EleAvatarList);
  Vue.component(EleDataTable.name, EleDataTable);
  Vue.component(EleDot.name, EleDot);
  Vue.component(EleEmpty.name, EleEmpty);
  Vue.component(EleEmptyLayout.name, EleEmptyLayout);
  Vue.component(EleProBreadcrumb.name, EleProBreadcrumb);
  Vue.component(EleProHeader.name, EleProHeader);
  Vue.component(EleProLayout.name, EleProLayout);
  Vue.component(EleProSetting.name, EleProSetting);
  Vue.component(EleProSidebar.name, EleProSidebar);
  Vue.component(EleProSidebarItem.name, EleProSidebarItem);
  Vue.component(EleProTable.name, EleProTable);
  Vue.component(EleProTableColumn.name, EleProTableColumn);
  Vue.component(EleProTableTools.name, EleProTableTools);
  Vue.component(EleProTabs.name, EleProTabs);
  Vue.component(EleResult.name, EleResult);
  Vue.component(ElTableDraggable.name, ElTableDraggable);
  Vue.component(EleTagsInput.name, EleTagsInput);
  Vue.component(EleToolbar.name, EleToolbar);
  Vue.prototype.$util = util;
  // 添加全局过滤器
  Vue.filter('timeAgo', (value, onlyDate) => {
    return util.timeAgo(value, onlyDate);
  });
  Vue.filter('digit', (value, length) => {
    return util.digit(value, length);
  });
  Vue.filter('toDateString', (value, format) => {
    return util.toDateString(value, format);
  });
  Vue.filter('escape', (value) => {
    return util.escape(value);
  });
  Vue.filter('htmlToText', (value) => {
    return util.htmlToText(value);
  });
}

export {
  EleAvatarList,
  EleDataTable,
  EleDot,
  EleEmpty,
  EleEmptyLayout,
  EleProBreadcrumb,
  EleProHeader,
  EleProLayout,
  EleProSetting,
  EleProSidebar,
  EleProSidebarItem,
  EleProTable,
  EleProTableColumn,
  EleProTableTools,
  EleProTabs,
  EleResult,
  ElTableDraggable,
  EleTagsInput,
  EleToolbar,
  util
}

export default {
  install
}

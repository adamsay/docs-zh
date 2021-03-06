/**
 *
 * Created by nantas on 15/4/6.
 */
'use strict';

var Path = require('path');
var _ = require('lodash');

hexo.extend.helper.register('category_name', function() {
    var cat = this.page.path.split('/')[0];
    var menu = this.site.data.menu;
    for (var title in menu) {
        var link = menu[title];
        if (link === cat) {
            return title ;
        }
    }
    return "";
});

hexo.extend.helper.register('category_link', function() {
    var cat = this.page.path.split('/')[0];
    var menu = this.site.data.menu;
    for (var title in menu) {
        var link = menu[title];
        if (link === cat) {
            return link ;
        }
    }
    return "";
});

hexo.extend.helper.register('category_content', function(slug) {
    var cat = slug ? slug : this.page.path.split('/')[0];
    var sidebar = this.site.data['sidebar_' + cat];
    //var path = this.page.path.replace(/\/$/, '');
    var result = '';
    var self = this;
    //console.log(this.page.content);
    result += '<ul class="nav nav-pills nav-stacked">';
    _.each(sidebar, function(menu, title){
        result += '<li role="presentation" class="sidebar-title"><strong class="sidebar-title">' + title + '</strong></li>';
        _.each(menu, function(link, text){
            var itemClass = 'sidebar-link';
            result += '<li role="presentation"><a href="' + self.url_for(link) + '" class="' + itemClass + '">' + text + '</a></li>';
        })
    });
    //console.log(result);
    return result;
});

hexo.extend.helper.register('doc_category', function(){
    //console.log('page path: ' + this.page.path);
    var cat = this.page.path.split('/')[0];
    var sidebar = this.site.data['sidebar_' + cat];
    var path = this.page.path.replace(/\/$/, '');
    var result = '';
    var self = this;

    result += '<ul class="nav nav-pills nav-stacked">';
    _.each(sidebar, function(menu, title){
        result += '<li role="presentation" class="sidebar-title"><strong class="sidebar-title">' + title + '</strong></li>';

        _.each(menu, function(link, text){
            //console.log(link);
            var itemClass = 'sidebar-link';
            var currentClass = '';
            if (link === path) currentClass += 'class="active"';
            result += '<li role="presentation" ' + currentClass + '><a href="' + self.url_for(link) + '" class="' + itemClass + '">' + text + '</a></li>';
        })
    });
    result += '<li role="presentation"><a role="button" href="#top">back to top</a></li>';
    result += '<li role="presentation"><a role="button" href="https://github.com/fireball-x/docs-zh/edit/master/source/_data/sidebar_' + cat + '.yml">Edit Sidebar</a></li></ul>';

    return result;
});

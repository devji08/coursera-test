$(function() {
    $("#nav-button").blur(function (event) {
        var width = window.innerWidth;
        if(width < 768){
            $('.navbar-collapse').collapse('hide');
        }
    });
});

(function (global) {
    var dsr = {};
    var home_page = "snippets/home-snippet.html";
    var categoryJson = "json/menu-category.json";
    var category_title_html = "snippets/menu-category-title-snippet.html";
    var category_html = "snippets/menu-category-snippet.html";
    var insert_html = function(selector, html) {
        var target_element = document.querySelector(selector);
        target_element.innerHTML = html;
    };

    var show_loading = function(selector){
        var html = "<div class='text-center' style='margin:15px;'><img src='/img/ajax-loader.gif'></div>";
        insert_html(selector, html);
        console.log("laoding");
    };

    document.addEventListener("DOMContentLoaded", function (event) {
        show_loading("#main-content");
        $ajaxUtils.sendGetRequest(home_page, function (responseText) {
            insert_html("#main-content",responseText);
        },
        false);
    });

    var insertProperty = function(string, propName, propValue) {
        var propToReplace = "{{" + propName + "}}";
        string = string.replace(new RegExp(propToReplace, "g"), propValue);
        return string;
    };

    dsr.loadHome = function () {
        show_loading("#main-content");
        $ajaxUtils.sendGetRequest(home_page, function (responseText) {
            insert_html("#main-content",responseText);
        },
        false);
    };
    dsr.loadMenuCategories = function () {
        show_loading("#main-content");
        $ajaxUtils.sendGetRequest(categoryJson, buildAndViewCategory, true);
    }

    function buildAndViewCategory(categories){
        $ajaxUtils.sendGetRequest(category_title_html, function(categoriesTitleHtml) {
            $ajaxUtils.sendGetRequest(category_html, function (categoryHtml) {
                var categoriesViewHtml = buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml);
                insert_html("#main-content",categoriesViewHtml);
            },false);
        }, false);
    }

    function buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml) {
        var finalHtml = categoriesTitleHtml;
        finalHtml+="<div class='row'>";
        for(var i = 0 ; i < categories.length ; i++){
            var html = categoryHtml;
            var name = categories[i].name;
            var short_name = categories[i].short_name;

            html = insertProperty(html, "name", name);
            html = insertProperty(html, "short_name", short_name);
            finalHtml += html;
        }
        finalHtml += "</div>";
        return finalHtml;
    }
    global.$dsr=dsr;
})(window);
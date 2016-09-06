window.onload = function() {
    var categoryList = [];
    // var articleList = [];
    var activeCategory;
    var domCategory = document.getElementById('category-list')

    for(var key in categorys) {
        console.log(key);
        if(Object.prototype.hasOwnProperty.call(categorys, key)) {
            categoryList.push(key);
        }
    }

    activeCategory = categoryList[0];
    renderCategory()
    renderArticle(activeCategory);


    domCategory.addEventListener('click', function(event){
        event = event || window.envet;
        var target = event.target || event.srcElement;
        var activeCategory = target.innerHTML;
        console.log(activeCategory);
        renderArticle(activeCategory);
    })

    function renderActive(activeCategory) {
        var domCategory = document.getElementById('category-list').getElementsByTagName('li');
        console.log(domCategory);
        for(var i=0; i<domCategory.length; i++) {
            var item = domCategory[i];
            var data = item.getAttribute('data-category');
            if(activeCategory == data) {
                item.className = 'active';
            }else {
                item.className = '';
            }
        }
    }
    function renderCategory() {
        var domCategory = document.getElementById('category-list');
        var tplList = '';

        categoryList.forEach(function(category) {
            tplList += '<li data-category="'+category+'"><a>' + category + '</a></li>';
        })
        domCategory.innerHTML = tplList;
    }
    function renderArticle(activeCategory) {
        var domArticle = document.getElementById('article-list');
        var articleList = categorys[activeCategory];
        var template = '<li><a href="{{href}}">{{title}}</a></li>';
        var tplList = '';

        articleList.forEach(function(article) {
            var tpl = template;
            for(var key in article) {
                // console.log('/\{\{' + key + '\}\}/');
                tpl = tpl.replace('{{' + key + '}}', article[key]);
            }
            tplList += tpl;
        })
        domArticle.innerHTML = tplList;
        renderActive(activeCategory);
    }
}
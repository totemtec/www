window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.init = false;

// 图片懒加载  lazysizes
$(document).ready(function () {
    lazySizes.init();
    /*
    手动加载不在可视区范围的图片
    1:直接给img添加class="lazypreload"
        $("img").addClass('lazypreload');
    2: 调用lazySizes的Api
        lazySizes.loader.unveil(Element);
    */

    // 页面加载之后   加载不在可视区的所有使用懒加载的图
    setTimeout(function(){
        var images = document.querySelectorAll('.lazyload');
        images.forEach((item)=>{
            lazySizes.loader.unveil(item);
        });
    },1000)

});

// <!--图片懒加载   IntersectionObserver-->
// var io = new IntersectionObserver(callback, {
//
// });
// let images = document.querySelectorAll('[data-src]');
// images.forEach((item)=>{  // io.observe接受一个DOM元素，添加多个监听 使用forEach
//     io.observe(item);
// });
// function callback(entries){
//     entries.forEach((item) => { // 遍历entries数组
//         if(item.isIntersecting){ // 当前元素可见
//             item.target.src = item.target.dataset.src;  // 替换src
//             io.unobserve(item.target)  // 停止观察当前元素 避免不可见时候再次调用callback函数
//         }
//     })
// }
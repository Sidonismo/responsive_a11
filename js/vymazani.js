const kriz = document.querySelectorAll('#kriz');

kriz.forEach(function (el) {
    const aktKriz = $(el).parents("section");
    $(el).click(function () {
        aktKriz.remove();
        console.log($(aktKriz).attr('id'));
    });
});
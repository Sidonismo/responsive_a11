var odkaz = [];
    var i = -1;
    $(".cat_list li").each(function (index, item) {
      var option = $('<a href="' + $(this).find('a').attr('href') + '">' + $(item).text().trim() + '</a>');
      odkaz.push();
      $(".dropdown-content").append(option);
    });
    let dropbtn = document.querySelector('.dropdown');
    let dropdownContent = document.querySelector('.dropdown-content');
    dropbtn.addEventListener('click', event => {
      if (dropdownContent.style.display == "block") {
        dropdownContent.style.display = "none";
      }
      else {
        dropdownContent.style.display = "block";
        dropbtn.style.display = "true"
      }

    });
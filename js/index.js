//移动端头部显示父级的title
function headermenu() {
      $("#ul_list li a").click(function () {
            $("#deletes").empty();
            chose();
            var generalTitle = $(this).attr("href");
            var aid = '101'
            var nam = generalTitle.slice(1)
            if (generalTitle == "#business") {
                  aid = 101
            } else if (generalTitle == "#agent") {
                  aid = 102
            } else if (generalTitle == "#admin") {
                  aid = 103
            } else if (generalTitle == "#h5") {
                  aid = 104
            } else if (generalTitle == "#procedures") {
                  aid = 105
            }
            let data = {
                  aid: aid
            }
            $.ajax({
                  type: "GET",
                  data: {
                        aid: data.aid
                  },
                  dataType: 'json',
                  url: url + "document",
                  success: function (res) {
                        let datas = res.data
                        var fa_title_total = ''
                        $.each(datas, function (index, val) {
                              var da_title = ''
                              if (val.childrens.length > 1) {
                                    for (let i = 0; i < val.childrens.length; i++) {
                                          da_title += "<a href=" + '#' + nam + '/' + val.fatherId + '/' + val.childrens[i].sid
                                                + "><p>" + val.childrens[i].stitle + "</p></a>"
                                    }
                              } else {
                                    da_title = "<a href=" + '#' + nam + '/' + val.fatherId + '/' + val.childrens[0].sid
                                          + "><p>" + val.childrens[0].stitle + "</p></a>"
                              }
                              fa_title_total += "<div class='displayfas'><div class='list'><span>" + val.title
                                    + "</span><img src='img/select.png' alt=''></div>"
                                    + "<div class='detail'><ul><li>" + da_title
                                    + "</li></ul></div></div>";
                        })
                        $("#deletes").append(fa_title_total);
                        $(".displayfas").on("click", function () {
                              $(this).children(".detail").slideToggle(500).parents(".displayfas").siblings(".displayfas").children(".detail").slideUp(500);
                              $(this).children(".list").css("color", "#ff6900").parents(".displayfas").siblings(".displayfas").children(".list").css("color", "black");
                              $(this).children(".list").children("img").css({"transform":"rotate(0deg)","transition":"transform 0.8s"}).parents(".displayfas").siblings(".displayfas").children(".list").children("img").css({"transform":"rotate(90deg)","transition":"transform 0.8s"})
                        })

                        // <-- 右侧显示内容 -->
                        $("#de_content").empty();
                        let content = res.data
                        var son_contents = []
                        for (let i = 0; i < content.length; i++) {
                              son_contents.push({
                                    fatherId: content[i].fatherId,
                                    childrens: content[i].childrens
                              })
                        }
                        // <-- 开始遍历数据 -->
                        var son_content = ''
                        $.each(son_contents, function (index, val) {
                              var son_data = ''
                              if (val.childrens.length > 1) {
                                    for (let i = 0; i < val.childrens.length; i++) {
                                          son_data += "<a name=" + nam + '/' + val.fatherId + '/' + val.childrens[i].sid + ">"
                                                + "<div class='content_main'><div class='content_top'><p>"
                                                + val.childrens[i].stitle + "</p><hr></div><div class='content_bottom'><div class='content_main_box'><p>"
                                                + val.childrens[i].content + "</p></div></div></div></a>"
                                    }
                              } else {
                                    son_data += "<a name=" + nam + '/' + val.fatherId + '/' + val.childrens[0].sid + ">"
                                          + "<div class='content_main'><div class='content_top'><p>"
                                          + val.childrens[0].stitle + "</p><hr></div><div class='content_bottom'><div class='content_main_box'><p>"
                                          + val.childrens[0].content + "</p></div></div></div></a>"
                              }
                              son_content += son_data
                        })
                        $("#de_content").append(son_content);
                  }
            })

      })
}
//移动端搜索框
var isFrist = false;
var times = 1;
$(".button_search").click(function () {
      if (isFrist) {
            times++;
            // alert(isFrist + ": " + times);
            search_doc();
      } else {
            $(".search_input").css("display", "")
            isFrist = true;
      }
});
//搜索
function search_doc() {
      // var key = $(window).width() 
      if ($(window).width() < 768) {
            var key = $(".search_input").val();
      } else {
            var key = $(".search_inputs").val();
      }
      let data = {
            key: key
      }
      $.ajax({
            type: "GET",
            data: data,
            dataType: 'json',
            url: url,
            success: function (res) {
                  console.log(res)
            }
      })
}
//选择一级菜单
function chose() {
      var oUl = document.getElementById('ul_list');
      var Lis = oUl.getElementsByTagName('li');
      for (var i = 0; i < Lis.length; i++) {
            Lis[i].index = i;
            Lis[i].onclick = function () {
                  var totaltitle = document.getElementById('totaltitle')
                  if (this.index == 0) {
                        $("#business").css({ "color": "#ff6900", "borderBottom": "2px solid #ff6900" })
                        $("#agent,#admin,#h5,#procedures").css({ "color": "black", "borderBottom": "0px" })
                        totaltitle.innerText = $("#business").text();
                  } else if (this.index == 1) {
                        $("#agent").css({ "color": "#ff6900", "borderBottom": "2px solid #ff6900" })
                        $("#business,#admin,#h5,#procedures").css({ "color": "black", "borderBottom": "0px" })
                        totaltitle.innerText = $("#agent").text();
                  } else if (this.index == 2) {
                        $("#admin").css({ "color": "#ff6900", "borderBottom": "2px solid #ff6900" })
                        $("#agent,#business,#h5,#procedures").css({ "color": "black", "borderBottom": "0px" })
                        totaltitle.innerText = $("#admin").text();
                  } else if (this.index == 3) {
                        $("#h5").css({ "color": "#ff6900", "borderBottom": "2px solid #ff6900" })
                        $("#agent,#admin,#business,#procedures").css({ "color": "black", "borderBottom": "0px" })
                        totaltitle.innerText = $("#h5").text();
                  } else if (this.index == 4) {
                        $("#procedures").css({ "color": "#ff6900", "borderBottom": "2px solid #ff6900" })
                        $("#agent,#admin,#h5,#business").css({ "color": "black", "borderBottom": "0px" })
                        totaltitle.innerText = $("#procedures").text();
                  }
            }
      }
}

//循环父标题下面的子标题
$().ready(function () {
      if (true) {
            let data = {
                  nam: "business",
                  aid: "101"
            }
            reqFaTitle(data)
      }
      $("#ul_list li a").click(function () {
            chose();
            var generalTitle = $(this).attr("href");
            var aid = ''
            if (generalTitle == "#business") {
                  aid = 101
            } else if (generalTitle == "#agent") {
                  aid = 102
            } else if (generalTitle == "#admin") {
                  aid = 103
            } else if (generalTitle == "#h5") {
                  aid = 104
            } else if (generalTitle == "#procedures") {
                  aid = 105
            }
            let data = {
                  nam: generalTitle.slice(1),
                  aid: aid
            }
            reqFaTitle(data)
      })

      function reqFaTitle(data) {
            let nam = data.nam
            $.ajax({
                  type: "GET",
                  data: {
                        aid: data.aid
                  },
                  dataType: 'json',
                  url: url + "document",
                  success: function (res) {
                        $("#delete").empty()
                        let datas = res.data
                        var fa_title_total = ''
                        $.each(datas, function (index, val) {
                              var da_title = ''
                              if (val.childrens.length > 1) {
                                    for (let i = 0; i < val.childrens.length; i++) {
                                          da_title += "<a href=" + '#' + nam + '/' + val.fatherId + '/' + val.childrens[i].sid
                                                + "><p>" + val.childrens[i].stitle + "</p></a>"
                                    }
                              } else {
                                    da_title = "<a href=" + '#' + nam + '/' + val.fatherId + '/' + val.childrens[0].sid
                                          + "><p>" + val.childrens[0].stitle + "</p></a>"
                              }
                              fa_title_total += "<div class='displayfa'><div class='list'><span>" + val.title
                                    + "</span><img id='lt' class='lrotate' src='img/select.png' alt=''></div>"
                                    + "<div class='detail'><ul><li>" + da_title
                                    + "</li></ul></div></div>";
                        })
                        $("#delete").append(fa_title_total);
                        $(".displayfa").on("click", function () {
                              $(this).children(".detail").slideToggle(500).parents(".displayfa").siblings(".displayfa").children(".detail").slideUp(500);
                              $(this).children(".list").css("color", "#ff6900").parents(".displayfa").siblings(".displayfa").children(".list").css("color", "black");
                              $(this).children(".list").children("img").css({"transform":"rotate(0deg)","transition":"transform 0.8s"}).parents(".displayfa").siblings(".displayfa").children(".list").children("img").css({"transform":"rotate(90deg)","transition":"transform 0.8s"})
                        })
                        // <-- 右侧显示内容 -->
                        $("#de_content").empty();
                        let content = res.data
                        var son_contents = []
                        for (let i = 0; i < content.length; i++) {
                              son_contents.push({
                                    fatherId: content[i].fatherId,
                                    childrens: content[i].childrens
                              })
                        }
                        var son_content = ''
                        $.each(son_contents, function (index, val) {
                              // var son_datas = "<h1><span style='background-color: rgb(255, 255, 0);'>12321321321</span></h1><p>pppp</p ><p>                 哈哈哈哈</p ><p>我祈求为我企鹅我企鹅w</p ><p>我额我企鹅我企鹅</p ><p>wq饿qw饿</p ><p>qw饿qw饿          我的亲戚斡日切舞人</p ><p><img src='http://test.image.looovo.com/FjIiAP0Ls_SaQzGgJrJIM1F9RVZI'></p >"
                              var son_data = ''
                              if (val.childrens.length > 1) {
                                    for (let i = 0; i < val.childrens.length; i++) {
                                          son_data += "<a name=" + nam + '/' + val.fatherId + '/' + val.childrens[i].sid + ">"
                                                + "<div class='content_main'><div class='content_top'><p>"
                                                + val.childrens[i].stitle + "</p><hr></div><div class='content_bottom'><div class='content_main_box'><p>"
                                                + val.childrens[i].content + "</p></div></div></div></a>"
                                    }
                              } else {
                                    son_data += "<a name=" + nam + '/' + val.fatherId + '/' + val.childrens[0].sid + ">"
                                          + "<div class='content_main'><div class='content_top'><p>"
                                          + val.childrens[0].stitle + "</p><hr></div><div class='content_bottom'><div class='content_main_box'><p>"
                                          + val.childrens[0].content + "</p></div></div></div></a>"
                              }

                              son_content += son_data
                        })
                        $("#de_content").append(son_content);
                  }
            })
      }
});
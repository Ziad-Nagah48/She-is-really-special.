var $window = $(window),
  gardenCtx,
  gardenCanvas,
  $garden,
  garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();
$(function () {
  $loveHeart = $("#loveHeart");
  var a = $loveHeart.width() / 2;
  var b = $loveHeart.height() / 2 - 55;
  $garden = $("#garden");
  gardenCanvas = $garden[0];
  gardenCanvas.width = $("#loveHeart").width();
  gardenCanvas.height = $("#loveHeart").height();
  gardenCtx = gardenCanvas.getContext("2d");
  gardenCtx.globalCompositeOperation = "lighter";
  garden = new Garden(gardenCtx, gardenCanvas);
  $("#content").css("width", $loveHeart.width() + $("#code").width());
  $("#content").css(
    "height",
    Math.max($loveHeart.height(), $("#code").height())
  );
  $("#content").css(
    "margin-top",
    Math.max(($window.height() - $("#content").height()) / 2 - 50, 10)
  );
  $("#content").css(
    "margin-left",
    Math.max(($window.width() - $("#content").width()) / 2, 10)
  );
  setInterval(function () {
    garden.render();
  }, Garden.options.growSpeed);
});
$(window).resize(function () {
  var b = $(window).width();
  var a = $(window).height();
  if (b != clientWidth && a != clientHeight) {
    location.replace(location);
  }
});

function getHeartPoint(c) {
  var b = c / Math.PI;
  var a = 19.5 * (16 * Math.pow(Math.sin(b), 3));
  var d =
    -20 *
    (13 * Math.cos(b) -
      5 * Math.cos(2 * b) -
      2 * Math.cos(3 * b) -
      Math.cos(4 * b));
  return new Array(offsetX + a, offsetY + d);
}

function startHeartAnimation() {
  var c = 50;
  var d = 10;
  var b = new Array();
  var a = setInterval(function () {
    var h = getHeartPoint(d);
    var e = true;
    for (var f = 0; f < b.length; f++) {
      var g = b[f];
      var j = Math.sqrt(Math.pow(g[0] - h[0], 2) + Math.pow(g[1] - h[1], 2));
      if (j < Garden.options.bloomRadius.max * 1.3) {
        e = false;
        break;
      }
    }
    if (e) {
      b.push(h);
      garden.createRandomBloom(h[0], h[1]);
    }
    if (d >= 30) {
      clearInterval(a);
      showMessages();
    } else {
      d += 0.2;
    }
  }, c);
}

(function (a) {
  a.fn.typewriter = function () {
    this.each(function () {
      var d = a(this),
        c = d.html(),
        b = 0;
      d.html("");
      var e = setInterval(function () {
        var f = c.substr(b, 1);
        if (f == "<") {
          b = c.indexOf(">", b) + 1;
        } else {
          b++;
        }
        d.html(c.substring(0, b) + (b & 1 ? "_" : ""));
        if (b >= c.length) {
          clearInterval(e);
        }
      }, 75);
    });
    return this;
  };
})(jQuery);

window.onload = function () {
  var together = new Date(2025, 5, 7, 0, 0, 0, 0); // 6 يونيو 2025، الساعة 12:00 صباحًا

  function timeElapse(date) {
    var current = new Date();
    var seconds = Math.floor((date - current) / 1000);

    if (seconds < 0) {
      document.getElementById("messages").style.display = "none";
      document.getElementById("loveu").innerHTML = `
        <div class="final-message">
          وأخيرًا حان الوقت! 🎉❤️<br>
          اليوم عيد ميلادك يا أجمل شخص في الدنيا 🎂🎈<br>
          مرت سنة بكل ذكرياتها، وأتمنى تكوني حققتي جزء من أحلامك ✨<br>
          كل سنة وأنتي أروع وأقرب صديقة ليا 🤍<br>
          كل سنة وأنتي وسط أهلك وأحبابك بسعادة وفرحة 🎊<br>
          وأنا واثق إنك هتحققي كل أحلامك وهتكوني أنجح مرشدة سياحية 🌍💫<br>
          ناني.. أنتِ شخص نادر ومميز، واللي زيك مش بيتكرر 💖<br>
          أتمنى أن تكون السنة مليانة سعادة ومفيش حاجة تزعلك أبدًا لأن زعلك غالي أوي عليا ✨💞<br>
          كل سنة وأنتِ بخير يا صحبي، وآخر حاجة كنت عايز أقولهالك متيأسيش من السعي 💫<br>
          ولو أنا مش هبقى موجود النهاردة، فعايزك تعرفي إنك أكيد هتكوني في دماغي وعمري ما أزهق منك 🤍<br>
          وأتمنى لكِ سنة سعيدة لأنك تستاهلي كل خير يا أجمل شخصية في الدنيا 💕
        </div>
      `;
      return;
    }

    var days = Math.floor(seconds / (3600 * 24));
    seconds %= 3600 * 24;
    var hours = Math.floor(seconds / 3600);
    if (hours < 10) hours = "0" + hours;
    seconds %= 3600;
    var minutes = Math.floor(seconds / 60);
    if (minutes < 10) minutes = "0" + minutes;
    seconds %= 60;
    if (seconds < 10) seconds = "0" + seconds;

    var result = `
      <span class="digit">${days}</span> days 
      <span class="digit">${hours}</span> hours 
      <span class="digit">${minutes}</span> minutes 
      <span class="digit">${seconds}</span> seconds
    `;

    document.getElementById("elapseClock").innerHTML = result;
  }

  if (document.createElement("canvas").getContext) {
    setTimeout(function () {
      startHeartAnimation();
    }, 5000);

    timeElapse(together);
    setInterval(function () {
      timeElapse(together);
    }, 1000);

    adjustCodePosition();
    if (typeof $ !== "undefined") {
      $("#code").typewriter();
    }
  } else {
    var msg = document.createElement("div");
    msg.id = "errorMsg";
    msg.innerHTML =
      "متصفحك لا يدعم HTML5! يرجى استخدام Chrome أو Firefox أو Edge.";
    document.body.appendChild(msg);
  }

  var offsetX = $("#loveHeart").width() / 2;
  var offsetY = $("#loveHeart").height() / 2 - 55;
};

// تحديث العداد كل نصف ثانية
var together = new Date(2025, 6, 7, 0, 0, 0, 0); // 6 يناير 2025 الساعة 7:00 صباحًا
setInterval(function () {
  timeElapse(together);
}, 500);

var together = new Date(2026, 0, 9, 15, 0, 0, 0); // 9 يناير 2026
setInterval(function () {
  timeElapse(together);
}, 500);

function showMessages() {
  adjustWordsPosition();
  $("#messages").fadeIn(5000, function () {
    showLoveU();
  });
}

function adjustWordsPosition() {
  $("#words").css("position", "absolute");
  $("#words").css("top", $("#garden").position().top + 195);
  $("#words").css("left", $("#garden").position().left + 70);
}

function adjustCodePosition() {
  $("#code").css(
    "margin-top",
    ($("#garden").height() - $("#code").height()) / 2
  );
}

function showLoveU() {
  $("#loveu").fadeIn(3000);
}

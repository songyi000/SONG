/**
 * yyyy.mm.dd 에서 yyyy-mm-dd 변경
 * @param date
 * @returns {string}
 */
function dateFormatBar(date) {

    date += " 00:00:00";
    date = date.replace(/\./g, '/');
    var d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

function replaceTemplateRender(template, obj) {
    var temp = template;
    for (var o of Object.keys(obj)) {
        temp = temp.replaceAll("[[" + o + "]]", obj[o]);
    }
    return temp;
}


function setFlagTag(suik, type, isZero) {


    if( suik === undefined ) return false;

    let formatSuik = '0.00';
    if( suik == 0 || suik == 0.0){
        if( !isZero) {
            formatSuik = '-';
        }
    }else{
        formatSuik=KAUI.parts.comma(suik.toFixed(2));
    }


    if (type == 'mobile') {
        if (suik > 0) {
            return '<span class="fund-points txt-up"><em>' + formatSuik + '</em></span>'
        } else if (suik < 0) {
            return '<span class="fund-points txt-drop"><em>' + formatSuik + '</em></span>'
        } else {
            return '<span class="fund-points"><em>' + formatSuik + '</em></span>'
        }
    } else if (type == 'strong') {
        if (suik > 0) {
            return '<strong class="txt-up">' + formatSuik + '</strong>'
        } else if (suik < 0) {
            return '<strong class="txt-drop">' + formatSuik + '</strong>'
        } else {
            return '<strong>' + formatSuik + '</strong>'
        }
    } else if (type == 'em') {
        if (suik > 0) {
            return '<em class="txt-up">' + formatSuik + '</em>'
        } else if (suik < 0) {
            return '<em class="txt-drop">' + formatSuik + '</em>'
        } else {
            return '<em>' + formatSuik + '</em>'
        }
    } else if (type == 'ico') {
        if (suik > 0) {
            return "<span class='fund-points ico-up'><span class='hide'>상승포인트</span>" + formatSuik + "</span>";
        } else if (suik < 0) {
            return "<span class='fund-points ico-drop'><span class='hide'>하락포인트</span>" + formatSuik + "</span>";
        } else {
            return " <span class='fund-points'>" + formatSuik + "</span>";
        }
    } else {
        if (suik > 0) {
            return "<span class=' txt-up'>" + formatSuik + "</span>";
        } else if (suik < 0) {
            return "<span class=' txt-drop'>" + formatSuik + "</span>";
        } else {
            return "<span class=''>" + formatSuik + "</span>";
        }
    }

}

function removeHtml(str) {
    return str.replace(/<[^>]*>?/g, '');
}

/**
 * 이미지 error
 * @param obj
 */
function noImg(obj) {
    obj.style.display = 'none';
    obj.parentElement.classList.add("no-img");
}

var share = {
    data: {},
    $wrapSns: null,
    init: function (isMobile) {

        const _th = this;

        _th.getData(isMobile);


        $("a.sns-kakao", _th.$wrapSns).not('.no-click').click(function () {
            _th.shareKaKao(_th.data.title, _th.data.shareUrl);
        })
        $(" a.sns-face", _th.$wrapSns).not('.no-click').click(function () {
            _th.shareFacebook(_th.data.title, _th.data.shareUrl);
        })
        $("a.sns-url", _th.$wrapSns).not('.no-click').click(function () {
            _th.shareUrl(_th.data.shareUrl);
        })


    },
    getData: function (isMobile) {

        const _th = this;


        var title = '';
        var shareUrl = '';
        let $wrapSns = '';

        if (isMobile) {
            $wrapSns = $("#KIM0702000000P .sns-gruop");
            title = $("#snsTitle").data("title");
            shareUrl = $("#snsTitle").data("shareurl");
        } else {
            $wrapSns = $(".share-sns");
            title = $("a.sns-kakao", $wrapSns).data("title");
            shareUrl = $("a.sns-kakao", $wrapSns).data("shareurl");
        }

        if (shareUrl === undefined || shareUrl == '') {
            //공유할 주소가 없을 경우 현재 게시물 주소로 공유
            shareUrl = location.href;
        }

        _th.data = {};
        _th.$wrapSns = $wrapSns;
        _th.data.title = title;
        _th.data.shareUrl = shareUrl;

    },
    shareKaKao: function (title, shareUrl) {

        if (shareUrl.indexOf("youtube") > -1 || shareUrl.indexOf("youtu.be") > -1) {
            Kakao.Share.sendScrap({
                requestUrl: shareUrl
            });
        } else {
            Kakao.Share.sendDefault({
                objectType: "feed",
                content: {
                    title: title,
                    imageUrl: location.origin + '/resources/common/images/kakao_message.png',
                    imageWidth: 540,
                    imageHeight: 270,
                    link: {
                        mobileWebUrl: shareUrl,
                        webUrl: shareUrl
                    },
                },
                buttons: [
                    {
                        title: "자세히 보기",
                        link: {
                            mobileWebUrl: shareUrl,
                            webUrl: shareUrl
                        },
                    },
                ],
            });
        }

    },
    shareFacebook: function (title, shareUrl) {

        //페이스북은  localhost 에서 작동안함 ip사용하여 테스트
        // 상세 테스트는 개발기에서
        // var snsUrl = window.location.href;
        const _th = this;
       // $("meta#fbookUrl").attr("content", shareUrl);
       // $("meta#fbookTitle").attr("content", title);
        var url = "https://www.facebook.com/sharer.php?u=" + encodeURIComponent(shareUrl);
        window.open(url, "_blank", "width=600,height=400");
    },
    shareUrl: function (shareUrl) {

        let share = window.location.href;
        if (shareUrl != null && shareUrl != '') {
            share = shareUrl
        }

        var textarea = document.createElement("textarea");
        document.body.appendChild(textarea);
        textarea.value = share;
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert("URL이 복사되었습니다.");
    },
    pop: function (title, url) {
        const _th = this;
        _th.data.title = title;
        _th.data.shareUrl = url;
    }
}

var coo = {
    set: function (name) {
        var date = new Date();
        date.setDate(date.getDate() + 1);
        document.cookie = escape(name) + "=" + escape("NO") + "; path=/; expires=" + date.toUTCString();
    },
    get: function (name) {
        var cookie = document.cookie;
        if (document.cookie != "") {
            var cookieArray = cookie.split("; ");
            for (var index in cookieArray) {
                var cookieName = cookieArray[index].split("=");
                if (cookieName[0] == name) {
                    return true;
                }
            }
        }

        return false;
    },
    make: function (obj) {
        var id = $(obj).data("chkbox");
        var type = $(obj).data("type");

        var name = "popupNotice";
        if (document.getElementById(id).checked) {
            if (type == 'ddi') {
                name = "ddiNotice";
            }
            this.set(name);
        }


    }
}


function msgModal(msg, back) {

    KAUI.modal.show({
        type: "alert",
        sMessage: '<p class="alert-msg"><strong class="txts">' + msg + '</strong></p>',
        sBtnConfirmTxt: '확인',
        sClass: 'type-alert',
        sConfirmCallback: function () {
            KAUI.modal.hideSystem();
            if (back != null || typeof back != 'undefined') {
                if (typeof back === 'function') {
                    setTimeout(() => {
                        back();
                    }, 300)
                } else {
                    $(back).focus();
                }
            }
        }
    });


}

function queryStringToObject(qs) {
    var paramsQ = qs.indexOf('?') == 0 ? qs.slice(1) : qs;
    var result = {};

    var pairs = paramsQ.split('&');
    pairs.forEach(function (pair) {
        pair = pair.split('=');//key=val 분리
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });

    return JSON.parse(JSON.stringify(result));

}

function objectToQueryString(url, params) {
    var qs = Object.entries(params).map(e => e.join('=')).join('&');
    return url.concat("?", qs);
}

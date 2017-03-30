/*PALING BAWAH ADA SCRIPT DARI ANDY WINARKO*/

/*mobile ads event generator*/
var utils = {
    setTracking1 : function(e, a){
        console.log( $('.'+e).attr('id') + ', ' + a );
    },
    setTracking2 : function(mo, a){
        //mo = no MO
        _gaq.push(['_trackEvent', mo, a]);
        console.log( mo + ', ' + a );
    }
}

var maeg = {
    addGAtoVideo: function(e){
        var q, c, d, a; //q=quarter, s=setquarter, c=currenttime, d=duration, t=category for ga, a=action
        var s = [true, true, true, true];
        var t = e.attr('id');
        var setTracking = function(a){
            //_gaq.push(['_trackEvent', t, a]);
            console.log( t + ', ' + a );
        };
        var trackPlay = function(){
            c = e[0].currentTime;
            if( c == 0 || c == d ){
                setTracking('video play');
            }
        }
        var trackEnded = function(){
            setTracking('video watched until the end');
            s = [true, true, true, true];
        };
        var trackPause = function(){
            c = e[0].currentTime;
            if( c >= q[0] && c <= q[1] ){
                setTracking('user paused before 1/4 of video length');
            }
            if( c >= q[1] && c <= q[2] ){
                setTracking('user paused before 2/4 of video length');
            }
            if( c >= q[2] && c <= q[3] ){
                setTracking('user paused before 3/4 of video length');
            }
            if( c >= q[3] && c != d ){
                setTracking('user paused before video finish');
            }
        };
        var trackTimeupdate = function(){
            c = e[0].currentTime;
            if( c >= q[0] && c <= q[1] && s[0] ){
                setTracking('video going at 1/4 of video length');
                s[0] = false;
            }
            if( c >= q[1] && c <= q[2] && s[1] ){
                setTracking('video going at 2/4 of video length');
                s[1] = false;
            }
            if( c >= q[2] && c <= q[3] && s[2] ){
                setTracking('video going at 3/4 of video length');
                s[2] = false;
            }
            if( c >= q[3] && c <= d && s[3] ){
                setTracking('video going to end');
                s[3] = false;
            }
        };
        $(document).on('DOMContentLoaded', function(){
            e.on('play', trackPlay);
            e.on('ended', trackEnded);
            e.on('pause', trackPause);
            e.on('timeupdate', trackTimeupdate);
            d = e[0].duration;
            q = [d * 0, d * 0.25, d * 0.5, d * 0.75];
        });
    },
    /*UTILITY*/
	utils: {
        av: navigator.appVersion,
        OSName: function(){
            var av = navigator.appVersion;
            return av.indexOf('Win')!=-1 ? 'Windows' : 
                av.indexOf('Mac')!=-1 ? 'MacOS' : 
                av.indexOf('X11')!=-1 ? 'UNIX' : 
                av.indexOf('Linux')!=-1 ? 'Linux' : 'Unknown';
        },
        MobileDevice: function(){
            var ua = navigator.userAgent;
            return ua.match(/Android/i) ? 'Android' : 
                ua.match(/BlackBerry/i) ? 'BlackBerry' : 
                ua.match(/iPhone|iPad|iPod/i) ? 'iPhone' : 
                ua.match(/Opera Mini/i) ? 'Opera' : 
                ua.match(/IEMobile/i) ? 'IEMobile' : 'Any';
        },
        BrowserName: function(){
            var ua = navigator.userAgent;
            return ua.indexOf("Opera")!=-1 ? 'Opera' : 
                ua.indexOf("MSIE")!=-1 ? 'InternetExplorer' : 
                ua.indexOf("Chrome")!=-1 ? 'Chrome' : 
                ua.indexOf("UCBrowser")!=-1 ? 'UCBrowser' : 
                ua.indexOf("Safari")!=-1 ? 'Safari' : 
                ua.indexOf("Firefox")!=-1 ? 'Firefox' : 'Any';
        },
        DetectMobile: function() { 
            var ua = navigator.userAgent;
            if( ua.match(/Android/i) || ua.match(/webOS/i) || ua.match(/iPhone/i) || ua.match(/iPad/i) || ua.match(/iPod/i) || ua.match(/BlackBerry/i) || ua.match(/Windows Phone/i) ){
                return true;
            }else{
                return false;
            }
        }
	},
    
    
    /*ADS*/
    parallaxA: function(e){
        var isAndroid = maeg.utils.MobileDevice() == 'Android';
        var isFF = maeg.utils.BrowserName() == 'Firefox';
        var isUC = maeg.utils.BrowserName() == 'UCBrowser';
        var isIE = maeg.utils.BrowserName() == 'InternetExplorer';
        var isOT = maeg.utils.BrowserName() == 'Any';
        if( isAndroid && (isFF || isUC || isIE || isOT) ){
            $('.parallaxA_abs').hide();
            $('.parallaxA_mr').show();
            new utils.setTracking2('26097', 'Not Supported Browser');
        }else{
            $('.parallaxA_abs').show();
            $('.parallaxA_mr').hide();
            new utils.setTracking2('26097', 'Supported Browser');
        }
        console.log(navigator.userAgent)
    },
    
    parallaxB: function(e){
        if( maeg.utils.MobileDevice() == 'Android' && ( maeg.utils.BrowserName() == 'Firefox' || maeg.utils.BrowserName() == 'UCBrowser' || maeg.utils.BrowserName() == 'InternetExplorer' || maeg.utils.BrowserName() == 'Any' ) ){
            $('.parallax_abs').hide();
            $('.parallax_mr').show();
        }else{
            var i, j, k, wH, dST, pST_dST, adj, wST, wSB, aOT, aOB;
            var p = $('.'+e);
            var a = $('.'+e).has('iframe')==true ? $('.'+e+' iframe') : $('.'+e+' img');
            a.width(p.width());
            var genPos = function(){
                wH = $(window).innerHeight();
                dST = $(document).scrollTop() || $(window).scrollTop();
                pST_dST = p.offset().top - dST;
                adj = pST_dST / ( wH - p.innerHeight() );
                wST = $(window).scrollTop();
                wSB = wST + wH;
                aOT = p.offset().top;
                aOB = aOT + p.innerHeight();
                if( wSB>=aOT && wSB<aOB ){
                    a.css({'top':'auto', 'bottom':0});
                    //console.log(wST+'-'+wSB+' : '+aOT+'-'+aOB+' | in screen and make ads stay bottom');
                }
                if( wSB>=aOT && wSB>=aOB ){
                    if( wST<aOT ){
                        var t = adj*(wH-a.height());
                        a.css({'top':t, 'bottom':'auto'});
                        //console.log(wST+'-'+wSB+' : '+aOT+'-'+aOB+' | '+adj+'*('+wH+'-'+a.height()+')='+adj*(wH-a.height())+' | in screen and make ads adjust position');
                    }
                    if( wST>=aOT && wST<=aOB ){
                        a.css({'top':0, 'bottom':'auto'});
                        //console.log(wST+'-'+wSB+' : '+aOT+'-'+aOB+' | in screen and make ads stay top');
                    }
                }
            };
            $(document).on('scroll', genPos);
        }
    },
    
    
	pushdown_static: function(e){
        var i;
        if( $('.'+e).has('video') ){
            if( maeg.utils.MobileDevice() == 'iPhone' ){
                $('.'+e+' video').attr('playsinline', '');
                $('.'+e+' video').attr('webkit-playsinline', '');
            }
            new maeg.addGAtoVideo($('.'+e+' video'));
        }else{
            console.log('no video');
        }
        var expand = function(){
            $('.'+e).animate({'height':180}, 'fast');
            $('.'+e+' img').animate({'top':-50}, 'fast');
        };
        $('.'+e).click(expand);
        var cekPosition = function(){
            var adsBot = $('.'+e).offset().top + $('.'+e).outerHeight();
            var scrBot = $(window).scrollTop() + 50 + ($(window).outerHeight()/2);
            if(adsBot <= scrBot){
                expand();
                clearInterval(i);
            }
        };
        i = setInterval(function(){
            cekPosition();
        }, 100);
	},
    
    
    
    
    /*START FROM HERE*/
    init: function(e){
        $('.'+e).each(function(){
            var d = $(this).attr('class').split(' ');
            var o = d[1];
            var c = d[2] == 'undefined' ? d[1] : d[2];
            maeg.hasOwnProperty(o) ? new maeg[o](c) : null;
        })
    }
};

/*$(document).ready(function(){
    new maeg.init('detikads');
});*/

document.addEventListener('DOMContentLoaded', function(){
    new maeg.init('detikads');
})





/* by andy */


var ads = {
  inject : function(data){
    if($(data.target).length && data.platform != null && data.target != null){
      /* -S- Cangkang yang akan digunakan untuk parallax div */
      if(data.platform == "desktop"){
        var parallax_banner = "<link rel='stylesheet' type='text/css' href='http://microsite.detik.com/display/derry/parallax-detail-desktop/cdn/parallax_desktop.css'>";
      }else if(data.platform == "mobile"){
        var parallax_banner = "<link rel='stylesheet' type='text/css' href='http://microsite.detik.com/display/parallax.mdetik.detail.test/cdn/parallax.css'>";
      }

      parallax_banner += "<div id='parallax_block'>";
      parallax_banner += "<div id='parallax_container'>";
      parallax_banner += "<div id='parallax_absolute'>";
      parallax_banner += "<div id='parallax_fixed'>";
      parallax_banner += "<div id='parallax_banner'>";
      parallax_banner += "</div>";
      parallax_banner += "</div>";
      parallax_banner += "</div>";
      parallax_banner += "</div>";
      parallax_banner += "</div>";
      parallax_banner += "<br>";
      /* -E- Cangkang yang akan digunakan untuk parallax div */

      var kontenArtikel       = $(data.target).html();
      var hitung              = (kontenArtikel.match(/<br><br>/g) || []).length;
      var kontenAds           = parallax_banner;
      var posisi              = 0;
      var pencarian_posisi    = 3;
      var kata_yang_dicari    = "<br><br>";
      var length_kata_dicari  = kata_yang_dicari.length;

      //cek jika output != kosong
      if(OA_output[data.labelZone] != ""){

        //cek jika br lebih dari 6
        if(hitung >= pencarian_posisi){
          CariKata(pencarian_posisi);
        }else{

          // Apabila kata yang dicari tidak ada
          console.log("nothing to find = "+kata_yang_dicari);
        }
      }else if(OA_output[data.labelZone] == ""){

        //Jika Tidak ada Konten Gambar
        console.log("No Content Image Parallax");
      }

      function CariKata(pencarian_posisi){
        //Ulang pencarian sebanyak pencarian_posisi
        for(var i=0;i<pencarian_posisi;i++){

          //cari posisi kata_yang_dicari
          posisi = kontenArtikel.indexOf(kata_yang_dicari, ++posisi);

          //jika posisi max dari pencarian
          if(i == (pencarian_posisi-1)){

            //menyatukan posisi dimana sudah ditemukan dan menjoin hasilnya
            posisi = posisi + length_kata_dicari;
            var hasilJoin = [kontenArtikel.slice(0, posisi), kontenAds, kontenArtikel.slice(posisi)].join('');
            $(data.target).html(hasilJoin);
            $("#parallax_banner").html(OA_output[data.labelZone]);
          }
        }
      }
    }else{
      console.log("SomeThing Not Founds");
    }
  }
};

document.addEventListener('DOMContentLoaded', function(){
    ads.inject({
      target    : '#detikdetailtext',
      platform  : 'mobile',
      labelZone : 'staticbanner2_detail'
    });
})
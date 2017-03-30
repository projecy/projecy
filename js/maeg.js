var gaVideo = {    
	addGAtoVideo: function(e, b){
        var q, c, d, a; //q=quarter, s=setquarter, c=currenttime, d=duration, t=category for ga, a=action
        var s = [true, true, true, true];
        var t = $('.'+e).attr('mo');
        var trackPlay = function(){
			c = $('.'+e)[0].currentTime;
            if( c == 0 || c == d ){
				utils._ga(t, 'video play', b);
            }
        };
        var trackEnded = function(){
			utils._ga(t, 'video watched until the end', b);
            s = [true, true, true, true];
        };
        var trackPause = function(){
			c = $('.'+e)[0].currentTime;
            if( c >= q[0] && c <= q[1] ){
				utils._ga(t, 'user paused before 1/4 of video length', b);
            }
            if( c >= q[1] && c <= q[2] ){
				utils._ga(t, 'user paused before 2/4 of video length', b);
            }
            if( c >= q[2] && c <= q[3] ){
				utils._ga(t, 'user paused before 3/4 of video length', b);
            }
            if( c >= q[3] && c !== d ){
				utils._ga(t, 'user paused before video finish', b);
            }
        };
        var trackTimeupdate = function(){
			c = $('.'+e)[0].currentTime;
			if( c >= q[0] && c <= q[1] && s[0] ){
				utils._ga(t, 'video going at 1/4 of video length', b);
				s[0] = false;
            }
            if( c >= q[1] && c <= q[2] && s[1] ){
				utils._ga(t, 'video going at 2/4 of video length', b);
                s[1] = false;
            }
            if( c >= q[2] && c <= q[3] && s[2] ){
				utils._ga(t, 'video going at 3/4 of video length', b);
                s[2] = false;
            }
            if( c >= q[3] && c <= d && s[3] ){
				utils._ga(t, 'video going to end', b);
                s[3] = false;
            }
        };
        $(window).on('DOMContentLoaded', function(){
            $('.'+e).on('play', trackPlay);
            $('.'+e).on('ended', trackEnded);
            $('.'+e).on('pause', trackPause);
            $('.'+e).on('timeupdate', trackTimeupdate);
			d = $('.'+e)[0].duration;
			q = [d * 0, d * 0.25, d * 0.5, d * 0.75];
			if($('.'+e).attr('status').search('controls')>-1) $('.'+e).prop('controls', true);
			if($('.'+e).attr('status').search('muted')>-1) $('.'+e).prop('muted', true);
			if($('.'+e).attr('status').search('autoplay')>-1){
				$('.'+e)[0].play();
				utils._ga(t, 'video play', b);
			}
        });
    }
};

var utils = {
	path: '',
	_ga : function(mo, act, b){
		//set b = false to disable tracking
		if(Boolean(b)==true){
			//ga('create', 'UA-77056777-1', {'name':'detikads'});
			ga('create', 'UA-891770-238', {'name':'detikads'});
			ga('detikads.send', 'event', mo, act, 'traffic');
		} 
        console.log( mo + ', ' + act + ', status=' + b );
	},
    remove: function(e, mo='') {
        $('.'+e+'_close').click(function(){
			if(mo!='' || mo!='undefined') utils._ga(mo, 'close button clicked', true);
            $('.'+e).remove();
        });
    },
    hide: function(e) {
        $('.'+e+'_close').click(function(){
            $('.'+e).hide();
        });
    },
    inViewArea: function(e){
        var balance = 200;
        var adsBot = $('.'+e).offset().top + $('.'+e).outerHeight();
        var scrBot = $(window).scrollTop() + balance + ($(window).outerHeight()/2);
        console.log('adsBot='+adsBot+' <= scrBot='+scrBot);
        return adsBot <= scrBot;
    },
	inject: function(e, z){
		var b=OA_output[z], c=3, p1='', p2='';
		//p1 = "<div class='detikads parallaxB parallax2'><div class='parallaxA_abs'><div class='parallaxA_fix'><div class='parallaxA_ads'>";
		//p2 = "</div></div></div></div>";
		if(b!='' && b!=undefined && $(e).length==1 && $(e)!=null){
		//if((b!='') && $(e).length==1 && $(e)!=null){
			//a = Math.round($('#detikdetailtext').html().match(/<br><br>/g).length);
			if(Math.round($('#detikdetailtext').html().match(/<br><br>/g).length)>c){
				$(e+' br').each(function(i){
					if(i%2!=0 && i==c+2){
						$(this).after(p1+b+p2+'<br>');
						daeg.parallaxB('parallaxB');
					} 
				});
			}
		}
	},
	
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
			ua.indexOf("UC Browser")!=-1 ? 'UC Browser' : 
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
}

/*desktop ads event generator*/
var daeg = {
	ga_video: function(e){
		new gaVideo.addGAtoVideo(e, true);
	},
	
    top_frame: function(e) { 
		utils.remove(e) 
	},
	
    bottom_frame: function(e){ 
		utils.remove(e) 
	},
	
	interstitial: function(e){
		//alert('ini interstitial');
		$('.'+e).show().delay(1000).css('opacity', 0).animate({opacity:1}, 'slow').delay(10000).animate({opacity:0}, 'slow', function(){
			utils._ga($('.'+e).attr('mo'), 'auto close', true);
			$('.'+e).remove();
		});
		utils.remove(e, $('.'+e).attr('mo'));
	},
	
	bottomup: function(e){
		var l = $(window).outerHeight() > $(window).outerWidth() ? $(window).outerHeight() : $(window).outerWidth();
		l+=100;
		var b = function(){ $('.'+e+'_expand').css('top', l); };
		var x = function(){ $('.'+e+'_expand').show().animate({'top': 0}, 'fast'); };
		var r = function(){ $('.'+e).remove(); };
		var h = function(){ $('.'+e+'_expand').animate({'top': l}, 'fast', function(){$(this).hide();}); };
		$('.'+e+'_sticky').click(x);
		$('.'+e+'_expand_close').click(h);
		$('.'+e+'_sticky_close').click(r);
		b();
	},
	
    parallaxA: function(e){
        var isAndroid = utils.MobileDevice() == 'Android';
        var isFF = utils.BrowserName() == 'Firefox';
        var isUC = utils.BrowserName() == 'UCBrowser';
        var isUC2 = utils.BrowserName() == 'UC Browser';
        var isIE = utils.BrowserName() == 'InternetExplorer';
        var isOT = utils.BrowserName() == 'Any';
        if( isAndroid && (isFF || isUC || isUC2 || isIE || isOT) ){
            $('.parallaxA_abs').hide();
            $('.parallaxA_mr').show();
			console.log($('.'+e).attr('mo'), +', Medium Rectangle Mode');
            utils._ga($('.'+e).attr('mo'), 'Medium Rectangle Mode', true);
        }else{
            $('.parallaxA_abs').show();
            $('.parallaxA_mr').hide();
			console.log($('.'+e).attr('mo')+', Parallax Mode');
            utils._ga($('.'+e).attr('mo'), 'Parallax Mode', true);
        }
		var pabs = $('.parallaxA_abs').width();
		$('.parallaxA_fix').width( pabs );
        console.log(navigator.userAgent);
    },
	
    parallaxB: function(e){
        var isAndroid = utils.MobileDevice() == 'Android';
        var isFF = utils.BrowserName() == 'Firefox';
        var isUC = utils.BrowserName() == 'UCBrowser';
        var isUC2 = utils.BrowserName() == 'UC Browser';
        var isIE = utils.BrowserName() == 'InternetExplorer';
        var isOT = utils.BrowserName() == 'Any';
        if( isAndroid && (isFF || isUC || isUC2 || isIE || isOT) ){
            $('.parallaxA_abs').hide();
            $('.parallaxA_mr').show();
			console.log($('.'+e).attr('mo'), +', Medium Rectangle Mode');
            utils._ga($('.'+e).attr('mo'), 'Medium Rectangle Mode', true);
        }else{
            $('.parallaxA_abs').show();
            $('.parallaxA_mr').hide();
			console.log($('.'+e).attr('mo')+', Parallax Mode');
            utils._ga($('.'+e).attr('mo'), 'Parallax Mode', true);
			
			/*var i, j, k, wH, dST, pST_dST, adj, wST, wSB, aOT, aOB;
			var p = $('.'+e);
			$('.parallaxA_fix').width(p.width());
			var a = $('.parallaxA_ads');
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
					$('.parallaxA_ads').css({'top':'auto', 'bottom':0});
				}
				if( wSB>=aOT && wSB>=aOB ){
					if( wST<aOT ){
						var t = adj*(wH-a.height());
						$('.parallaxA_ads').css({'top':t, 'bottom':'auto'});
					}
					if( wST>=aOT && wST<=aOB ){
						$('.parallaxA_ads').css({'top':0, 'bottom':'auto'});
					}
					console.log(a.height());
				}
			};
			$(document).on('scroll', genPos);*/
			
        }
    },
    
	pushdown_static: function(e){
        var i;
        if( $('.'+e).has('video') ){
            if( utils.MobileDevice() == 'iPhone' ){
                $('.'+e+' video').attr('playsinline', '');
                $('.'+e+' video').attr('webkit-playsinline', '');
            }
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
        var d, o, c;
        $('.'+e).each(function(){
            d = $(this).attr('class').split(' ');
            o = d[1];
            c = d[2] == undefined ? d[1] : d[2];
			if(daeg.hasOwnProperty(o)) new daeg[o](c);
			console.log(o + ', ' + c);
        });
		//utils.inject('#detikdetailtext', 'staticbanner2_detail');
		//ga('create', 'UA-77056777-1', {'name':'detikads'});
		//ga('detikads.send', 'event', '00000', 'Testing GA', 'traffic');
    }
}

document.addEventListener('DOMContentLoaded', function(){
    new daeg.init('detikads');
});



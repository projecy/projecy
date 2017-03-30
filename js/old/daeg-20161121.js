var gaVideo = {    
	addGAtoVideo: function(e, b){
		//set b = false to disable tracking
        var q, c, d, a; //q=quarter, s=setquarter, c=currenttime, d=duration, t=category for ga, a=action
        var s = [true, true, true, true];
        var t = $('.'+e).attr('mo');
        var setTracking = function(a){
            //if(b) _gaq.push(['_trackEvent', t, a]);
            if(b) ga('all.send', 'event', t, a, 'traffic')
            console.log( t + ', ' + a );
        };
        var trackPlay = function(){
            c = $('.'+e)[0].currentTime;
            d = $('.'+e)[0].duration;
            q = [d * 0, d * 0.25, d * 0.5, d * 0.75];
            if( c == 0 || c == d ){
                setTracking('video play');
            }
        }
        var trackEnded = function(){
            setTracking('video watched until the end');
            s = [true, true, true, true];
        };
        var trackPause = function(){
            c = $('.'+e)[0].currentTime;
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
            c = $('.'+e)[0].currentTime;
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
        $(window).on('DOMContentLoaded', function(){
            $('.'+e).on('play', trackPlay);
            $('.'+e).on('ended', trackEnded);
            $('.'+e).on('pause', trackPause);
            $('.'+e).on('timeupdate', trackTimeupdate);
        });
    }
}

var utils = {
	path: '',
	ga : function(e, a, b){
		//set b = false to disable tracking
		//if(b=='true') _gaq.push(['_trackEvent', $('.'+e).attr('mo'), a]);
		if(b=='true') ga('all.send', 'event', $('.'+e).attr('mo'), a, 'traffic');
        console.log( $('.'+e).attr('mo') + ', ' + a + ', status=' + b );
	},
    remove: function(e) {
        $('.'+e+'_close').click(function(){
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
	
	sto: function(e){ 
		utils.remove(e) 
	},
	
	sto_skycrapper: function(e){ 
		utils.hide(e) 
	},
	
	/*sidekick: function(e){
		var expand: function(){
			$('.'+e+'_sto').animate({'width':970}, 'slow');
			$('.'+e+'_clip').animate({'left': 0}, 'slow'); 
			$('html, body').animate({scrollLeft: $(window).width()}, 'slow');
			$('.'+e+'_mr').off('mouseover');
		}
		var hide: function(){
			$('.'+e+'_clip').animate({'left': -970}, 'slow');
			$('.'+e+'_sto').animate({'width': 0}, 'slow');
		}
		$('.'+e+'_mr a').on('mouseover click', expand);
		$('.'+e+'_close').on('click', hide);
	},*/
	
	premium_billboard: function(e){
		var a=Boolean(true), b=300;
		var c = function(){
			if(window.scrollY>=b && a){
				hide();
			}
		}
		var show = function(){
			$('.'+e).show();
			//$('.top_banner_bar').dequeue().hide().css('position', 'relative');
			$('.top_banner_bar').hide();
			a=true;
			window.scroll(0, 0);
		}
		var hide = function(){
			$('.'+e).hide();
			$('.top_banner_bar').show();
			a=false;
			window.scroll(0, 0);
		}
		var remove = function(){
			$('.top_banner_bar').remove();
		}
		$('.top_frame').click(show);
		$('.top_frame_close').click(remove);
		$('.'+e+'_close').click(hide);
		window.addEventListener('scroll', c);
		show();
	},
	premium_billboard2: function(e){
		var a=Boolean(true), b=300;
		var c = function(){
			if(window.scrollY>=b && a){
				hide();
			}
		}
		var show = function(){
			$('.'+e).show();
			//$('.top_banner_bar').dequeue().hide().css('position', 'relative');
			$('.top_frame').hide();
			a=true;
			window.scroll(0, 0);
		}
		var hide = function(){
			$('.'+e).hide();
			$('.top_frame').show();
			a=false;
			window.scroll(0, 0);
		}
		var remove = function(){
			$('.top_frame').remove();
		}
		$('.top_frame').click(show);
		$('.top_frame_close').click(remove);
		$('.'+e+'_close').click(hide);
		window.addEventListener('scroll', c);
		show();
	},
	
	skycrapper_sto: function(e){
		var expand = function(){
			$('.sto_skycrapper').show();
			$('.'+e).off('mouseover');
			utils.ga(e, 'expand to sto', $('.'+e).attr('ga'));
		}
		$('.'+e).on('click mouseover', expand);
	},
	
    promobox: function(e){
        var i;
        var holdClick = 0;
        $('.'+e+' video').prop('volume', 0);
		new ga.addGAtoVideo($('.'+e+' video'));
        $('.'+e+' a').click(function(){
            if(holdClick<1){
                $('.'+e+' video').prop('volume', 1);
                holdClick++;
                return false;
            }
        });
        i = setInterval(function(){
            if( utils.inViewArea(e)==true ) {
                $('.'+e+' video').attr('controls', 'controls');
                $('.'+e+' video')[0].play();
                clearInterval(i);
            }
        }, 100);
    },
	
	promobox_sto: function(e){
		var expand = function(){
			var sto = '<div class="detikads sto">';
			sto += '<img class="sto_close" src="//cdnstatic.detik.com/live/assets/close.png">';
			sto += '<div class="sto_ads">';
			sto += '<iframe src="" width="970" height="600" frameborder="0" scrolling="no"></iframe>';
			sto += '</div></div>';
			$('body').prepend(sto);
			new daeg.sto('sto');
			$('.sto iframe').attr('src', utils.path);
		}
		$('.'+e).on('click', expand);
	},
	
    parallaxB: function(e){
        var i, j, k, wH, dST, pST_dST, adj, wST, wSB, aOT, aOB;
        var p = $('.'+e);
        $('.parallaxA_fix').width(p.width());
        /*var a = $('.'+e).has('iframe')==true ? $('.'+e+' iframe') : $('.'+e+' img');*/
        var a = $('.parallaxA_ads');
        //a.width(p.width());
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
            }
            if( wSB>=aOT && wSB>=aOB ){
                if( wST<aOT ){
                    var t = adj*(wH-a.height());
                    a.css({'top':t, 'bottom':'auto'});
                }
                if( wST>=aOT && wST<=aOB ){
                    a.css({'top':0, 'bottom':'auto'});
                }
            }
        };
        $(document).on('scroll', genPos);
    },
    
    /*START FROM HERE*/
    init: function(e){
        var d, o, c;
        $('.'+e).each(function(){
            d = $(this).attr('class').split(' ');
            o = d[1];
            c = d[2] == undefined ? d[1] : d[2];
            daeg.hasOwnProperty(o) ? new daeg[o](c) : null;
        });
		utils.inject('#detikdetailtext', 'center1_detail');
    }
}

document.addEventListener('DOMContentLoaded', function(){
    new daeg.init('detikads');
});


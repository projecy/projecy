var gaVideo = {    
	addGAtoVideo: function(e){
		var lbl = 'video in banner';
        var q, c, d, a; //q=quarter, s=setquarter, c=currenttime, d=duration, t=category for ga, a=action
        var s = [true, true, true, true];
        var t = $('.'+e).attr('mo');
        var trackPlay = function(){
			c = $('.'+e)[0].currentTime;
			d = $('.'+e)[0].duration;
			q = [d * 0, d * 0.25, d * 0.5, d * 0.75];
            if( c == 0 || c == d ){
				utils.ga(t, 'video play', lbl);
            }
        };
        var trackEnded = function(){
			utils.ga(t, 'video watched until the end', lbl);
            s = [true, true, true, true];
        };
        var trackPause = function(){
			c = $('.'+e)[0].currentTime;
			d = $('.'+e)[0].duration;
			q = [d * 0, d * 0.25, d * 0.5, d * 0.75];
            if( c >= q[0] && c <= q[1] ){
				utils.ga(t, 'user paused before 1/4 of video length', lbl);
            }
            if( c >= q[1] && c <= q[2] ){
				utils.ga(t, 'user paused before 2/4 of video length', lbl);
            }
            if( c >= q[2] && c <= q[3] ){
				utils.ga(t, 'user paused before 3/4 of video length', lbl);
            }
            if( c >= q[3] && c !== d ){
				utils.ga(t, 'user paused before video finish', lbl);
            }
        };
        $(window).on('DOMContentLoaded', function(){
            $('.'+e).on('play', trackPlay);
            $('.'+e).on('ended', trackEnded);
            $('.'+e).on('pause', trackPause);
			/*d = $('.'+e)[0].duration;
			q = [d * 0, d * 0.25, d * 0.5, d * 0.75];*/
			if($('.'+e).attr('status').search('controls')>-1) $('.'+e).prop('controls', true);
			if($('.'+e).attr('status').search('muted')>-1) $('.'+e).prop('muted', true);
			if($('.'+e).attr('status').search('autoplay')>-1) setTimeout(function(){$('.'+e)[0].play();}, 1000);
        });
    }
};

var utils = {
	path: '',
	ga : function(mo, act, lbl){
		//ga('create', 'UA-891770-238', {'name':'detikads'});
		//ga('detikads.send', 'event', mo, act, lbl);
        console.log(mo+', '+act+', '+lbl);
	},
    remove: function(e, mo, act, lbl) {
        $('.'+e+'_close').click(function(){
			utils.ga(mo, act, lbl);
            $('.'+e).remove();
        });
    },
    hide: function(e, mo, act, lbl) {
        $('.'+e+'_close').click(function(){
			utils.ga(mo, act, lbl);
            $('.'+e).hide();
        });
    },
    inViewArea: function(e){
        var balance = 200;
        var adsBot = $('.'+e).offset().top + $('.'+e).outerHeight();
        var scrBot = $(window).scrollTop() + balance + ($(window).outerHeight()/2);
        //console.log('adsBot='+adsBot+' <= scrBot='+scrBot);
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
    promobox_videoB: function(e){ //promobox cerebos
        var i;
        var holdClick = 0;
		var mo = $('.'+e).attr('mo');
		var act1 = 'first click';
		var act2 = 'second click';
		var lbl = 'video in banner';
        $('.'+e+' a').click(function(){
            if(holdClick<1){
                $('.'+e+' video').removeProp('muted');
				//ga : function(mo, act, lbl)
				utils.ga(mo, act1, lbl);
                holdClick++;
                return false;
            }else{
				utils.ga(mo, act2, lbl);
			}
        });
        i = setInterval(function(){
            if( utils.inViewArea(e)==true ) {
				setTimeout(function(){$('.'+e+' video')[0].play();}, 100);
                clearInterval(i);
            }
        }, 100);
    },
	
	interstitial_hide: function(e){
		var hide = function(){
			$('.'+e+' iframe').attr('src', '');
			$('.'+e).removeClass('showit');
			setTimeout(function(){
				$('.'+e).hide();
			}, 400);
			utils.ga($('.'+e).attr('mo'), 'manual hide', 'interstitial | desktop');
		}
		$('.'+e+'_close').click(hide);
	},
	
	promobox_interstitial: function(e){
		var expand = function(){
			$('.interstitial_hide').show();
			$('.interstitial_hide iframe').attr('src', utils.path);
			setTimeout(function(){
				$('.interstitial_hide').addClass('showit');
			}, 100);
			utils.ga($('.'+e).attr('mo'), 'manual expand', 'interstitial | desktop');
		}
		$('.'+e).on('click', expand);
	},
	
	ga_video: function(e){
		new gaVideo.addGAtoVideo(e);
	},
	
    top_frame: function(e) { 
		utils.remove(e, $('.'+e).attr('mo'), 'manual remove', 'top_frame');
	},
	
    bottom_frame: function(e){ 
		utils.remove(e, $('.'+e).attr('mo'), 'manual remove', 'bottom_frame');
		var mover = 0;
		var bottomslider = function(){
			$('.'+e+'_ads').animate({bottom:-70}, 'fast');
			$('.bottomslider').animate({bottom:0}, 'fast', function(){$('.bottomslider_ads').animate({bottom:0}, 'fast')});
			if(mover==0){
				$('.'+e+'_ads a').off('mouseover');
				utils.ga($('.'+e).attr('mo'), 'auto expand', 'bottomslider');
				mover++;
			}else{
				utils.ga($('.'+e).attr('mo'), 'manual expand', 'bottomslider');
			}
			
		}
		if($('.'+e).attr('status')=='bottomslider'){
			$('.'+e+'_ads a').on('click mouseover', bottomslider);
		}
	},
	
	sto: function(e){ 
		utils.remove(e, $('.'+e).attr('mo'), 'manual remove', 'sto'); 
	},
	
	sto_skycrapper: function(e){ 
		utils.hide(e); 
	},
	
	bottomslider: function(e){
		var collapse = function(){
			$('.'+e+'_ads').animate({bottom:-600}, 'fast', function(){$('.'+e).animate({bottom:-1000}, 'fast')});
			$('.bottom_frame_ads').animate({bottom:0}, 'fast');
			utils.ga($('.'+e).attr('mo'), 'manual collapse', 'bottomslider');
		}
		$('.'+e+'_close').click(collapse);
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
			//utils.ga(e, 'expand to sto', $('.'+e).attr('ga'));
		}
		$('.'+e).on('click mouseover', expand);
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
            //daeg.hasOwnProperty(o) ? new daeg[o](c) : null;
            //daeg.hasOwnProperty(o) ? new daeg[o](c) : '';
			if(daeg.hasOwnProperty(o)) new daeg[o](c);
			console.log(o+', '+c);
        });
		utils.inject('#detikdetailtext', 'center1_detail');
    }
}

document.addEventListener('DOMContentLoaded', function(){
    new daeg.init('detikads');
});



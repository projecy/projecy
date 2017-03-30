$("#slide-feed-1").carouFredSel({
	circular: true,
	infinite: true,
	auto : {
		pauseOnHover: 'resume',
		stop: 12000
	},
	responsive: true,
	items: 3,
	margin:0,
	prev : {
		button : "#prev-carou-1",
		key : "left"
	},
	next : {
		button : "#next-carou-1",
		key : "right"
	}
});




$("#slide-feed-1").carouFredSel({
	scroll:{ 
		items: 3, 
		easing: "elastic", 
		duration: 1000, 
		pauseOnHover: true 
	},
	circular: true,
	infinite: true,
	responsive: true,
	margin:0,
	prev : {
		button : "#prev-carou-1",
		key : "left"
	},
	next : {
		button : "#next-carou-1",
		key : "right"
	}
}); 
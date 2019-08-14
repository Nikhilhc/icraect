/*
 * Common script for HB. For example: Fixed and Sticky Header animation.
 */
( function( $ ) {
	// Set common variables.
	var windowSel = $( window );
	var bodySel = $( 'body' );
	var fixedSel = $( '.mkhb-fixed' );
	var stickySel = $( '.mkhb-sticky' );

	// Used to check if responsive burger menu is active on normal header or not.
	var normalRespNav = $( '.mkhb-navigation-resp__normal' );
	// Used to check if responsive burger menu is active on sticky header or not.
	var stickyRespNav = $( '.mkhb-navigation-resp__sticky' );

	var windowHeight = windowSel.height();
	// adminBarHeight value will be updated after window load, check initialAction().
	var adminBarHeight = 0;

	/**
	 * HELPERS LIST
	 */

	// FH - Get Header offset.
	function mkhbGetOffset( offset, device ) {
		var deviceEl = $( '.mkhb-' + device );
		var $offset = 0;
		if ( typeof offset === 'string' && offset !== 'header' ) {
			$offset = Math.round( ( parseInt( offset ) / 100 ) * windowHeight );
		} else if ( typeof offset === 'number' ) {
			$offset = parseInt( offset );
		}

		// Check if it's NaN or undefined.
		if ( 0 == $offset || isNaN( $offset ) ) {
			$offset = deviceEl.height();
			if ( deviceEl.hasClass( 'mkhb-overlap' ) ) {
				$offset = deviceEl.children( '.mkhb-device-container' ).height();
			}
		}

		return $offset;
	}

	// SH - Update admin bar height for Sticky header top position.
	function mkhbUpdateTop() {
		adminBarHeight = $( '#wpadminbar' ).height();
		adminBarHeight = ( adminBarHeight == null ) ? 0 : adminBarHeight;
	}

	/**
	 * FUNCTIONS LIST
	 */

	// FH - Set height of HB container.
	function mkhbSetFixedHeight( selector ) {
		selector.each( function( e ) {
			var thisSel = $( this );
			if ( ! thisSel.hasClass( 'mkhb-overlap' ) ) {
				var childHeight = thisSel.children( '.mkhb-device-container' ).height();
				thisSel.height( childHeight );
			}
		});
	}

	// SH - 1. Slide Down.
	function mkhbSlideDown( current, offset, device, curHeight ) {
		var onScroll = function onScroll() {
			var addOffset = mkhbAddRespNormal( offset );
			if ( windowSel.scrollTop() > addOffset ) {
			    current.css({ 'top': adminBarHeight });
			    current.addClass( 'mkhb-sticky--active' );
			} else {
				current.css({ 'top': -curHeight });
			    current.removeClass( 'mkhb-sticky--active' );
			    mkhbHideRespBurger();
			}
		};

		onScroll();
		windowSel.on( 'scroll', onScroll );
	}

	// SH - 2. Lazy.
	function mkhbLazy( current, offset, device, curHeight ) {
		var lastScrollPos = 0;
		var onScroll = function onScroll() {
			var scrollPos = windowSel.scrollTop();
			if ( scrollPos > offset && scrollPos < lastScrollPos ) {
			    current.css({ 'top': adminBarHeight });
			    current.addClass( 'mkhb-sticky--active' );
			} else {
				current.css({ 'top': -curHeight });
			    current.removeClass( 'mkhb-sticky--active' );
			    mkhbHideRespBurger();
			}
			lastScrollPos = scrollPos;
		};

		onScroll();
		windowSel.on( 'scroll', onScroll );
	}

	// SH - Hide/show responsive burger menu.
	function mkhbHideRespBurger() {
		// Skip if there is no responsive burger nav exist.
		if ( stickyRespNav.length <= 0 ) {
			return;
		}

		// Skip if there is no responsive burger nav active.
		if ( $( 'body[class*="mkhb-navigation-resp--opened"]' ) <= 0 ) {
			return;
		}

		stickyRespNav.each( function(){
			// Find the navigation wrapper and navigation burger button.
			var wrap = $( this );
			var id = wrap.attr( 'id' ).replace( '-wrap', '' );
			var current = $( '#' + id ).find( '.mkhb-navigation-resp' );

			// Check if current responsive burger menu is opened. Then close it.
			if ( bodySel.hasClass( 'mkhb-navigation-resp--opened-' + id ) ) {
				current.removeClass('is-active').find('.mkhb-navigation-resp__container').removeClass('fullscreen-active');
				bodySel.removeClass('mkhb-navigation-resp--opened-' + id).addClass('mkhb-navigation-resp--closed-' + id).trigger('mkhb-navigation-resp--closed-' + id);
				wrap.hide();
			}
		} );
	}

	// NH - Get additional height of responsive burger nav container on normal header.
	function mkhbAddRespNormal( top ) {
		// Skip if there is responsive burger nav exist.
		if ( normalRespNav.length <= 0 ) {
			return top;
		}

		// Skip if there is responsive burger nav is not active.
		if ( $( 'body[class*="mkhb-navigation-resp--opened"]' ) <= 0 ) {
			return top;
		}

		normalRespNav.each( function(){
			var current = $( this );
			var height = current.height();
			var id = current.attr( 'id' ).replace( '-wrap', '' );

			// Check if current responsive burger menu is opened.
			if ( bodySel.hasClass( 'mkhb-navigation-resp--opened-' + id ) ) {
				return top = top + parseInt( height );
			}
		} );

		return top;
	}

	/**
	 * ACTIONS LIST
	 */

	// Action - FH - Handle all resize action.
	var resizeHeader = function resizeHeader() {
		var fixedRsz = $( '.mkhb-fixed' );
		if ( fixedRsz.length > 0 ) {
			mkhbSetFixedHeight( fixedRsz );
		}
	}

	// Action - FH - Set the height of each devices.
	if ( fixedSel.length > 0 ) {
		mkhbSetFixedHeight( fixedSel );
		windowSel.on( 'resize', resizeHeader );
	}

	// Actiion - SH - Play the effect for Sticky Header.
	var initialAction = function initialAction() {
		if ( stickySel.length > 0 ) {
			stickySel.each( function( e ) {
				var current = $( this );

				// Set the offset when the sticky will be displayed.
				var offset = current.data( 'offset' );
				var device = current.data( 'device' );
				offset = mkhbGetOffset( offset, device );

				// Update adminBarHeight value.
				mkhbUpdateTop();

				// Set the initial position of the sticky menu.
				var curHeight = current.height();
				current.css({ 'top': -curHeight });

				var effect = current.data( 'effect' );
				if ( effect == 'slide-down' ) {
					mkhbSlideDown( current, offset, device, curHeight );
				} else if ( effect == 'lazy' ) {
					mkhbLazy( current, offset, device, curHeight );
				}
			});
		}
	}

	windowSel.on( 'load', initialAction );

	windowSel.on( 'resize', mkhbUpdateTop );

})( jQuery );
/*
     FILE ARCHIVED ON 00:29:07 Aug 31, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 14:21:32 Aug 14, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  PetaboxLoader3.datanode: 377.871 (5)
  PetaboxLoader3.resolve: 175.363 (2)
  RedisCDXSource: 2.387
  esindex: 0.011
  CDXLines.iter: 11.814 (3)
  exclusion.robots.policy: 0.193
  LoadShardBlock: 221.356 (3)
  captures_list: 238.64
  exclusion.robots: 0.207
  load_resource: 334.85
*/
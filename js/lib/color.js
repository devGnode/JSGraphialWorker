//mkPaletteColor
var mkPalletteColor = function( ){
	
	// 
	function newPalletteMonochrome( bit /**/, deep ){
		var r = 0, g = 0, b = 0,
		bit = Math.pow( 2, bit ),
		bool = !1, add = Math.floor( ( 0x100 / ( bit-1 ) ) ),
		ret = [], rgbp;
			
			deep = deep ? deep : ({r:1,g:1,b:1});
			
		function rgb( ){
			bool ? (
				r+= ( deep.r ? add : 0),
				g+= ( deep.g ? add : 0),
				b+= ( deep.b ? add : 0) ) : 0;
				!bool ? ( bool = !bool ) : 0;
				r > 256 ? (r = 0 ) : 0;
				g > 256 ? (g = 0 ) : 0;
				b > 256 ? (b = 0 ) : 0;
		return { 
			r:r,
			g:g,
			b:b
			};
		}
			
		for( var i = 0; i < bit; i++ ){
			rgbp = rgb( );
			ret.push( ( rgbp.r << 16 | rgbp.g << 8 | rgbp.b ) );
		}
	return ret;
	}
	
	//
	function cga_colorPallette( ){
	var p = newPalletteMonochrome( 2 );
	return[
		p[0],0x0000aa,0x00aa00,0x00aaaa,0xaa0000,0xaa00aa,0xaa5500,p[1],
		p[2],0x5555ff,0x55ff55,0x55ffff,0xff5555,0xff55ff,0xffff55,p[3]
		];
	}
	function cga_colorPage( ){
		var p = cga_colorPallette( );
		return [
			[p[0x00],p[0x03],p[0x05],p[0x07]],
			[p[0x00],p[0x03],p[0x04],p[0x07]],
			[p[0x00],p[0x02],p[0x04],p[0x06]],
			[p[0x00],p[0x0B],p[0x0D],p[0x0F]],
			[p[0x00],p[0x0B],p[0x0C],p[0x0F]],
			[p[0x00],p[0x0A],p[0x0C],p[0x0E]],
		];
	}
	//
	function simple_pallette( pallette, bpp, r,g,b ){
		( newPaletteMonochrome( bpp&0x0f, {r:r,g:g,b:b } ).map( function( val, i ){
			i != 0 ? pallette.push( val  ) : 0;
		}) );
	return pallette;
	}
	//
	return {
		newPalletteMonochrome:function( bpp ){
			return newPalletteMonochrome( bpp&0x0f );
		},
		rawPalletteColor:function( bpp, r,g,b ){
			return newPalletteMonochrome( bpp, { r:r,g:g,b:b });
		},
		newPalletteColor:function( bpp  ){
			var bp = Math.pow( 2, bpp ),
				tmp, ret = [];
				
				tmp = newPalletteMonochrome( bpp/2 );
				simple_pallette( tmp, bpp/2, 1,0,0 );
				simple_pallette( tmp, bpp/2, 0,1,0 );
				simple_pallette( tmp, bpp/2, 0,0,1 );
				simple_pallette( tmp, bpp/2, 0,1,1 );
				
				
		return tmp;
		},
		newPalletteCGA:function( page ){
			return !page ? cga_colorPallette( ) : cga_colorPage( );
		},
	};
	//
};

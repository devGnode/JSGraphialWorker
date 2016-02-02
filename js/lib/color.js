//mkPaletteColor
var mkPaletteColor = function( ){
	
	// non-regular rgb
	// default palette color 
	// CGA, EGA, MCGA, VGA mod TEXT
	//https://upload.wikimedia.org/wikipedia/commons/d/df/EGA_Table.PNG
	//https://fr.wikipedia.org/wiki/Color_Graphics_Adapter
	//https://en.wikipedia.org/wiki/Video_Graphics_Array
	var paletteDefault = [0x00,0x01,0x02,0x03,
						  0x04,0x05,0x14,0x07,
						  0x38,0x39,0x3A,0x3B,
						  0x3C,0x3D,0x3E,0x3F];
	
	// RGBrgb 6bit
	// clc b of rgb
	// x = 256/3 ( rgb 3bit )
	// rgb RGB 
	// 000 000 = 0
	// 000 001 = 01 = 1*x = 85
	// 001 000 = 10 = 2*x = 170
	// 001 001 = 11 = 3*x = 255
	function RGBrgb( bpp, R,G,B, r,g,b ){
	var add = Math.floor( 0x100/bpp );
	return ( ( parseInt( R ) << 1 | parseInt( r ) ) * add ) << 0x10 |
		   ( ( parseInt( G ) << 1 | parseInt( g ) ) * add ) << 0x08 |
		   ( ( parseInt( B ) << 1 | parseInt( b ) ) * add );
	}
	// RGBI 4bit
	// 1000 intensity
	// 0100 Red
	// 0010 Green
	// 0001 Blue
	function rgbi( bpp, i, r,g,b, itr ){
	var add = Math.floor( 0x100/bpp );
	return ( ( r << 1 | i ) * add ) << 0x10 |
		   ( ( ( g << 1 | i ) * add )/( !i && itr == 6 ? 2 : 1 ) ) << 0x08 |
		   ( b << 1 | i ) * add;
	}
	// rgb 3bit
	function rgb3( r,g,b ){
	return  ( r * 0xff ) << 0x10 |
			( g * 0xff ) << 0x08 |
			b * 0xff;
	}
	
	function checkBinary( b, bit ){
		var n= bit-(bit-b.length ),
			tmp = "";
		try{	
			while( n<bit ){
				tmp += "0",n++;
			}
		}catch(e){};
	return (tmp+b);
	}
	
	function newPaletteColor3( ){
		var clr = [], tmp,
			i = 0;
			for(; i<0x08; i++ ){
				tmp = checkBinary( base.decbin( i ), 3 );
				clr.push( rgb3(
					tmp[0], // r
					tmp[1], // g
					tmp[2]  // b
				));
			}
	return clr;
	}
	function cga_paletteText( ){
		var clr = [],
			tmp  = i = 0;
		
		for(; i< 16; i++ ){
			tmp = checkBinary( base.decbin( i ), 4 );
			clr.push( rgbi( 3, parseInt( tmp[0] ), // i
							   parseInt( tmp[1] ), // r
							   parseInt( tmp[2] ), // g
							   parseInt( tmp[3] ), // b
							   i ) );
		}
	return clr;
	}
	function cga_paletteGraphic( palette ){
		var clr = ( palette || cga_paletteText( ) ),
			ret = [0x00,0x03,0x05,0x07, // palette 1 low  
				   0x00,0x00,0x00,0x00, // palette 1 hight
				   0x00,0x02,0x04,0x06, // palette 2 low
				   0x00,0x00,0x00,0x00, // palette 2 high
				   0x00,0x03,0x04,0x07, // palette 3 low
				   0x00,0x00,0x00,0x00],// palette 3 high
				   i = 0, len = ret.length;
	
		for(; i< len-0x04; i++ ){
			i += !(i%0x04) && i != 0 ? 0x04 : 0;
			ret[ i+0x04 ] = clr[ ret[ i ] + ( ret[i] == 0  ? 0 :  0x08 ) ];
			ret[ i+0x00 ] = clr[ ret[ i ] ]; 
		}
		
	return ret;
	}
	function makeDefaultPalette4( ){
		var clr = [], tmp,
			i = 0, len = paletteDefault.length;
			
		for(; i<len; i++ ){
			tmp = checkBinary( base.decbin( paletteDefault[ i ] ), 6 );
			clr.push( RGBrgb( 3, tmp[3], tmp[4], tmp[5], tmp[0], tmp[1], tmp[2] ) );
		}
	return clr;
	}
	function ega_paletteGraphic( ){
		var i = 0, ret = [];
		for(; i<64; i++ ){
			tmp = checkBinary( base.decbin( i ), 6 );
			ret.push( RGBrgb( 3, tmp[3], tmp[4], tmp[5], tmp[0], tmp[1], tmp[2] ) );	
		}
	return ret;
	}
	//
	// http://www.cpcwiki.eu/index.php/Video_modes
	function newPaletteMonochrome( bit /**/, deep ){
		var r = 0, g = 0, b = 0,
			bit = Math.pow( 2, bit ),
			bool = !1, add = Math.floor( ( 0x100 / ( bit-1 ) ) ),
			ret = [];
			
			deep = deep ? deep : ({r:1,g:1,b:1});
			add  = add >= 256 ? 255 : add;
			
		function rgb( ){
			bool ? (
				r+= ( deep.r ? add : 0),
				g+= ( deep.g ? add : 0),
				b+= ( deep.b ? add : 0) ) : 0;
				!bool ? ( bool = !bool ) : 0;
				r > 256 ? (r = 0 ) : 0;
				g > 256 ? (g = 0 ) : 0;
				b > 256 ? (b = 0 ) : 0;
		return ( r << 16 | g << 8 | b )
		}
			
		for( var i = 0; i < bit; i++ )
			ret.push( rgb( ) );;
		
	return ret;
	}
	//
	function simple_palette( palette, bpp, r,g,b ){
		( newPaletteMonochrome( bpp&0x0f, {r:r,g:g,b:b } ).map( function( val, i ){
			i != 0 ? palette.push( val  ) : 0;
		}) );
	return palette;
	}
	
	//
	return {
		newPaletteMonochrome:function( bpp ){
			return newPaletteMonochrome( bpp&0x0f );
		},
		rawPaletteColor:function( bpp, r,g,b ){
			return newPaletteMonochrome( bpp, { r:r,g:g,b:b });
		},
		newPaletteColor:function( bpp  ){
			var bp = Math.pow( 2, bpp ),
				tmp, ret = [];
				
				tmp = newPaletteMonochrome( bpp/2 );
				simple_palette( tmp, bpp/2, 1,0,0 );
				simple_palette( tmp, bpp/2, 0,1,0 );
				simple_palette( tmp, bpp/2, 0,0,1 );
				simple_palette( tmp, bpp/2, 0,1,1 );
				
		return tmp;
		},
		newPaletteColor3:function( ){
			return newPaletteColor3( );
		},
		newPaletteCGA:function( isGraphic ){
			return ( !isGraphic ? cga_paletteText : cga_paletteGraphic )(  );
		},
		newPaletteEGA:function( isGraphic ){
			return ( !isGraphic ? makeDefaultPalette4 : ega_paletteGraphic )( );
		},
		newPaletteVGA:makeDefaultPalette4,
	};
	//
};


var graphicalModeText = function( setting ){
	var monitor = setting.monitor, 
		RAMDAC  = setting._gui_,
		VRAM    = setting.vram,
		
		// text buffer
		CHAR_ROM = setting.charRom, 
		PALT_ROM = setting.palette,
		self = {};	
		
	/*put char on screen*/
	var putChar = function( x, y, chr, cnt, clr, fnt ){
		var offsetX = x*monitor.charSize[0],
			offsetY = y*monitor.charSize[1],
			i = x = y = 0;
		try{
			for(; i< chr.length; i++,x++ ){
					
				x = x === monitor.charSize[0] ? 0 : x;
				y+= (i%monitor.charSize[0]) === 0 && i != 0 ? 1 : 0;
				
				_gui_.setPixel(
					x+offsetX,
					y+offsetY,
					( chr[ i ] === 1 ? clr :
						( chr[ i ] === 0 && ( fnt || fnt >= 0 ) ? fnt : 0x000000 ) ) );
			}
		}catch(e){
			return !1;
		};
	return !0;
	};
	/**/
	self.putChar = function( x, y, chr, cnt, clr, fnt ){
		return putChar( 
						x,y, 
						CHAR_ROM[ chr&0xff ],
						cnt, clr, fnt 
					   );
	};
	self.putCharByOffset = function( offset, chr, clr, fnt ){
		return putChar( 
						offset%monitor.charMax, 
						Math.floor( offset/monitor.charMax ),
						CHAR_ROM[ chr&0xff ], 1, clr, fnt 
					   );
	};
	self.resetChar = function( x, y, clr ){
		return putChar( 
						x, y, 
						new Array( monitor.charSize[0]*monitor.charSize[1] ).fill( 1 ),
						1, clr || 0x000000 
					);
	};
	self.resetCharByOffset = function( offset, clr ){
		return this.resetChar( 
						offset%monitor.charMax, // x
						Math.floor(  offset/monitor.charMax ), // y
						clr || 0x000000 
						);
	};

	self.refresh = function( vram ){
		var chr = clr = 0, 
			len = VRAM.length;
			
		RAMDAC.resetScreen( 0 );
			
			( vram || VRAM ).map( function( word, i ){
				if( word === 0 )
					return;;
			
				clr = PALT_ROM[ word&0x0f ];
				fnt = PALT_ROM[ ( word&0x00f0 ) >> 4 ];
		
				self.putCharByOffset( 
					i,
					( word >> 8 )&0xff,
					clr,
					( fnt || null ) );	
		
			});
			
			vram ? (VRAM = vram ) : 0;
			
		RAMDAC.refresh( );
	};

	return self;
};

if( require_pass ){
	return graphicalModeText;
}

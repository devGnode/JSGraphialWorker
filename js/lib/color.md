#mkPalletteColor

```javascript
  var clr = mkPalletteColor( );
```

**methods :**

>###newPalletteMonochrome

parameters : uint bpp ( 1,2,4,8 ) 
<br>@return Array[ bpp ] colorMono

  ```javascript
  clr.newPalletteMonochrome( 1 ); // Array 2 colors [ 0, 16777215 ]
  clr.newPalletteMonochrome( 2 ); // Array 4 colors
  clr.newPalletteMonochrome( 4 ); // Array 16 colors
  clr.newPalletteMonochrome( 8 ); // Array 256 colors
```
  
>###rawPalletteColor

parameters : bit bpp, bit deepR, bit deepG, bit deepB
<br>@return Array[ bpp ] color

```javascript
  clr.rawPalletteColor( 2, 1,0,0 ); // red
  clr.rawPalletteColor( 2, 1,0,1 ); // red, blue
```

>###newPalletteCGA
using palette 4 bit rgbi 

parameters : bool isGraphic
<br>@return Array[ 16 ] color || Array[ 24 ]

```javascript
  clr.newPalletteCGA(  );
  clr.newPalletteCGA( true );
  //[0x00,.... , palette 1 low  
	// 0x00,.... , palette 1 hight
	// 0x00,.... , palette 2 low
	// 0x00,...., palette 2 high
	// 0x00,...., palette 3 low
	// 0x00....], palette 3 high
``` 
>###newPalletteEGA

parameters : void
<br>@return Array[ 16 ] color

 ```javascript
  clr.newPalletteVGA(  ); // CGA == EGA == MCGA == VGA == paletteColors mode text
```

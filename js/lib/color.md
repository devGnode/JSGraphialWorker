#mkPalletteColor

```javascript
  var clr = mkPalletteColor( );
```

**methods :**

>###newPalletteMonochrome

parameters : uint bpp ( 1,2,4,8 ) 
<br>@return Array[ bpp ] colorMono

  ```javascript
  clr.newPalletteMonochrome( 4 );
```
  
>###rawPalletteColor

parameters : bit bpp, bit deepR, bit deepG, bit deepB
<br>@return Array[ bpp ] color

```javascript
  clr.rawPalletteColor( 2, 1,0,0 );
```

>###newPalletteColor

parameters : uint bpp ( 1,2,4,8 )
<br>@return Array[ 16 ] color

 ```javascript
  clr.newPalletteColor( 2 );
```

>###newPalletteCGA

parameters : bool hasPage
<br>@return Array[ 16 ] color || Array[ 6 ][ 16 ]

```javascript
  clr.newPalletteCGA( true );
  clr.newPalletteCGA(  );
``` 
 

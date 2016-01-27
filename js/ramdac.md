#graphicalModeText

```javascript
  var MDA_DEVICE  	   = 0x20,
      VGA_DEVICE_8x8   = 0x01,
      VGA_DEVICE_8x16  = 0x11,
      VGA_DEVICE_9x16  = 0x31,
      CGA_DEVICE_8x8   = 0x02,
      CGA_DEVICE_8x16  = 0x12;
			
  var gmt = graphicalModeText({
    monitor: {
      device: byte device,
      monitor: DOMHtml Canvas
      width: uint x,
      height: uint y,
      
      charSize:[ uint cx, uint cy ],
      
      charMax : uint char
      lineMax : uint line,
      
      bpp: uint bpp ( 1 || 2 || 4 )
    },
    _gui_:  Object graphicalUserInterface,
    palette: Array[ 2^bpp ] colorPalette,
    charRom: Array[ 256 ][ charMax*lineMax ] character
    
    vram: Array[ charMax*lineMax ] vram
    });
```
  
**methods :**

>###putChar

parameters : uint x, uint y, uint char, uint count, uint color [,  uint fontColor ] 
<br>@return true

  ```javascript
  gmt.putChar( 5, 1, 97, 0xff0000, 0xffffff );
```
  
>###putCharByOffset 

parameters : uint  offset, uint char, uint color [,  uint fontColor ]
<br>@return true

```javascript
  gmt.putCharByOffset( 255, 97, 0x00aa00 );
```

>###resetChar 

parameters : uint x, uint y [, uint fontColor value 0 by default ( black color ) ]
<br>@return true

 ```javascript
  gmt.resetChar( 320, 400 );
  gmt.resetChar( 320, 400, 0x0000ff ); // font blue
```

>###resetCharByOffset

parameters : uint offset [, uint fontColor ]
<br>@return true

```javascript
  gmt.resetCharByOffset( 256 );
  gmt.resetCharByOffset( 256, 0x0000ff ); // font blue
``` 
>###refresh ( deprecated )

parameters : void [, Array vram ]
<br>@return void

```javascript
  gmt.refresh(  );
  gmt.refresh( vram  );
```

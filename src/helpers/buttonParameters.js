import { PixelRatio } from "react-native"

export const dynamicButtonParameters = (screenWidth, screenHeight) => 
{
	var shiftFactorX = 30;
	var shiftFactorY = 0; 

    if ( screenWidth < 395 )
        {
            shiftFactorX = 115;
        } else if ( screenWidth < 413)
                {
                    shiftFactorX = 115; 
                }
    
    if ( screenHeight < 685)
    {
        shiftFactorY = 5;
    } else if (screenHeight < 760)                
            {
                shiftFactorY = 50;
            } else if (screenHeight < 861)
                    {
                        shiftFactorY = 70;
                    } else if (screenHeight < 915)
                            {
                                shiftFactorY = 72;
                            }
    
    var x_loc = (screenWidth-shiftFactorX)/2;
    var y_loc = (screenHeight+shiftFactorY)/2;

	return {
		x_loc: x_loc,
		y_loc: y_loc
	}
}
export const dynamicSpiralParameters = (screenWidth, screenHeight) => 
{
	var shiftFactorX = 30;
	var shiftFactorY = 0; 
  	var radius = 9;
	var angle = 0;
	var lineWidth = 13;


	if(screenWidth < 361)
	{
		radius = 8;
		lineWidth = 11;
		shiftFactorX = 35
	} else if (screenWidth < 380)
			{
				radius = 8.5;
				lineWidth = 12;
				shiftFactorX = 33;
			} else if (screenWidth < 400)
				{
					radius = 9;
					lineWidth = 13;
					shiftFactorX = 37
				} else 
					{
						radius = 10;
						lineWidth = 15;
						shiftFactorX = 40;
					}
	
	if ( screenHeight < 641 )
	{
		shiftFactorY = 52;	
	} else if ( screenHeight < 730)
			{
				shiftFactorY = 65;
			} else if ( screenHeight < 799)
			{
				shiftFactorY = 38;
			} else if ( screenHeight < 861)
					{
						shiftFactorY = -45;
					}


		

	var x_loc = (screenWidth+shiftFactorX)/2;
	var y_loc = (screenHeight-shiftFactorY)/2;	

	return {
		radius: radius,
		angle: angle,
		lineWidth: lineWidth,
		x_loc: x_loc,
		y_loc: y_loc
	}
}
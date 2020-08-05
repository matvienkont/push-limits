export default timeConverter = (duration ) =>
{
    var minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    
    if(minutes == 0)
    {
        return hours + "h";
    } else if (hours == 0)
            {
                return minutes + "m";
            } else 
                {
                    return hours + "h " + minutes + "m";
                }
}
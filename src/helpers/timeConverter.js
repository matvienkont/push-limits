export default timeConverter = (duration ) =>
{
    var seconds = Math.floor((duration / (1000)) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    var time = "";
    
    if (!hours && !minutes && !seconds)
    {
        return;
    }

    if (!hours && !minutes)
    {
        return time += seconds + "s";
    }

    if(hours)
    {
        time += hours + "h";
        if(minutes)
        {
            time += " " + minutes + "m";
        }
    } 
    
    if (minutes && !hours && seconds)
    {
        time += minutes + "m" + " " + seconds + "s" ;
    } else if (minutes && !seconds)
            {
                time += minutes + "m"
            }
    
    return time;
}
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
        return time += " " + seconds + "s";
    }

    if(hours != 0)
    {
        time += hours + "h";
    } 
    
    if (minutes != 0)
    {
        time += " " + minutes + "m";
    }
    
    return time;
}
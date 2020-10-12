export const inputValidation = (inputText) => 
{
    const regex = /(^[^\s]+).*[a-zA-Z\u0400-\u04FF]{1,}/g;

    var result = regex.test(inputText);
    return result;
}
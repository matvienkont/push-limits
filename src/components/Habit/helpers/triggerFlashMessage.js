import { showMessage } from 'react-native-flash-message';

export const triggerFlashMessage = () => 
{
    const emoji = String.fromCodePoint("0x1F4AA"); 
    const habitGained = `My genuine congratulations !
    Willpower is with you ! ${emoji+emoji}`

            showMessage({
                message: habitGained,
                titleStyle: { textAlign: "center" },
                type: "success",
                animationDuration: 1000,
                duration: 2000
            }); 
}
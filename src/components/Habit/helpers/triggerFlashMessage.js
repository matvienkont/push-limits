import { showMessage } from 'react-native-flash-message';

export const triggetFlashMessage = () => 
{
    const habitGained = `My genuine congratulations !
    Willpower is with you.`

            showMessage({
                message: habitGained,
                titleStyle: { textAlign: "center" },
                type: "success",
                animationDuration: 1000,
                duration: 2000
            }); 
}
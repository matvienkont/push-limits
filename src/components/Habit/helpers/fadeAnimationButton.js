export const fadeAnimationButton = (Animated, fadeAnim) =>
{
    Animated.timing(
        fadeAnim,
        { 
            toValue: 1,
            duration: 1500,
            useNativeDriver: true 
        }
        ).start();
}
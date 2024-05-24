
class Utils {
    static getDomain(url) {
        try {
            const parsedUrl = new URL(url);
            return parsedUrl.hostname;
        } catch (error) {
            console.error("Invalid URL: ", error);
            return null;
        }
    }
}

function getRandomCharacter(characters) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
}


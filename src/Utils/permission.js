export function checkLevel(user, level) {
    if(user?.level) {
        return user?.level === level
    }
}
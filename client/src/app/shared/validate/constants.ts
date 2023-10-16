export const RegularExpression = {
    Password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    Email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    PhoneNumber: /^[(]\d{3}[)] (\d{3})[-](\d{4})$/g,
    OnlyAlphabets: /^[aA-zZ]+$/,
    AddressPattern: /^[a-zA-Z0-9 .]+$/,
    ZipPattern: /^\d{5}$/g,
}
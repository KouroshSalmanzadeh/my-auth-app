
export default function HandleLogout() {

    localStorage.removeItem('user');
    document.cookie = 'user=; Max-Age=0; path=/';
    document.cookie = 'justLoggedIn=; Max-Age=0; path=/';

}


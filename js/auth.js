import { auth } from "./firebase.js";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";

document.getElementById('loginForm')?.addEventListener(
    'submit', async (e) => {
        e.preventDefault()
        const email = document.getElementById('userEmail').value
        const password = document.getElementById('userPassword').value

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            window.location.href = 'inventory.html'
        } catch (error) {
            alert('Error during login ' + error.message)
        }
    }
)


document.getElementById('registerForm')?.addEventListener(
    'submit', async (e) => {
        e.preventDefault()
        const email = document.getElementById('registerEmail').value
        const password = document.getElementById('registerPassword').value

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            alert('Usuario registrado')
            window.location.href = 'index.html'
        } catch (error) {
            alert('Error during login ' + error.message)
        }
    }
)

document.getElementById('logoutButton')?.addEventListener(
    'click', async () => {
        try {
            const userSignout = await signOut(auth)
            window.location.href = 'index.html'
        } catch (error) {
            alert('Error al cerrar sesión ' + error.message)
        }
    }
)
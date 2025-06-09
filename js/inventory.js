import { db } from "./firebase.js"
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js"

const productTable = document.getElementById('productTable')
const addProductForm = document.getElementById('productForm')

const products = collection(db, 'products')

const loadProducts = async () => {
    productTable.innerHTML = ''
    const allProducts = await getDocs(products)
    allProducts.forEach((item) => {
        const product = item.data()
        const row = document.createElement('tr')
        row.innerHTML = `
        <td> ${product.name} </td>
        <td> ${product.stock} </td>
        <td>
            <button data-id="${item.id}">
                <i class="fa-solid fa-pen"></i>
            </button>
            <button data-id="${item.id}">
                <i class="fa-solid fa-trash"></i>
            </button>
        </td>
        `

        productTable.appendChild(row)
    })
}

addProductForm?.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = document.getElementById('productName').value
    const stock = document.getElementById('productStock').value

    try {
        const doc = await addDoc(products, { name, stock })
        alert('Producto agregado con éxito')
        addProductForm.reset()
    } catch (error) {
        alert('Error al agregar el producto ' + error.message)
    }
})

loadProducts()

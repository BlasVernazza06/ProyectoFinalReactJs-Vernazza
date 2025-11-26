import { createContext, useState } from "react"

export const miContexto = createContext();

const Provider = miContexto.Provider

function ProductoProvider({children}) {
    const [cantProd, setCantProd] = useState(0)
    const [carrito, setCarrito] = useState([])


    function addProducts(nuevaCantidad, producto) {

        //carrito.push()
        //const carrito_copia = carrito
        //carrito_copia.push()

        //const carrito_copia = carrito.slice(0)
        //const carrito_copia = carrito.map(item => item)
        //const carrito_copia = [...carrito, producto]
        const carrito_copia = [...carrito]
        carrito_copia.push(producto)

        const nuevasUnidades = cantProd + nuevaCantidad

        setCantProd(nuevasUnidades)
        setCarrito(carrito_copia)
    }

    function resetCart() {
        setCantProd(0)
        setCarrito([])
    }

    const elValorDelContexto = {
        cant_productos: cantProd,
        addProducts: addProducts,
        resetCart: resetCart,
    }

    return (
        <Provider value={elValorDelContexto}>
            {children}
        </Provider>
    )
}

export default ProductoProvider
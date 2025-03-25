import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000"
    const [token,setToken] = useState("");
    const [food_list,setFoodList] = useState([])
    const [menu, setMenu] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const getTotalCartAmount = async () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const items = await axios.get(url+"/api/menu/getItem",{params:{itemId:item}});
                const itemInfo = items.data.data;
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }
    

    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData);
    }

    const fetchMenuList = async () => {
        const response = await axios.get(url+"/api/menu/listMenu");
        setMenu(response.data.data)
    }

    const bookTableForUser = async (formData) => {
        try {
            const response = await axios.post(url+"/api/book/bookTable",{formData},{headers:{token}});
            console.log("store context :: ", response.data);
            navigate("/BookSuccess");
        } catch (error) {
            alert(error.response.data.message ? error.response.data.message : "Error while reservation");
        }
    }

    const bookEventForUser = async (formData) => {
        try{
            const response = await axios.post(url+"/api/book/bookEvent",{formData},{headers:{token}});
            console.log("Event response :: ",response.data);
            navigate("/EventSuccess");
        } catch (e){
            console.log(e);
            alert("Error while booking event",e);
        }
    }

    useEffect(()=>{
        async function loadData() {
            await fetchFoodList();
            await fetchMenuList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        menu,
        totalAmount,
        setTotalAmount,
        bookTableForUser,
        bookEventForUser
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;

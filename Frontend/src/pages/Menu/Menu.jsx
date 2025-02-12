import { useContext} from "react";
import { StoreContext } from '../../context/StoreContext'
import './Menu.css';
import { assets } from "../../assets/assets";

const Menu = () => {
    const {menu, cartItems,addToCart,removeFromCart} = useContext(StoreContext)


    return (
        <div className="menu">
            <h1 className="menuHeader">Our Menu</h1>
            <div className="menu-container">
                {menu.map((item) => (
                    <div key={item._id} className="menu-item">
                        <img src={`/assets/${item.image}.png`} alt={item.name} />
                        <h3>{item.name}</h3>
                        <p className="menuDescription">{item.description}</p>
                        <p><strong>Price: </strong>${item.price}</p>
                        <div className="cart-actions">
                            {!cartItems[item._id] ? (
                                <img
                                    className="add-to-cart"
                                    src={assets.add_icon_white}
                                    alt="Add to Cart"
                                    onClick={() => addToCart(item._id)}
                                />
                            ) : (
                                <div>
                                    <img
                                        src={assets.remove_icon_red}
                                        alt="Remove"
                                        onClick={() => removeFromCart(item._id)}
                                    />
                                    <p>{cartItems[item._id]}</p>
                                    <img
                                        src={assets.add_icon_green}
                                        alt="Add"
                                        onClick={() => addToCart(item._id)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;

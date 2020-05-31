import { createMarkup, createNewsMarkup } from '../pages/page.js';
import { bookets, buskets, news } from '../../data.js';
import { addToCart } from '../cart/cart.js';
import { openOrder } from '../modal/cartModal.js';
import { openItemModal } from '../modal/itemCart.js';

const header = () => {
    const navigationList = document.querySelector('.navigationList'); //ul
    const userProfile = document.querySelector('.userProfile');//div
    const listItems = document.querySelector('.listItems'); //ul
    const cartForModal = document.querySelector('.cartForModal');

    const userName = document.querySelector('.userName'); //span
    listItems.innerHTML = createMarkup(bookets);


    const setActiveLink = (event) => {
        if (event.target.nodeName === "A") {
            const currentActiveLink = navigationList.querySelector('.activeNavLink');
            currentActiveLink && currentActiveLink.classList.remove('activeNavLink');
            event.target.classList.add('activeNavLink');
            listItems.innerHTML = createMarkup(bookets);
        }

        switch (event.target.dataset.page) {
            case 'bookets':
                listItems.innerHTML = createMarkup(bookets);
                break;
            case 'buskets':
                listItems.innerHTML = createMarkup(buskets);
                break;
            case 'news':
                listItems.innerHTML = createNewsMarkup(news);
                break;

            default:
                break;
        }
    }

    const setActiveUser = () => {
        userProfile.classList.toggle('activeProfile');
        (userName.textContent !== 'Yliua') ? userName.textContent = 'Yliua' : userName.textContent = 'Guest';
    }



    const addProduct = (event) => {
        const category = event.target.dataset.category;
        const id = event.target.dataset.id;
        if (category) {
            if (category === 'bookets') {
                for (const item of bookets) {
                    if (item.id === id) {
                        addToCart(item)
                    }
                }
            }
            if (category === 'buskets') {
                for (const item of buskets) {
                    if (item.id === id) {
                        addToCart(item)
                    }
                }
            }
        } else {
            const element = event.target.closest('[data-licategory]');
            console.log(element)
             const liCategory = element.dataset.licategory;
            const liid = element.dataset.liid;
            console.log(liCategory, liid)


            if (liCategory === 'bookets') {
                for (const item of bookets) {
                    if (item.id === liid) {
                        openItemModal(item)
                    }
                }
            }
            if (liCategory === 'buskets') {
                for (const item of buskets) {
                    if (item.id === liid) {
                        openItemModal(item)
                    }
                }
            }
        }




    }

    navigationList.addEventListener('click', setActiveLink); //ul
    userProfile.addEventListener('click', setActiveUser); //div
    cartForModal.addEventListener('click', openOrder);
    listItems.addEventListener('click', addProduct);
}


export default header;
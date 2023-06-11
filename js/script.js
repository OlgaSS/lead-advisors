// Интерактивный обратный отсчет от даты
const startСounter = () => {
    const days = document.querySelector('.counter__num_days');
    const hours = document.querySelector('.counter__num_hours');
    const minutes = document.querySelector('.counter__num_minutes');
    const seconds = document.querySelector('.counter__num_seconds');
    const endDate = new Date("Jul 24, 2023 12:00:00").getTime();

    const timer = setInterval(function () {
        let currentDate = new Date().getTime();
        let currentTime = endDate - currentDate;

        if (currentTime >= 0) {
            days.textContent = Math.floor(currentTime / (1000 * 60 * 60 * 24));
            hours.textContent = ("0" + Math.floor((currentTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).slice(-2);
            minutes.textContent = ("0" + Math.floor((currentTime % (1000 * 60 * 60)) / (1000 * 60))).slice(-2);
            seconds.textContent = ("0" + Math.floor((currentTime % (1000 * 60)) / 1000)).slice(-2);
        }

    }, 1000);
}
startСounter();


// Анимация появления элементов на странице
const showElement = () => {
    const animElements = document.querySelectorAll('.animation');

    window.addEventListener('load', () => {
        setTimeout(() => {
            if (animElements.length > 0) {
                for (let i = 0; i < animElements.length; i++) {
                    animElements[i].classList.add('show');
                }
            }
        }, 0);
    })
}
showElement();


// Плавный скролл к секции по нажатию кнопки “Other events”
const scrollToLink = () => {
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    for (let link of smoothLinks) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const id = link.getAttribute('href');

            document.querySelector(id).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    };
}
scrollToLink();


// Анимацию аккордеона
const openAccordion = (activeItem = 0) => {
    const items = document.querySelectorAll('.accordion__item');
    items[activeItem].classList.add('active');

    for (const item of items) {
        item.addEventListener('click', () => {
            items.forEach((item) => {
                item.classList.remove('active');
            })
            item.classList.add('active');
        })
    }
}
openAccordion();


// Free fake API
const API_URL = 'http://jsonplaceholder.typicode.com/posts';
// Отправку данных
const getSubscription = () => {
    const form = document.querySelector('.form-notify');
    const validEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    function showError(text) {
        setTimeout(() => {
            const message = document.createElement('span');
            message.className = "error";
            message.innerHTML = `<div class="error__text">${text}</div>`;
            form.before(message);
        }, 300);
    }

    function removeError() {
        const message = document.querySelector('.main-footer__form-block .error');
        if (message) {
            message.remove();
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        removeError();

        const email = form.querySelector('.form-notify__input').value;

        if (email == '') {
            showError('Enter your Email!')
        } else if (!validEmail.test(email)) {
            showError('Enter the correct Email!')
        } else {
            const newPost = {
                email: email
            };
            form.reset();
            sendEmail(newPost)
        }
    })
}
getSubscription();

const sendEmail = (data) => {
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then((response) => {
        if (response.ok) {
            console.log(data);
            renderModal('SUCCESS', 'You have successfully subscribed to the email newsletter');
            return response.json()
        }
        return response.json().then(error => {
            renderModal('FAILURE', 'Sorry, something went wrong, try again later');
            console.log(error);
        })
    })
}

// Popup с сообщением об успехе или ошибке передачи данных.
const renderModal = (title, text) => {
    const body = document.querySelector('body');

    const modal = document.createElement('div');
    modal.classList = 'modal';

    modal.innerHTML = `
        <div class="modal__body">
            <h4 class="modal__title">${title}!</h4>
            <p class="modal__text">${text}</p>
            <button class="modal__button button">Close</button>
            <button class="modal__close-modal">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1_773)">
                        <path
                            d="M13.6711 12.8072L24.0706 2.40765C24.4368 2.04151 24.4368 1.44789 24.0706 1.08179C23.7045 0.715702 23.1109 0.715655 22.7448 1.08179L12.3452 11.4814L1.94568 1.08179C1.57954 0.715655 0.985913 0.715655 0.61982 1.08179C0.253727 1.44794 0.25368 2.04156 0.61982 2.40765L11.0193 12.8072L0.61982 23.2068C0.25368 23.5729 0.25368 24.1665 0.61982 24.5326C0.802866 24.7157 1.04282 24.8072 1.28277 24.8072C1.52272 24.8072 1.76263 24.7157 1.94572 24.5326L12.3452 14.1331L22.7447 24.5326C22.9278 24.7157 23.1677 24.8072 23.4077 24.8072C23.6476 24.8072 23.8875 24.7157 24.0706 24.5326C24.4368 24.1665 24.4368 23.5729 24.0706 23.2068L13.6711 12.8072Z"
                            fill="#135978" fill-opacity="0.5" />
                    </g>
                    <defs>
                        <clipPath id="clip0_1_773">
                            <rect width="24" height="24" fill="white" transform="translate(0.345703 0.806458)" />
                        </clipPath>
                    </defs>
                </svg>
            </button>
        </div>
    `;

    body.style.overflow = 'hidden';
    body.insertAdjacentElement('afterbegin', modal);

    modal.addEventListener('click', (e) => {
        if (e.target.closest('.modal__button') || e.target.closest('.modal__close-modal')) {
            modal.remove();
            body.style.overflow = 'auto';
        }
    })
}







import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');
const modalContainer = document.querySelector('.lightbox');
const modalImg = document.querySelector('.lightbox__image');
const closeButton = document.querySelector('[data-action="close-lightbox"]');
const overlay = document.querySelector('.lightbox__overlay');

galleryContainer.innerHTML = createGalleryMarkup(galleryItems);

galleryContainer.addEventListener('click', onGalleryItemClick);
closeButton.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', onKeyPress);

function createGalleryMarkup(galleryItems) {
    return galleryItems
        .map(({ preview, original, description }) => {
            return `<li class="gallery__item">
                    <a class="gallery__link" href="${original}">
                        <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/>
                    </a>
                </li>`;
        })
        .join('');
}

function onGalleryItemClick(event) {
    event.preventDefault();
    if (!event.target.classList.contains('gallery__image')) return;

    modalContainer.classList.add('is-open');
    modalImg.src = event.target.dataset.source;
    modalImg.alt = event.target.alt;
}

function closeModal() {
    modalContainer.classList.remove('is-open');
    modalImg.src = '';
    modalImg.alt = '';
}

function onKeyPress(event) {
    if (event.key === 'Escape') {
        closeModal();
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        onArrowPress(event);
    }
}

const turnRight = currentIndex => {
    if (currentIndex === galleryItems.length - 1) 
        return;
    const nextImg = galleryItems[currentIndex + 1].original;
    modalImg.setAttribute('src', nextImg);
};

const turnLeft = currentIndex => {
    if (currentIndex === 0) 
        return;
    const previousImg = galleryItems[currentIndex - 1].original;
    modalImg.setAttribute('src', previousImg);
};

function onArrowPress(event) {
    if (modalContainer.classList.contains('is-open')) {
        const currentImg = modalImg.getAttribute('src');
        const currentIndex = galleryItems.indexOf(
            galleryItems.find(item => item.original === currentImg)
        );
        if (event.code === 'ArrowRight') 
            turnRight(currentIndex);
        if (event.code === 'ArrowLeft') 
            turnLeft(currentIndex);
    }
}
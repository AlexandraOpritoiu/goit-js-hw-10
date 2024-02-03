import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorElement = document.querySelector('.error');

document.addEventListener("DOMContentLoaded", () => {
    fetchBreeds()
        .then(breeds => {
            loader.style.display = 'none';
            breedSelect.style.display = 'block';
            errorElement.style.display = 'none';
    
            breeds.forEach(breed => {
                const option = document.createElement("option");
                option.value = breed.id;
                option.text = breed.name;
                breedSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Failed to load cat breeds", error);
            loader.style.display = 'none';
            errorElement.style.display = 'block';
        });
});

breedSelect.addEventListener('change', function () {
    const breedId = breedSelect.value;

    loader.style.display = 'block';
    catInfo.style.display = 'none';
    errorElement.style.display = 'none';

    fetchCatByBreed(breedId)
        .then(catData => {
            console.log(catData);
    
            catInfo.innerHTML =
    `
    <img src="${catData[0].url}" alt="Cat image">
    <p>Breed: ${catData[0].breeds[0].name}</p>
    <p>Description: ${catData[0].breeds[0].description}</p>
    <p>Temperament:${catData[0].breeds[0].temperament}</p>
    
    
    `;
            
    catInfo.style.display = 'block';
    loader.style.display = 'none';
        })
        .catch(error => {
            console.error("Failed to load cat info", error);
            loader.style.display = 'none';
            errorElement.style.display = 'block';
        });
});
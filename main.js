import axios from 'axios';
import 'babel-polyfill';
import { async } from 'q';

const msg = document.querySelector('.msg');
const searchForm = document.querySelector('#search-form');

const gifs = document.querySelector('#gifs');
searchForm.addEventListener('submit', onSubmit);

const Url = `https://api.giphy.com/v1/gifs/search`;

function onSubmit(e) {
  gifs.innerHTML = '';
  e.preventDefault();

  const searchInput = document.querySelector('#search').value;
  const limitInput = document.querySelector('#limit').value;
  const offsetInput = document.querySelector('#offset').value;
  const ratingInput = document.querySelector('#rating').value;
  const langInput = document.querySelector('#lang').value;

  const getRes = async () => {
    try {
      const res = await axios.get(Url, {
        params: {
          api_key: 'pUF6te6M9tReKcQiE5FWsxVQcXaUyMBq',
          q: searchInput,
          limit: limitInput,
          offset: offsetInput,
          rating: ratingInput,
          lang: langInput,
        },
      });

      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  if (
    searchInput === '' ||
    limitInput === '' ||
    offsetInput === '' ||
    ratingInput === '' ||
    langInput === ''
  ) {
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all values.';
    setTimeout(() => msg.remove(), 2000);
  } else {
    const createLi = (item) => {
      const li = document.createElement('row');
      // li.appendChild(document.createTextNode(item.title));
      console.log(item);

      li.innerHTML = `<a target="_blank" href=${item.url}><img src=${item.images.original.url} width=${item.images.preview.width} height=${item.images.preview.height} /></a>`;

      return li;
    };

    const addGifToDOM = (items) => {
      if (Array.isArray(items.data) && items.data.length > 0) {
        items.data.map((item) => {
          gifs.appendChild(createLi(item));
        });
      } else if (items) {
        gifs.appendChild(createLi(items));
      }
    };

    const main = async () => {
      const spinner = document.createElement('row');
      spinner.innerHTML =
        '<img id="toRemove" src="https://media3.giphy.com/media/3og0ID5AW1SmPuG3u0/giphy.gif?cid=20d5be1c1a759e52bc760f11634a6474d19d2c5cf51642b1&amp;rid=giphy.gif" width="450" height="450"></img>';
      gifs.appendChild(spinner);

      addGifToDOM(await getRes());

      gifs.removeChild(gifs.firstChild);
      const info = document.createElement('div');
      info.innerHTML = '<small>Click on a GIF to see it on giphy.com!</small>';
      gifs.insertBefore(info, gifs.firstChild);
    };
    main();
  }
}

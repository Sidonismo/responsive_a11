const sd = document.createElement('script');
let it = 0;
sd.setAttribute('type', 'application/ld+json');
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  console.log(window.location.pathname);
  
/*   fetch("https://antikvariat.textrix.cz/api/home", requestOptions)
  .then(r => r.text())
  .then(textData => {
    sd.textContent = textData;
    document.head.appendChild(sd);
  }); */
  sd.textContent = `{ 
    "@context": "https://schema.org",
    "@type": "ItemList",
    "url": "https://sidonismo.github.io/responsive_a11/index2.html",
    "numberOfItems": 5842,
    "itemListElement": [` 

  fetch("https://antikvariat.textrix.cz/api/home", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result);
    result.list.forEach(element => {
      const kat = [];
      const oid = element.oid;
      const itid = element.itid;
      let title = '';
      let title2 = '';
      let autor = '';
      let rok = 0;
      let stran = '';
      let cena = 0;
      const fieldsLength = element.fields.length;
      let field = {}
      const url = element.url;


      for (let i = 0; i < fieldsLength; i++) {
        field = element.fields[i];
        if (field.label === 'Název') {
          title = field.val;
        }
        if (field.label === 'Další název') {
          title2 = field.val;
        }
        if (field.label === 'Autor') {
          autor = field.val;
        }
        if (field.label === 'Rok vydání') {
          rok = field.val;
        }
        if (field.label === 'Počet stran') {
          stran = field.val;
        }
        if (field.label === 'Kategorie') {
          kat.push(field.val);
        }
        if (field.tag === "price") {
          cena = field.val;
        }
      }
      sd.textContent += `{
                "@type": "Book",
                "position": ${it+1},
                "image": ["https://antikvariat.textrix.cz/assets/cache/${oid}-tn.png", "https://antikvariat.textrix.cz/img/${oid}.jpg"],
                "url": "https://antikvariat11.cz${url}",
                "name": "${title}",
                "alternativeHeadline" : "${title2}",
                "offers": {
                    "@type": "Offer",
                    "price": ${cena},
                    "priceCurrency": "CZK",
                    "itemCondition": "https://schema.org/UsedCondition",
                    "availability": "https://schema.org/InStock"
                },
                "genre": "${kat.toString()}",
                "author": {
                    "@type": "Person",
                    "givenName": "${autor}"
                },
                "numberOfPages": ${stran.match(/^(\d+)/)[0]}
            }`
console.log("it = " ,it);
    if (it === 9){
        sd.textContent += `]
    }`;
    } else {
        sd.textContent += `,`;
    }
            
    it++;
    });
})
.catch(error => console.log('error', error));

    document.head.appendChild(sd);

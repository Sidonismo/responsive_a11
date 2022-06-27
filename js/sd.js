const sd = document.createElement('script');
sd.setAttribute('type', 'application/ld+json');
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  
/*   fetch("https://antikvariat.textrix.cz/api/home", requestOptions)
  .then(r => r.text())
  .then(textData => {
    sd.textContent = textData;
    document.head.appendChild(sd);
  }); */

  fetch("https://antikvariat.textrix.cz/api/home", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result);
    result.list.forEach(element => {
      const kat = [];
      const oid = element.oid;
      const itid = element.itid;
      let title = '';
      let autor = '';
      let rok = 0;
      let stran = '';
      let cena = 0;
      const fieldsLength = element.fields.length;
      let field = {}
      const url = element.url;

      for (let i = 0; i < fieldsLength; i++) {
        field = element.fields[i];
        if (field.dc === 'title') {
          title = field.val;
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
        if (field.label === "Cena") {
          cena = field.val;
        }
      }

    sd.textContent = 
        `{"@context": "https://schema.org",
        "@type": "ItemList",
        "url": "https://sidonismo.github.io/responsive_a11/index2.html",
        "numberOfItems": 5842,
        "itemListElement": [
            {
                "@type": "Book",
                "position": 1,
                "image": ["https://antikvariat.textrix.cz/img/439.jpg", "https://antikvariat.textrix.cz/assets/cache/439-tn.png"],
                "url": "https://sidonismo.github.io/kniha/komensky-jan-amos-veskerych-spisu-jana-amosa-komenskeho-svazek-xvii-1912",
                "name": "Veškerých Spisů Jana Amosa Komenského. Svazek XVII",
                "offers": {
                    "@type": "Offer",
                    "price": "100",
                    "priceCurrency": "CZK",
                    "itemCondition": "https://schema.org/UsedCondition",
                    "availability": "https://schema.org/InStock"
                },
                "genre": "spisy",
                "author": {
                    "@type": "Person",
                    "givenName": "Jan Amos",
                    "familyName": "Komenský"
                },
                "numberOfPages": "534"
            },
            {
                "@type": "Book",
                "position": 2,
                "image": ["https://antikvariat.textrix.cz/img/439.jpg", "https://antikvariat.textrix.cz/assets/cache/439-tn.png"],
                "url": "http://127.0.0.1:5501/kniha/tibetska-kniha-mrtvych-bardo-thodol-vysvobozeni-v-bardu-skrze-naslouchani-1991-80-207-0334-9-vaz",
                "name": "Tibetská kniha mrtvých : Bardo thödol (Vysvobození v bardu skrze naslouchání)",
                "offers": {
                    "@type": "Offer",
                    "price": "200",
                    "priceCurrency": "CZK",
                    "itemCondition": "https://schema.org/UsedCondition",
                    "availability": "https://schema.org/InStock"
                },
                "genre": "náboženství",
                "numberOfPages": "165"
            },
            {
                "@type": "Book",
                "position": 3,
                "image": ["https://antikvariat.textrix.cz/assets/cache/446-tn.png", "https://antikvariat.textrix.cz/img/446.jpg"],
                "url": "http://127.0.0.1:5501/kniha/tibetska-kniha-mrtvych-bardo-thodol-vysvobozeni-v-bardu-skrze-naslouchani-1991-80-207-0334-9-vaz",
                "name": "Conan : hodina draka",
                "offers": {
                    "@type": "Offer",
                    "price": "200",
                    "priceCurrency": "CZK",
                    "itemCondition": "https://schema.org/UsedCondition",
                    "availability": "https://schema.org/InStock"
                },
                "genre": "Fantasy",
                "author": {
                    "@type": "Person",
                    "givenName": "Robert Ervin",
                    "familyName": "Howard"
                },
                "numberOfPages": "229"
            },
            {
                "@type": "Book",
                "position": 4,
                "image": "https://antikvariat.textrix.cz/assets/cache/443-tn.png",
                "url": "http://127.0.0.1:5501/kniha/tibetska-kniha-mrtvych-bardo-thodol-vysvobozeni-v-bardu-skrze-naslouchani-1991-80-207-0334-9-vaz",
                "name": "Živá díla minulosti ; sv. 109",
                "offers": {
                    "@type": "Offer",
                    "price": "200",
                    "priceCurrency": "CZK",
                    "itemCondition": "https://schema.org/UsedCondition",
                    "availability": "https://schema.org/InStock"
                },
                "genre": "náboženství",
                "author": {
                    "@type": "Person",
                    "givenName": "Douglas",
                    "familyName": "Adams"
                },
                "numberOfPages": "598"
            },
            {
                "@type": "Book",
                "position": 5,
                "image": "https://antikvariat.textrix.cz/assets/cache/443-tn.png",
                "url": "http://127.0.0.1:5501/kniha/tibetska-kniha-mrtvych-bardo-thodol-vysvobozeni-v-bardu-skrze-naslouchani-1991-80-207-0334-9-vaz",
                "name": "Živá díla minulosti ; sv. 109",
                "offers": {
                    "@type": "Offer",
                    "price": "200",
                    "priceCurrency": "CZK",
                    "itemCondition": "https://schema.org/UsedCondition",
                    "availability": "https://schema.org/InStock"
                },
                "genre": "náboženství",
                "author": {
                    "@type": "Person",
                    "givenName": "Douglas",
                    "familyName": "Adams"
                },
                "numberOfPages": "598"
            },
            {
                "@type": "Book",
                "position": 6,
                "image": "https://antikvariat.textrix.cz/assets/cache/443-tn.png",
                "url": "http://127.0.0.1:5501/kniha/tibetska-kniha-mrtvych-bardo-thodol-vysvobozeni-v-bardu-skrze-naslouchani-1991-80-207-0334-9-vaz",
                "name": "Živá díla minulosti ; sv. 109",
                "offers": {
                    "@type": "Offer",
                    "price": "200",
                    "priceCurrency": "CZK",
                    "itemCondition": "https://schema.org/UsedCondition",
                    "availability": "https://schema.org/InStock"
                },
                "genre": "náboženství",
                "author": {
                    "@type": "Person",
                    "givenName": "Douglas",
                    "familyName": "Adams"
                },
                "numberOfPages": "598"
            },
            {
                "@type": "Book",
                "position": 7,
                "image": "https://antikvariat.textrix.cz/assets/cache/443-tn.png",
                "url": "http://127.0.0.1:5501/kniha/tibetska-kniha-mrtvych-bardo-thodol-vysvobozeni-v-bardu-skrze-naslouchani-1991-80-207-0334-9-vaz",
                "name": "Živá díla minulosti ; sv. 109",
                "offers": {
                    "@type": "Offer",
                    "price": "200",
                    "priceCurrency": "CZK",
                    "itemCondition": "https://schema.org/UsedCondition",
                    "availability": "https://schema.org/InStock"
                },
                "genre": "náboženství",
                "author": {
                    "@type": "Person",
                    "givenName": "Douglas",
                    "familyName": "Adams"
                },
                "numberOfPages": "598"
            },
            {
                "@type": "Book",
                "position": 8,
                "image": "https://antikvariat.textrix.cz/assets/cache/443-tn.png",
                "url": "http://127.0.0.1:5501/kniha/tibetska-kniha-mrtvych-bardo-thodol-vysvobozeni-v-bardu-skrze-naslouchani-1991-80-207-0334-9-vaz",
                "name": "Živá díla minulosti ; sv. 109",
                "offers": {
                    "@type": "Offer",
                    "price": "200",
                    "priceCurrency": "CZK",
                    "itemCondition": "https://schema.org/UsedCondition",
                    "availability": "https://schema.org/InStock"
                },
                "genre": "náboženství",
                "author": {
                    "@type": "Person",
                    "givenName": "Douglas",
                    "familyName": "Adams"
                },
                "numberOfPages": "598"
            },
            {
                "@type": "Book",
                "position": 9,
                "image": "https://antikvariat.textrix.cz/assets/cache/443-tn.png",
                "url": "http://127.0.0.1:5501/kniha/tibetska-kniha-mrtvych-bardo-thodol-vysvobozeni-v-bardu-skrze-naslouchani-1991-80-207-0334-9-vaz",
                "name": "Živá díla minulosti ; sv. 109",
                "offers": {
                    "@type": "Offer",
                    "price": "200",
                    "priceCurrency": "CZK",
                    "itemCondition": "https://schema.org/UsedCondition",
                    "availability": "https://schema.org/InStock"
                },
                "genre": "náboženství",
                "author": {
                    "@type": "Person",
                    "givenName": "Douglas",
                    "familyName": "Adams"
                },
                "numberOfPages": "598"
            },
            {
                "@type": "Book",
                "position": 10,
                "image": "https://antikvariat.textrix.cz/assets/cache/443-tn.png",
                "url": "http://127.0.0.1:5501/kniha/tibetska-kniha-mrtvych-bardo-thodol-vysvobozeni-v-bardu-skrze-naslouchani-1991-80-207-0334-9-vaz",
                "name": "Živá díla minulosti ; sv. 109",
                "offers": {
                    "@type": "Offer",
                    "price": "200",
                    "priceCurrency": "CZK",
                    "itemCondition": "https://schema.org/UsedCondition",
                    "availability": "https://schema.org/InStock"
                },
                "genre": "náboženství",
                "author": {
                    "@type": "Person",
                    "givenName": "Douglas",
                    "familyName": "Adams"
                },
                "numberOfPages": "598"
            }
        ]
    }`;
    document.head.appendChild(sd);
    });
})
.catch(error => console.log('error', error));

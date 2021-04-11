/* eslint-disable camelcase */
/* eslint-disable no-undef */
'user strict';

let keywordsArray = [];
let hornsArray = [];
let allArray =[];
let page1Button = false;
let page2Button = false;

$.ajax('./data/page-1.json').then(unicornArray => {
  // console.log(unicornArray);
  unicornArray.forEach(unicornData => {
    // console.log(unicornData);
    let newUnicorn = new Unicorn(unicornData);
    newUnicorn.templateUnicorn();
    if (!keywordsArray.includes(unicornData.keyword)) {
      keywordsArray.push(unicornData.keyword);
    }
    if (!hornsArray.includes(unicornData.horns)) {
      hornsArray.push(unicornData.horns);
    }
    // console.log(newUnicorn);
    // console.log(newUnicorn.description);
  });
  // $('.displayedImage').first().remove();
  // renderKeywordsOptions();
  // renderHornsOptions();

});


$.ajax('./data/page-2.json').then(unicornArray2 => {
  // console.log(unicornArray);
  unicornArray2.forEach(unicornData => {
    // console.log(unicornData);
    let newUnicorn = new Unicorn(unicornData);
    newUnicorn.templateUnicorn();
    if (!keywordsArray.includes(unicornData.keyword)) {
      keywordsArray.push(unicornData.keyword);
    }
    if (!hornsArray.includes(unicornData.horns)) {
      hornsArray.push(unicornData.horns);
    }
  });
  $('.displayedImage').first().hide();
  renderKeywordsOptions();
  renderHornsOptions();
});
// console.log(keywordsArray);
// console.log(hornsArray);

function Unicorn(uniData) {

  this.image_url = uniData.image_url;
  this.title = uniData.title;
  this.description = uniData.description;
  this.keyword = uniData.keyword;
  this.horns = uniData.horns;
  this.page = uniData.page;
  Unicorn.allUnicorn.push(this);
  allArray.push(this);

}

Unicorn.allUnicorn = [];

// Unicorn.prototype.renderData = function () {
//   let divClone = $('.displayedImage').first().clone();
//   divClone.find('h2').text(this.title);
//   divClone.attr('class', `${this.keyword} ${this.horns} firstPage`);
//   divClone.find('img').attr('src', `${this.image_url}`);
//   divClone.find('p').text(this.description);
//   $('main').append(divClone);
// };

// Unicorn.prototype.renderData2 = function () {
//   let divClone = $('.displayedImage').first().clone();
//   divClone.find('h2').text(this.title);
//   divClone.attr('class', `${this.keyword} ${this.horns} secondPage`);
//   divClone.find('img').attr('src', `${this.image_url}`);
//   divClone.find('p').text(this.description);
//   $('main').append(divClone);
// };

// mustache.js protoptype
Unicorn.prototype.templateUnicorn =function()
{
  let template = $('#unicornTemplate').html();
  let newDev =  Mustache.render( template, this );
  $('main').append( newDev );
};


const renderKeywordsOptions = () => {
  keywordsArray.forEach(keyword => {
    let optionClone = $('option').first().clone();
    optionClone.html(keyword);
    optionClone.attr('value', keyword);
    $('.keywords').append(optionClone);
    // console.log(keyword);
  });
  // console.log(keywordsArray);
};

const renderHornsOptions = () => {
  hornsArray.forEach(horn => {
    let optionClone = $('option').first().clone();
    optionClone.html(horn);
    optionClone.attr('value', horn);
    $('.horns').append(optionClone);
    // console.log(keyword);
  });
  // console.log(keywordsArray);
};

const renderSortedArray = () => {
  $('.displayedImage').show();
  for (let i in allArray){
    let divClone = $('.displayedImage').first().clone();
    divClone.find('h2').text(allArray[i].title);
    divClone.find('img').attr('src', `${allArray[i].image_url}`);
    divClone.find('p').text(allArray[i].description);
    if (allArray[i].page === 'firstPage') {
      divClone.attr('class', `${allArray[i].keyword} ${allArray[i].horns} firstPage`);}
    else {
      divClone.attr('class', `${allArray[i].keyword} ${allArray[i].horns} secondPage`);}
    $('main').append(divClone);
  }
  $('.displayedImage').hide();
  // console.log(keywordsArray);
};

$('.keywords').change(function () {
  let val = $(this).children('option:selected').val();
  if (val !== 'default') {
    $('div').hide();
    if (page1Button === true){
    // console.log(val);
      $(`.${val}.firstPage`).show();}
    else if (page2Button === true) {
      $(`.${val}.secondPage`).show();}
    else {
      $(`.${val}`).show();
    }
  }
  else $('.firstPage, .secondPage').show();
  page1Button = false;
  page2Button = false;
});

$('.horns').change(function () {
  let val = $(this).children('option:selected').val();
  if (val !== 'default') {
    $('div').hide();
    if (page1Button === true){
    // console.log(val);
      $(`.${val}.firstPage`).show();}
    else if (page2Button === true) {
      $(`.${val}.secondPage`).show();}
    else {
      $(`.${val}`).show();
    }
  }
  else $('.firstPage, .secondPage').show();
  page1Button = false;
  page2Button = false;
});

$( '.to-Page-1' ).click(function() {
  page1Button = true;
  page2Button = false;
  $('div').hide();
  $('.firstPage').show();
});

$( '.to-Page-2' ).click(function() {
  page1Button = false;
  page2Button = true;
  $('div').hide();
  $('.secondPage').show();
});

$('.sort').change(function () {
  let val = $(this).children('option:selected').val();
  // console.log(allArray);
  if (val === 'Names') {
    // console.log(allArray);
    allArray.sort( (a,b) => {
      if(a.title< b.title){
        return -1;
      } else if (a.title > b.title) {
        return 1;
      }
      else if (a.title === b.title){
        return 0;
      }
    });
    $('.firstPage, .secondPage').remove();
    renderSortedArray();
  }
  else if (val === 'Horns') {
    // console.log(allArray);
    allArray.sort( (a,b) => {
      if(a.horns< b.horns){
        return -1;
      } else if (a.horns > b.horns) {
        return 1;
      }
      else if (a.horns === b.horns){
        return 0;
      }
    });
    $('.firstPage, .secondPage').remove();
    renderSortedArray();
  }
  // else $('.displayedImage').show();
});


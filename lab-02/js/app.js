/* eslint-disable camelcase */
/* eslint-disable no-undef */
'user strict';
let keywordsArray = [];
let hornsArray = [];
$.ajax('./data/page-1.json').then(unicornArray => {
  // console.log(unicornArray);
  unicornArray.forEach(unicornData => {
    // console.log(unicornData);
    let newUnicorn = new Unicorn(unicornData);
    newUnicorn.renderData();
    if (!keywordsArray.includes(unicornData.keyword)) {
      keywordsArray.push(unicornData.keyword);
    }
    if (!hornsArray.includes(unicornData.horns)) {
      hornsArray.push(unicornData.horns);
    }
    // console.log(newUnicorn);
    // console.log(newUnicorn.description);
  });
  $('.displayedImage').first().remove();
  renderOptions();
});
// console.log(keywordsArray);
// console.log(hornsArray);
function Unicorn(uniData) {
  this.image_url = uniData.image_url;
  this.title = uniData.title;
  this.description = uniData.description;
  this.keyword = uniData.keyword;
  this.horns = uniData.horns;
  Unicorn.allUnicorn.push(this);
}
Unicorn.allUnicorn = [];
Unicorn.prototype.renderData = function () {
  let divClone = $('.displayedImage').first().clone();
  divClone.find('h2').text(this.title);
  divClone.attr('class', `displayedImage ${this.keyword}`);
  divClone.find('img').attr('src', `${this.image_url}`);
  divClone.find('p').text(this.description);
  $('main').append(divClone);
};
const renderOptions = () => {
  keywordsArray.forEach(keyword => {
    let optionClone = $('option').first().clone();
    optionClone.html(keyword);
    optionClone.attr('value', keyword);
    $('select').append(optionClone);
    // console.log(keyword);
  });
  // console.log(keywordsArray);
};
$('select').change(function () {
  let val = $(this).children('option:selected').val();
  if (val !== 'default') {
    $('div').hide();
    // console.log(val);
    $(`.${val}`).show();
  }
  else $('.displayedImage').show();
});


const addResource = document.querySelector('#add-resource');
const modal = document.querySelector('#add-resource-modal');

const addResource1 = document.querySelector('#add-resource1');
const modal1 = document.querySelector('#add-resource-modal1');

addResource.addEventListener('click',()=>{
	modal.classList.toggle('modalshow');
});
const cmodal = document.querySelector('.form-modal');
const closemodal = document.querySelector('#closemodal');
closemodal.addEventListener('click',()=>{
	cmodal.classList.remove('modalshow');
})

const closemodalbtn1 = document.querySelector('#closemodal1');
closemodalbtn1.addEventListener('click',()=>{
	modal1.classList.remove('modalshow');
});
addResource1.addEventListener('click',()=>{
	modal1.classList.toggle('modalshow');
});



const bookmark = document.querySelector('.bookmark');
bookmark.addEventListener('click',() =>{
	document.querySelector('.bookmark').classList.toggle('active');
});

const heart = document.querySelector('.heart');
heart.addEventListener('click',() =>{
	document.querySelector('.heart').classList.toggle('active');
});

const times = document.querySelector('.times');
times.addEventListener('click',() =>{
	document.querySelector('.times').classList.toggle('active');
});
const closemodalbtn = document.querySelector('#closemodalbtn');
closemodalbtn.addEventListener('click',()=>{
	cmodal.classList.remove('modalshow');
});



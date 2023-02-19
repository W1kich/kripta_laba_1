// Я, Бутко Денис Васильович, студент університету.
'use strict';

window.addEventListener('DOMContentLoaded', () =>{
	
	const message ={
		msg: " ",
		shift: 0,
		isDecrypt: " ",
		inc: 0
	}
	const alphabet = "_АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ ,.";
		

	const form = document.querySelector('.form'),
				selectButton = document.querySelectorAll('.box__buttons');
	
function NSD (x, y) {
	if (y > x) return NSD(y, x);
	if (!y) return x;
	return NSD(y, x % y);
}


function mutualSimplicity(a, b){
	
	if(typeof(a) !== 'number' || typeof(b) !== 'number'){
		alert('Ви ввели не число, спробуйте ще раз!!!');
		return 0;
	}else{
		if(NSD(a, b) === 1){
			return 1;
		}else{
			alert('Ви ввели не взаємно простоті числа, спробуйте ще раз!!!');
			return 0;
		}
}
}
function CeasarsCipher(obj){
	let result = "";

	if(obj.shift === 0){
		obj.msg = result;
		return result;
	}else if (obj.isDecrypt === "encrypt"){
		for(let i = 0; i < obj.msg.length; i++){
			for(let j = 0; j < alphabet.length; j++){				
				if(obj.msg[i] === alphabet[j]){
					result += alphabet[(j+obj.shift)%alphabet.length];
				}else{
					continue;
				}
			}
		}
		obj.msg = result;
		return result;
	}else if(obj.isDecrypt === "decrypt"){
		for(let i = 0; i < obj.msg.length; i++){
			for(let j = 0; j < alphabet.length; j++){
				if(obj.msg[i] === alphabet[j]){
					result +=alphabet[(j+alphabet.length - obj.shift)%alphabet.length];
				}else{
					continue;
				}
			
		}
	}
		obj.msg = result;
		return result;
	
	}else{
		return "error";
	}	
}


function modInverse(k, n) {
		for (let i = 1; i < n; i++) {
			if ((k * i) % n === 1)
				return i;
		}
		return 1;
}





 function affineEncrypt(obj) {
		if (typeof(obj.msg) ==="string" && typeof(obj.shift) ==="number" && typeof(obj.inc) ==="number") {
			
			if(mutualSimplicity(obj.shift, alphabet.length) === 0){
				return "";
			}
			let result = "";
			let m = obj.shift;
			let b = obj.inc;			
				for (let i = 0; i < obj.msg.length; i++) {
					for(let j = 0; j < alphabet.length; j++){				
						if(obj.msg[i] === alphabet[j]){
							result += alphabet[((m * j + b)%alphabet.length)];
						}else{
							continue;
						}
					}
				}

				return result;
			
		} else {
			return "error";
		}
	}

	 function affineDecrypt(obj) {
		if (typeof(obj.msg) ==="string" && typeof(obj.shift) ==="number" && typeof(obj.inc) ==="number") {
			
			if(mutualSimplicity(obj.shift, alphabet.length) === 0){
				return "";
			}
			let result = "";
			let m = obj.shift;
			let b = obj.inc;
				for (let i = 0; i < obj.msg.length; i++) {
					for(let j = 0; j < alphabet.length; j++){				
						if(obj.msg[i] === alphabet[j]){
							result += alphabet[((modInverse(m,alphabet.length) * (j + alphabet.length - b)) % alphabet.length)];
						}else{
							continue;
						}
					}
				}
				return result;
			
		} else {
			return "error";
		}
	}



selectButton[0].addEventListener('click', () =>{
	form.innerHTML = '';
	form.innerHTML = `<h3 class="form__text">Введіть повідомлення</h3>
	<input class="input" type="text"  name="fname" value="">
	<h3 class="form__text">Крок шифру k</h3>
	<input class="input" type="text"  name="fname" value="">
	<h3 class="form__text">Шифротекст</h3>
	<input class="input" type="text"  name="fname" value="">
	<div class="box__container box">
	<button class="result__buttons">Зашифрувати</button> <button class="result__buttons">Розшифрувати</button>
	</div>`;
	const  resultButton = form.querySelectorAll('.result__buttons') ,input = document.querySelectorAll(".input");
	
	resultButton[0].addEventListener('click', () =>{
		message.msg = input[0].value.toUpperCase();
		message.shift = Number(input[1].value);
		message.isDecrypt = "encrypt";
		if(message.shift === 0){
			input[2].value = message.msg;
		}else{
			input[2].value = CeasarsCipher(message);
		}
		});
		resultButton[1].addEventListener('click', () =>{
			message.msg = input[2].value;
			message.shift = Number(input[1].value);
			message.isDecrypt = "decrypt";
			
			if(message.shift === 0){
				input[2].value = message.msg;
			}else{
				input[2].value = CeasarsCipher(message);
			}
			});
	});
	
	
	
	selectButton[1].addEventListener('click', () =>{
		form.innerHTML = '';
		form.innerHTML = `<h3 class="form__text">Введіть повідомлення</h3>
		<input class="input" type="text"  name="fname" value="">
		<h3 class="form__text">Крок шифру k</h3>
		<input class="input" type="text"  name="fname" value="">
		<h3 class="form__text">Шифротекст</h3>
		<input class="input" type="text"  name="fname" value="">
		<div class="box__container box">
		<button class="result__buttons">Зашифрувати</button> <button class="result__buttons">Розшифрувати</button>
		</div>`;
		const  resultButton = form.querySelectorAll('.result__buttons') ,input = document.querySelectorAll(".input");		message.inc = 0;
		resultButton[0].addEventListener('click', () =>{
		message.msg = input[0].value.toUpperCase();
		message.shift = Number(input[1].value);
			
			
			if(message.shift === 0){
				input[2].value = "error";
			}else{
				message.isDecrypt = "encrypt";
				input[2].value = affineEncrypt(message);
			}
			});
			resultButton[1].addEventListener('click', () =>{
				message.msg = input[2].value;
				message.shift = Number(input[1].value);
				
				if(message.shift === 0){
					input[2].value = "error";
				}else{
					message.isDecrypt = "decrypt";
					input[2].value = affineDecrypt(message);
				}
				});
		});


		selectButton[2].addEventListener('click', () =>{
		
			form.innerHTML = '';
			form.innerHTML = `<h3 class="form__text">Введіть повідомлення</h3>
			<input class="input" type="text"  name="fname" value="">
			<h3 class="form__text">Крок шифру k</h3>
			<input class="input" type="text"  name="fname" value="">
			<h3 class="form__text">Крок шифру j (для Афінного шифру)</h3>
			<input class="input" type="text"  name="fname" value="">
			<h3 class="form__text">Шифротекст</h3>
			<input class="input" type="text"  name="fname" value="">
			<div class="box__container box">
			<button class="result__buttons">Зашифрувати</button> <button class="result__buttons">Розшифрувати</button>
			</div>`;
			const  resultButton = form.querySelectorAll('.result__buttons') ,input = document.querySelectorAll(".input");		resultButton[0].addEventListener('click', () =>{
		message.msg = input[0].value.toUpperCase();
		message.shift = Number(input[1].value);
		message.inc = Number(input[2].value);
			
			if(message.shift === 0){
				input[3].value = "error";
			}else{
				message.isDecrypt = "encrypt";
				input[3].value = affineEncrypt(message);
			}
			});
			resultButton[1].addEventListener('click', () =>{
				message.msg = input[3].value;
				message.shift = Number(input[1].value);
				message.inc = Number(input[2].value);
				
				if(message.shift === 0){
					input[3].value = "error";
				}else{
					message.isDecrypt = "decrypt";
					input[3].value = affineDecrypt(message);
				}
				});
			});
			
		


	});	
	


let obj = [];
let iObj = {};

const list = document.querySelector('tbody');
const Ttext =document.createElement('div');
const form = document.querySelector('#book-form');
const bText = document.createTextNode("data berhasil ditambahkan");
const fText = document.createTextNode('data gagal ditambahkan')
const dText = document.createTextNode('data berhasil dihapus');
const alert  = document.querySelector('.alert');
const alertT = document.querySelector('.alert span');


// menyimpan item 
function simpan () {
     obj = JSON.parse(localStorage.getItem('bukuku'));
     return obj;
}


// menambahkan item buku
const menambahkan_item = document.querySelector('#book-form').addEventListener('submit' , function add (e) {
     e.preventDefault();

     // akan dibuat element tr setiap user mengkilk submit ,
     const tr = document.createElement('tr');

     // untuk mengambil data setiap user mengkilk submit
     const title = document.querySelector('#title').value;
     const author = document.querySelector('#author').value;
     const isbn = document.querySelector('#isbn').value;
     const price = document.querySelector('#price').value;
     const quantity = document.querySelector('#quantity').value;
     const date = new Date();
     const full = date.toDateString();
     const hour = date.getHours();
     const minute = date.getMinutes();
     const second = date.getSeconds();
     let time = ``;
     

     function times () {
          time = `${full} - ${hour}:${minute}:${second}`;
     };

     times();
     console.log(time);

     if (localStorage.getItem('bukuku') !== null ) {
          obj = JSON.parse(localStorage.getItem('bukuku'));
     };

     
     function isiObj (title , author , isbn , price , quantity , total ) {
          iObj = {
               title : title ,
               author : author,
               isbn : isbn,
               price : price,
               quantity : quantity,
               total : quantity * price,
               waktu : time
          }
          return obj.push(iObj);
     }

          isiObj(title , author , isbn ,price , quantity);
          localStorage.setItem('bukuku' , JSON.stringify(obj));
     
     function tambahKeUi (obj) {
          obj.forEach( (item) => {
               tr.innerHTML = `
               <td>${item.title}</td>
               <td>${item.author}</td>
               <td>${item.isbn}</td>
               <td>Rp ${item.price}</td>
               <td>${item.quantity}</td>
               <td>Rp ${item.total}</td>
               <td class="delete">X</a></td>
               `;
          });
          list.appendChild(tr);
     };


     if (title === '' || author === '' || isbn ==='' || price === '' || quantity === '') {
          alert.classList.add('aktif');
          alertT.appendChild(fText);


          setTimeout(() => {
               alert.classList.remove('aktif');
               alertT.appendChild(fText).remove();
          } ,700);


     } else {
          alert.classList.add('aktif');
          alertT.appendChild(bText);
          tambahKeUi(obj);


          setTimeout( () => {
               alert.classList.remove('aktif');
               alertT.appendChild(bText).remove();
          },700)
     }
});


// menghapus item buku
document.querySelector('#book-list').addEventListener('click' , (e) => {
     const el = e.target; // berisi element apapun yang menjadi child dari id book-list.
     function hapus_buku (el) {
          if(el.classList.contains('delete')) {
               if (confirm("Apakah Anda yakin?")) {
                    el.parentElement.remove();
                    alert.classList.add('aktif');
                    alertT.appendChild(dText);

                    setTimeout(() => {
                         alert.classList.remove('aktif');
                         alertT.appendChild(dText).remove();
                    } ,700);
               }
          }
     }
     hapus_buku(el);
});

setTimeout(()=>{
     localStorage.clear();
} , (60*60*24*1000))
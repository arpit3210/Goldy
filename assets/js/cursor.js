
// (function () {

//     const link = document.querySelectorAll('nav > .hover-this');
//     const cursor = document.querySelector('.cursor');
    
//     const animateit = function (e) {
//           const span = this.querySelector('span');
//           const { offsetX: x, offsetY: y } = e,
//           { offsetWidth: width, offsetHeight: height } = this,
    
//           move = 25,
//           xMove = x / width * (move * 2) - move,
//           yMove = y / height * (move * 2) - move;
    
//           span.style.transform = `translate(${xMove}px, ${yMove}px)`;
    
//           if (e.type === 'mouseleave') span.style.transform = '';
//     };
    
//     const editCursor = e => {
//           const { clientX: x, clientY: y } = e;
//           cursor.style.left = x + 'px';
//           cursor.style.top = y + 'px';
//     };
    
//     link.forEach(b => b.addEventListener('mousemove', animateit));
//     link.forEach(b => b.addEventListener('mouseleave', animateit));
//     window.addEventListener('mousemove', editCursor);
    
//     })();


//   (function() {
//     const link = document.querySelectorAll('a.hover-this');
//     const cursor = document.querySelector('.cursor');

//     const animateit = function(e) {
//       const span = this.querySelector('span');
//       const { offsetX: x, offsetY: y } = e;
//       const { offsetWidth: width, offsetHeight: height } = this;

//       const move = 25;
//       const xMove = x / width * (move * 2) - move;
//       const yMove = y / height * (move * 2) - move;

//       span.style.transform = `translate(${xMove}px, ${yMove}px)`;

//       if (e.type === 'mouseleave') span.style.transform = '';
//     };

//     const editCursor = e => {
//       const { clientX: x, clientY: y } = e;
//       cursor.style.left = x + 'px';
//       cursor.style.top = y + 'px';
//     };

//     link.forEach(b => b.addEventListener('mousemove', animateit));
//     link.forEach(b => b.addEventListener('mouseleave', animateit));
//     window.addEventListener('mousemove', editCursor);
//   })();



//   (function() {
//     const cursor = document.querySelector('.cursor');
//     const scaleFactor = 6; /* Increase this value for a larger scale */

//     const animateCursor = e => {
//       cursor.style.transform = `translate(-50%, -50%) scale(${scaleFactor})`;
//     };

//     const resetCursor = () => {
//       cursor.style.transform = 'translate(-50%, -50%) scale(1)';
//     };

//     window.addEventListener('mousemove', e => {
//       const { clientX: x, clientY: y } = e;
//       cursor.style.left = x + 'px';
//       cursor.style.top = y + 'px';
//     });

//     window.addEventListener('mouseover', animateCursor);
//     window.addEventListener('mouseout', resetCursor);
//   })();

///  https://alvarotrigo.com/blog/css-text-animations/

  (function() {
    const cursor = document.querySelector('.cursor');
    const scaleFactor = 6; /* Increase this value for a larger scale */

    const animateCursor = e => {
      const target = e.target;
      if (target.tagName === 'SPAN' || target.tagName === 'P') { /* Adjust the tag names as needed */
        cursor.style.transform = `translate(-50%, -50%) scale(${scaleFactor})`;
      } else if(target.tagName === 'h' || target.tagName === 'h2'){
        cursor.style.transform = `translate(-50%, -50%) scale(${scaleFactor})`;
      }
      
      else {
        cursor.style.transform = 'translate(-50%, -50%) scale(2)';
      }
    };

    const resetCursor = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    window.addEventListener('mousemove', e => {
      const { clientX: x, clientY: y } = e;
      cursor.style.left = x + 'px';
      cursor.style.top = y + 'px';
    });

    window.addEventListener('mouseover', animateCursor);
    window.addEventListener('mouseout', resetCursor);
  })();


//   (function() {
//     const textLinks = document.querySelectorAll('a.hover-this');

//     const createCursor = () => {
//       const cursor = document.createElement('div');
//       cursor.classList.add('cursor');
//       document.body.appendChild(cursor);
//       return cursor;
//     };

//     const cursor = createCursor();
//     const scaleFactor = 4; /* Increase this value for a larger scale */

//     const animateCursor = e => {
//       cursor.style.transform = `translate(-50%, -50%) scale(${scaleFactor})`;
//     };

//     const resetCursor = () => {
//       cursor.style.transform = 'translate(-50%, -50%) scale(1)';
//     };

//     window.addEventListener('mousemove', e => {
//       const { clientX: x, clientY: y } = e;
//       cursor.style.left = x + 'px';
//       cursor.style.top = y + 'px';
//     });

//     textLinks.forEach(link => {
//       link.addEventListener('mouseover', animateCursor);
//       link.addEventListener('mouseout', resetCursor);
//     });
//   })();



